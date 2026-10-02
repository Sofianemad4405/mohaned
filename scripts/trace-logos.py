"""
Vectorises the raster brand logos (JPEG/PNG on white) into transparent SVGs for
the dark theme: each colour layer is masked, traced with potrace, and given the
colour it should have on the dark site. Originals live in raw/logos/.

Run: python scripts/trace-logos.py   (needs pillow, numpy, potracer)
"""
import pathlib
import numpy as np
import potrace
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / 'raw/logos', ROOT / 'src/assets/brands'
PAPER = '#f2f0ea'


def hsv(rgb):
    img = Image.fromarray(rgb.astype(np.uint8)).convert('HSV')
    return np.asarray(img).astype(int)


def layers_for(name, rgb):
    r, g, b = (rgb[..., i].astype(int) for i in range(3))
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    h, s, v = (hsv(rgb)[..., i] for i in range(3))
    if name == 'tornado':  # red wordmark keeps its red
        return [(r > 150) & (g < 120) & (b < 120), '#e8212b'],
    if name == 'owest':  # navy mark -> light
        return [(lum < 140), PAPER],
    if name == 'fury':  # black line art -> light; amber eyes stay amber
        eyes = (s > 90) & (v > 120) & (h > 10) & (h < 45)
        return [(lum < 120) & ~eyes, PAPER], [eyes, '#f4a62a']
    raise KeyError(name)


def trace(mask):
    bm = potrace.Bitmap(~mask)  # potracer treats True as background
    plist = bm.trace(turdsize=6, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY, alphamax=1.0, opticurve=True, opttolerance=0.2)
    parts = []
    for curve in plist:
        x, y = curve.start_point.x, curve.start_point.y
        d = [f'M{x:.0f} {y:.0f}']
        for seg in curve.segments:
            if seg.is_corner:
                d.append(f'L{seg.c.x:.0f} {seg.c.y:.0f}L{seg.end_point.x:.0f} {seg.end_point.y:.0f}')
            else:
                d.append(f'C{seg.c1.x:.0f} {seg.c1.y:.0f} {seg.c2.x:.0f} {seg.c2.y:.0f} {seg.end_point.x:.0f} {seg.end_point.y:.0f}')
        parts.append(''.join(d) + 'Z')
    return ''.join(parts)


for name in ['tornado', 'owest', 'fury']:
    src = next(SRC.glob(f'{name}.*'))
    img = Image.open(src).convert('RGB')
    # Trim the white surround, then upscale so curves trace smoothly.
    a = np.asarray(img).astype(int)
    ink = (a.min(axis=2) < 200)
    ys, xs = np.where(ink)
    pad = 4
    box = (max(xs.min() - pad, 0), max(ys.min() - pad, 0), min(xs.max() + pad, img.width), min(ys.max() + pad, img.height))
    img = img.crop(box)
    scale = max(1, round(1600 / max(img.size)))
    img = img.resize((img.width * scale, img.height * scale), Image.LANCZOS)
    rgb = np.asarray(img)
    paths = ''.join(f'<path fill="{color}" fill-rule="evenodd" d="{trace(mask)}"/>' for mask, color in layers_for(name, rgb))
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {img.width} {img.height}" width="{img.width}" height="{img.height}">{paths}</svg>\n'
    (OUT / f'{name}.svg').write_text(svg)
    print(name, img.size, f'{len(svg) / 1024:.0f} KB')
