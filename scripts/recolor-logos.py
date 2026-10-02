"""
Dark-theme versions of the brand logos (originals from Wikimedia Commons are
kept in raw/logos/). Dark ink becomes the site's off-white; brand colours that
read well on the dark background are kept.

Run: python3 scripts/recolor-logos.py
"""
import pathlib, re, shutil

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / 'raw/logos', ROOT / 'src/assets/brands'
PAPER, MUTED = '#f2f0ea', '#b0aea7'

# file -> (list of (find, replace) pairs, add root fill?)
RULES = {
    'adidas': ([('fill:#000', f'fill:{PAPER}')], False),
    'emaar': ([('fill="#3C3D3F"', f'fill="{PAPER}"')], False),
    'fifa22': ([('fill="#9a1032"', f'fill="{PAPER}"')], False),
    'gea_old': ([], True),  # unfilled text paths default to black
    'gemini': ([('<svg ', f'<svg style="color:{PAPER}" ')], False),  # wordmark uses currentColor
    'gillette': ([('fill:#231f20', f'fill:{PAPER}')], False),
    'oppo': ([('fill:#006b33', f'fill:{PAPER}')], False),
    'palmhills': ([('fill="#2c2a26"', f'fill="{PAPER}"'), ('fill="#858581"', f'fill="{MUTED}"')], False),
    'samsung': ([('fill:#000000', 'fill:none')], False),  # drop the black box, keep the white letters
    'google': ([], False),
    'lenovo': ([], False),
    'redbull': ([], False),
    'talabat': ([], False),
}
NAMES = {'gea_old': 'gea'}


def clean(svg: str) -> str:
    svg = re.sub(r'<\?xml[^>]*\?>|<!DOCTYPE[^>]*>|<!--.*?-->|<metadata.*?</metadata>', '', svg, flags=re.S)
    return svg.strip() + '\n'


for name, (pairs, root_fill) in RULES.items():
    svg = clean((SRC / f'{name}.svg').read_text())
    for a, b in pairs:
        assert a in svg, (name, a)
        svg = svg.replace(a, b)
    if root_fill:
        svg = re.sub(r'<svg\b', f'<svg fill="{PAPER}"', svg, count=1)
    (OUT / f'{NAMES.get(name, name)}.svg').write_text(svg)

shutil.copy(SRC / 'btech.png', OUT / 'btech.png')  # self-contained badge, works on dark as is
print('done')
