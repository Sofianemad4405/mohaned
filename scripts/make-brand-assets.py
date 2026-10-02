"""
Builds favicon + Open Graph cards from real assets (site font + video thumbnails).
Run: python scripts/make-brand-assets.py   (needs fonttools, brotli, pillow)
"""
import json, re, pathlib, io
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUB = ROOT / 'public'
THUMBS = ROOT / 'src/assets/thumbs'
INK, PAPER, VOLT, MUTED = (10, 10, 11), (242, 240, 234), (216, 255, 60), (176, 174, 167)

def instance(wdth, wght):
    f = TTFont(ROOT / 'public/fonts/archivo-wdth.woff2')
    f.flavor = None
    inst = instancer.instantiateVariableFont(f, {'wdth': wdth, 'wght': wght})
    buf = io.BytesIO(); inst.save(buf); buf.seek(0)
    return buf

display = instance(64, 850)
display_bytes = display.getvalue()
body_bytes = instance(100, 500).getvalue()
condensed_bytes = instance(80, 700).getvalue()
font = lambda b, size: ImageFont.truetype(io.BytesIO(b), size)

# --- Favicon SVG from real glyph outlines ------------------------------------
tt = TTFont(io.BytesIO(display_bytes))
gs, cmap = tt.getGlyphSet(), tt.getBestCmap()
upm = tt['head'].unitsPerEm
paths, x = [], 0
for ch in 'MG':
    g = cmap[ord(ch)]
    pen = SVGPathPen(gs); gs[g].draw(pen)
    paths.append((x, pen.getCommands())); x += gs[g].width
bp = BoundsPen(gs)
for ch in 'MG': gs[cmap[ord(ch)]].draw(bp)
cap = tt['OS/2'].sCapHeight
scale = min(40 / cap, 50 / x)
tw = x * scale
ox = (64 - tw) / 2
oy = 32 + cap * scale / 2
svg_paths = ''.join(
    f'<path transform="translate({ox + px*scale:.2f} {oy}) scale({scale:.5f} {-scale:.5f})" d="{d}"/>' for px, d in paths)
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="6" fill="#d8ff3c"/><g fill="#0a0a0b">{svg_paths}</g></svg>\n'
(PUB / 'favicon.svg').write_text(svg)

def icon_png(size, path, pad_radius=True):
    im = Image.new('RGB', (size, size), VOLT)
    d = ImageDraw.Draw(im)
    f = font(display_bytes, int(size * 0.62))
    bb = d.textbbox((0, 0), 'MG', font=f, anchor='ls')
    w = bb[2] - bb[0]; h = -bb[1]
    d.text(((size - w) / 2 - bb[0], (size + h) / 2), 'MG', font=f, fill=INK, anchor='ls')
    im.save(path)
icon_png(32, PUB / 'favicon-32.png')
icon_png(180, PUB / 'apple-touch-icon.png')
icon_png(192, PUB / 'icon-192.png')
icon_png(512, PUB / 'icon-512.png')

# --- Open Graph cards -------------------------------------------------------
(PUB / 'og').mkdir(exist_ok=True)
W, H = 1200, 630

def cover(img, w, h):
    r = max(w / img.width, h / img.height)
    img = img.resize((int(img.width * r + 1), int(img.height * r + 1)), Image.LANCZOS)
    l, t = (img.width - w) // 2, (img.height - h) // 2
    return img.crop((l, t, l + w, t + h))

def gradient(w, h, start=0.0):
    g = Image.new('L', (w, 1))
    for i in range(w):
        t = max(0, (i / w - start) / (1 - start))
        g.putpixel((i, 0), int(255 * min(1, t * 1.4)))
    return g.resize((w, h))

def card(bg_ids, title_lines, kicker, footer, out, tall=False):
    im = Image.new('RGB', (W, H), INK)
    # Right-hand media: stacked thumbnails of the real work
    if tall:
        x = 660
        for i, vid in enumerate(bg_ids[:3]):
            t = cover(Image.open(THUMBS / f'short_{vid}.jpg').convert('RGB'), 164, 292)
            im.paste(t, (x + i * 176, 169))
    else:
        t = cover(Image.open(THUMBS / f'{bg_ids[0]}.jpg').convert('RGB'), 720, 630)
        im.paste(t, (480, 0))
    shade = Image.new('RGB', (W, H), INK)
    mask = Image.new('L', (W, H), 0)
    mask.paste(gradient(W - 380, H, 0.35).transpose(Image.FLIP_LEFT_RIGHT), (380, 0))
    if tall: mask = Image.new('L', (W, H), 0); mask.paste(255, (0, 0, 640, H))
    mask.paste(255, (0, 0, 380, H))
    im = Image.composite(shade, im, mask)
    d = ImageDraw.Draw(im)
    d.rectangle((64, 64, 64 + 44, 64 + 44), fill=VOLT)
    fm = font(display_bytes, 30)
    d.text((64 + 22, 64 + 22), 'MG', font=fm, fill=INK, anchor='mm')
    d.text((124, 86), kicker.upper(), font=font(condensed_bytes, 22), fill=MUTED, anchor='lm')
    fbig = font(display_bytes, 132 if len(max(title_lines, key=len)) < 9 else 104)
    y = 180
    for i, line in enumerate(title_lines):
        d.text((60, y), line.upper(), font=fbig, fill=VOLT if i == len(title_lines) - 1 and len(title_lines) > 1 else PAPER, anchor='la')
        y += int(fbig.size * 0.9)
    d.text((64, H - 64), footer, font=font(body_bytes, 26), fill=MUTED, anchor='ls')
    im.save(out, quality=86)

meta = {}
for line in (ROOT / 'raw/yt-metadata-2026-09-30.txt').read_text().splitlines():
    p = line.split('|')
    if len(p) >= 4: meta[p[0]] = int(p[3])
total = sum(meta.values())
fmt = lambda n: f'{n/1e6:.1f}M' if n >= 1e6 else f'{round(n/1e3)}K'

card(['T9GO7I5T0lE'], ['Mohanad', 'Gamal'], 'Senior Video Editor · Arcade Films · Cairo',
     f'{fmt(total)} public views across {len(meta)} edits', PUB / 'og/home.jpg')

print('done')

# Fonts in /public/fonts are subsets of the @fontsource-variable packages:
#   pyftsubset <archivo-latin-wdth-normal.woff2|jetbrains-mono-latin-wght-normal.woff2> \
#     --unicodes="U+0020-007E,U+00A0-00FF,U+00D7,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2022,U+2026,U+2190-2193,U+2197,U+2212" \
#     --layout-features='kern,liga,tnum,case' --flavor=woff2
