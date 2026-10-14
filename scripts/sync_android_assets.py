from pathlib import Path
import shutil,hashlib
pwa=Path(__file__).resolve().parents[1]
assets=['index.html','chuck-grid.css','chuck-grid.js','html2canvas.min.js','manifest.json','service-worker.js','icon-192.png','icon-512.png','apple-touch-icon.png']
for dst in [pwa.parent/'apk/assets',pwa.parent/'play/app/src/main/assets']:
 if not dst.is_dir(): raise SystemExit(f'Canonical Android asset folder missing: {dst}')
 for name in assets:
  source=pwa/name;target=dst/name;shutil.copy2(source,target)
  assert hashlib.sha256(source.read_bytes()).digest()==hashlib.sha256(target.read_bytes()).digest()
print('Canonical UI assets synchronised and SHA-256 verified.')
