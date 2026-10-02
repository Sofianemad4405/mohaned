"""
Turns the artifact build (dist-artifact/, built with PUBLIC_ARTIFACT=1) into a
folder that the claude.ai artifact viewer can serve (artifact/):

- every root-relative URL ("/work/", "/_astro/x.webp") becomes relative to the
  page, and directory URLs point at their index.html
- the inline CSS gets its fonts as data: URIs; local scripts are inlined
- the main page loses its <html>/<head>/<body> wrapper (the viewer adds one)
- _astro/ is renamed assets/ (the viewer reserves names starting with "_")
- files the viewer doesn't need (404, sitemap, robots, social cards, icons) are dropped

Usage:  PUBLIC_ARTIFACT=1 npx astro build && python3 scripts/make-artifact.py
"""
import base64, json, os, re, shutil, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / 'dist-artifact', ROOT / 'artifact'
shutil.rmtree(OUT, ignore_errors=True)

fonts = {
    f'/fonts/{f.name}': 'data:font/woff2;base64,' + base64.b64encode(f.read_bytes()).decode()
    for f in (SRC / 'fonts').glob('*.woff2')
}

URL_ATTRS = r'(href|src|srcset|poster|data-src|data-src-small|data-src-large|data-modal-video|data-modal-poster)'


def rel_url(url: str, depth: int, is_home: bool) -> str:
    if not url.startswith('/') or url.startswith('//'):
        return url
    path, _, frag = url.partition('#')
    frag = f'#{frag}' if frag else ''
    if path == '/' and frag and is_home:
        return frag  # same-page anchor: no reload
    if path.endswith('/'):
        path += 'index.html'
    return '../' * depth + path.lstrip('/') + frag


def process(html: str, depth: int, is_home: bool) -> str:
    def attr(m):
        name, val = m.group(1), m.group(2)
        if name == 'srcset':
            parts = [p.strip().split(' ', 1) for p in val.split(',')]
            val = ', '.join(' '.join([rel_url(p[0], depth, is_home), *p[1:]]) for p in parts)
        else:
            val = rel_url(val, depth, is_home)
        return f'{name}="{val}"'

    html = re.sub(URL_ATTRS + r'="([^"]*)"', attr, html)
    for path, data in fonts.items():
        html = html.replace(f"url('{path}')", f"url('{data}')").replace(f'url({path})', f'url({data})')

    def inline_script(m):
        js = (SRC / m.group(1).lstrip('/').replace('../', '')).read_text()
        return f'<script type="module">{js}</script>'

    html = re.sub(r'<script type="module" src="(?:\.\./)*(/?_astro/[^"]+\.js)"></script>', inline_script, html)
    # Viewer supplies its own icon and doesn't need these.
    html = re.sub(r'<link rel="(?:icon|apple-touch-icon|manifest|canonical)"[^>]*>', '', html)
    # The viewer reserves top-level names starting with "_".
    return html.replace('_astro/', 'assets/')


files = {}
for f in SRC.rglob('*'):
    if f.is_dir():
        continue
    rel = f.relative_to(SRC).as_posix()
    if rel in ('404.html', 'robots.txt', 'site.webmanifest') or rel.startswith(('og/', 'fonts/', 'sitemap')) \
            or (rel.endswith('.png') and '/' not in rel) or rel == 'favicon.svg' or rel.endswith('.js'):
        continue
    if rel.startswith('_astro/'):
        rel = 'assets/' + rel[len('_astro/'):]
    dest = OUT / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    if rel.endswith('.html'):
        depth = rel.count('/')
        html = process(f.read_text(), depth, rel == 'index.html')
        if rel == 'index.html':
            html = re.sub(r'<!DOCTYPE html>|</?html[^>]*>|</?head>|</?body>', '', html, flags=re.I)
            html = re.sub(r'<meta charset="utf-8">|<meta name="viewport"[^>]*>', '', html)
            # The viewer shows this as the artifact's name: a name, not a caption.
            html = re.sub(r'<title>[^<]*</title>', '<title>Mohanad Gamal Portfolio</title>', html, count=1)
        dest.write_text(html)
    else:
        shutil.copy2(f, dest)
    if rel != 'index.html':
        files[rel] = f'artifact/{rel}'

(OUT / 'files.json').write_text(json.dumps(files, indent=1))
size = sum(p.stat().st_size for p in OUT.rglob('*') if p.is_file())
print(f'{len(files)} supporting files, {size / 1e6:.1f} MB total -> {OUT}')
