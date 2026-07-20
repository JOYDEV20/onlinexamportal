import pathlib
import re
root = pathlib.Path(r'e:/Sampurna/examportal')
print('root exists', root.exists())
print('root file names:', sorted([p.name for p in root.iterdir() if p.name in ('.gitignore', 'CNAME', '.nojekyll') or (p.is_dir() and p.name == '.github')]))
html_files = sorted(root.glob('*.html'))
print('html files:', [p.name for p in html_files])
missing = []
for html in html_files:
    text = html.read_text('utf-8', errors='replace')
    for attr in re.findall(r'(?:src|href)=["\']([^"\']+)["\']', text):
        if attr.startswith(('http://','https://','#','mailto:','javascript:','data:')):
            continue
        if attr.startswith('/'):
            target = root / attr.lstrip('/')
        else:
            target = html.parent / attr
        if not target.exists():
            missing.append((html.name, attr, str(target)))
print('missing count', len(missing))
for h,a,t in missing:
    print('MISSING', h, '->', a, '->', t)
