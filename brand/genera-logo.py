"""Genera le varianti web del logo TIMIA a partire da brand/logo-timia-originale.webp.

Il file originale ha già lo sfondo trasparente (lampadina con albero, scritta TIMIA
bianca con contorno grigio, payoff "Ambiente & Energia" verde oliva).

Uscite (in src/assets/img/):
  logo-timia.webp / .png        logo originale ritagliato, per fondi chiari
  logo-timia-light.webp / .png  per fondi scuri: payoff schiarito per restare leggibile
  favicon-32.png, favicon-192.png, apple-touch-icon.png  simbolo della lampadina

Uso: python brand/genera-logo.py   (richiede Pillow e numpy)
"""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'brand' / 'logo-timia-originale.webp'
OUT = ROOT / 'src' / 'assets' / 'img'

src = Image.open(SRC).convert('RGBA')
a = np.asarray(src)

# Ritaglio sul contenuto (ignora i pixel quasi trasparenti dei bordi).
ys, xs = np.nonzero(a[..., 3] > 40)
pad = 6
box = (max(xs.min() - pad, 0), max(ys.min() - pad, 0), min(xs.max() + pad + 1, src.width), min(ys.max() + pad + 1, src.height))
logo = src.crop(box)
px = np.asarray(logo).astype(np.float64)
H, W = px.shape[:2]
# Elimina il pulviscolo semitrasparente rimasto attorno al logo.
px[px[..., 3] < 12, 3] = 0
logo = Image.fromarray(px.astype(np.uint8), 'RGBA')

# Versione per fondi scuri: il payoff verde oliva viene schiarito (la scritta TIMIA è già bianca).
neg = px.copy()
yy, xx = np.mgrid[0:H, 0:W]
r, g, b = neg[..., 0], neg[..., 1], neg[..., 2]
olive = (yy > H * 0.68) & (xx > W * 0.23) & (neg[..., 3] > 0) & (g > b + 12) & (g < 200)
neg[olive, 0:3] = neg[olive, 0:3] + (255 - neg[olive, 0:3]) * 0.5
logo_light = Image.fromarray(neg.astype(np.uint8), 'RGBA')


def save(im, name, width):
    h = round(im.height * width / im.width)
    im = im.resize((width, h), Image.LANCZOS)
    im.save(OUT / f'{name}.webp', 'WEBP', quality=88, method=6)
    im.save(OUT / f'{name}.png', 'PNG', optimize=True)
    return im.size


print('logo', save(logo, 'logo-timia', 520))
print('logo light', save(logo_light, 'logo-timia-light', 520))

# Simbolo (lampadina) per favicon: quadrato centrato.
cols = np.nonzero(px[:, : int(W * 0.24), 3].max(axis=0) > 40)[0]
bulb = logo.crop((0, 0, int(cols.max()) + 2, H))
bb = bulb.getbbox()
bulb = bulb.crop(bb)
side = max(bulb.size) + 8
sq = Image.new('RGBA', (side, side), (0, 0, 0, 0))
sq.paste(bulb, ((side - bulb.width) // 2, (side - bulb.height) // 2))
for size, name in [(32, 'favicon-32'), (192, 'favicon-192')]:
    sq.resize((size, size), Image.LANCZOS).save(OUT / f'{name}.png', optimize=True)
# Apple touch icon: sfondo bianco pieno (iOS non gestisce la trasparenza).
touch = Image.new('RGBA', (side, side), (255, 255, 255, 255))
touch.alpha_composite(sq)
touch.convert('RGB').resize((180, 180), Image.LANCZOS).save(OUT / 'apple-touch-icon.png', optimize=True)
print('favicon ok')
