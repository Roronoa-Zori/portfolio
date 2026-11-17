"""Asset pipeline: portraits, project captures, certificate previews/PDFs, OG image."""
import os, shutil
import pymupdf
from PIL import Image, ImageChops, ImageStat, ImageDraw, ImageFont

ROOT = r"C:\Users\Ratul_004\Documents\portfolio2"
DL = r"C:\Users\Ratul_004\Downloads"
PUB = os.path.join(ROOT, "public")
for d in ["images", "projects", "certificates", "documents"]:
    os.makedirs(os.path.join(PUB, d), exist_ok=True)

def save_webp(im, path, max_w, quality=84):
    im = im.convert("RGB")
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    im.save(path, "WEBP", quality=quality, method=6)
    print("wrote", path, im.size)

# ---------- portraits ----------
hero = Image.open(os.path.join(DL, "img2.jpg"))
save_webp(hero, os.path.join(PUB, "images", "portrait-hero.webp"), 1300, 86)

about = Image.open(os.path.join(DL, "WhatsApp Image 2026-11-10 at 9.15.49 PM.jpeg"))
# center crop 3:4 portrait
w, h = about.size
target = 3/4
if w/h > target:
    nw = int(h*target); about = about.crop(((w-nw)//2, 0, (w+nw)//2, h))
save_webp(about, os.path.join(PUB, "images", "portrait-about.webp"), 1100, 86)

forest = Image.open(os.path.join(DL, "picture of me.jpeg"))
save_webp(forest, os.path.join(PUB, "images", "portrait-forest.webp"), 700, 84)

# small detail crop of the hero portrait for collage
w, h = hero.size
det = hero.crop((int(w*0.16), int(h*0.12), int(w*0.84), int(h*0.84)))
save_webp(det, os.path.join(PUB, "images", "portrait-detail.webp"), 700, 84)

# ---------- FrootDash screenshots (extracted from the project document) ----------
froot_pdf = os.path.join(DL, "FrootDash Online Fruit Delivery System.pdf")
doc = pymupdf.open(froot_pdf)
shots = {
    (1, 0): "frootdash-home",
    (1, 1): "frootdash-register",
    (2, 0): "frootdash-login",
    (2, 1): "frootdash-products",
    (3, 0): "frootdash-cart",
    (3, 1): "frootdash-checkout",
    (4, 0): "frootdash-admin",
    (4, 1): "frootdash-admin-products",
}
for (pno, idx), name in shots.items():
    imgs = doc[pno].get_images(full=True)
    pix = pymupdf.Pixmap(doc, imgs[idx][0])
    if pix.n - pix.alpha >= 4:
        pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
    path = os.path.join(PUB, "projects", name + ".webp")
    pix.save(path.replace(".webp", ".png"))
    save_webp(Image.open(path.replace(".webp", ".png")), path, 1600, 85)
    os.remove(path.replace(".webp", ".png"))

# ---------- certificates ----------
cert_pdf = os.path.join(DL, "certificates.pdf")
src = pymupdf.open(cert_pdf)
shutil.copyfile(cert_pdf, os.path.join(PUB, "certificates", "certificate-set-original.pdf"))

names = ["ai-immersive-technology", "launchpad-hackathon-build",
         "launchpad-hackathon-research", "tech-debate-4"]
rotations = [0, 90, 90, 90]

def autocrop(im, pad=6):
    """Trim the grey scanner bed around the printed certificate."""
    g = im.convert("L")
    bg = Image.new("L", g.size, int(ImageStat.Stat(g.crop((0, 0, 40, 40))).mean[0]))
    diff = ImageChops.difference(g, bg)
    # amplify and threshold
    diff = diff.point(lambda p: 255 if p > 18 else 0)
    bbox = diff.getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    return im.crop((max(0, l - pad), max(0, t - pad), min(im.width, r + pad), min(im.height, b + pad)))

for i, (name, angle) in enumerate(zip(names, rotations)):
    page = src[i]
    pix = page.get_pixmap(dpi=200)
    tmp = os.path.join(PUB, "certificates", f"_{name}.png")
    pix.save(tmp)
    im = Image.open(tmp)
    if angle:
        im = im.rotate(angle, expand=True)
    im = autocrop(im, pad=2)
    # remove scanner edge / CamScanner watermark strips
    if angle:
        boxes = (0.018, 0.018, 0.055, 0.020)
    else:
        boxes = (0.010, 0.008, 0.010, 0.062)
    l, t, r, b = [int(v * s) for v, s in zip(boxes, (im.width, im.height, im.width, im.height))]
    im = im.crop((l, t, im.width - r, im.height - b))
    im = im.convert("RGB")
    # cap resolution to keep files light
    if im.width > 1500:
        im = im.resize((1500, round(im.height * 1500 / im.width)), Image.LANCZOS)
    pdf_path = os.path.join(PUB, "certificates", name + ".pdf")
    im.save(pdf_path, "PDF", resolution=190.0, quality=88)
    im.save(os.path.join(PUB, "certificates", name + ".jpg"), "JPEG", quality=90, optimize=True)
    save_webp(im, os.path.join(PUB, "certificates", name + "-preview.webp"), 900, 85)
    os.remove(tmp)
    print("cert", name, im.size, round(os.path.getsize(pdf_path)/1024), "KB pdf")

# ---------- OG image ----------
W, H = 1200, 630
og = Image.new("RGB", (W, H), (234, 234, 234))
d = ImageDraw.Draw(og)
# registration crosses
for x, y in [(40, 40), (W-40, 40), (40, H-40), (W-40, H-40)]:
    d.line([(x-9, y), (x+9, y)], fill=(17, 17, 17), width=1)
    d.line([(x, y-9), (x, y+9)], fill=(17, 17, 17), width=1)
d.rectangle([W//2 - 105, 96, W//2 + 105, 460], fill=(229, 57, 63))

def font(path, size):
    try: return ImageFont.truetype(path, size)
    except Exception: return ImageFont.load_default()

f_black = font(r"C:\Windows\Fonts\ariblk.ttf", 154)
f_bold = font(r"C:\Windows\Fonts\arialbd.ttf", 26)
f_mono = font(r"C:\Windows\Fonts\consola.ttf", 18)
f_small = font(r"C:\Windows\Fonts\arialbd.ttf", 15)

d.text((64, 62), "WELCOME TO MY", font=f_mono, fill=(17, 17, 17))
# outlined + solid title approximation
txt = "PORTFOLIO"
bb = d.textbbox((0, 0), txt, font=f_black)
tw = bb[2] - bb[0]
x = (W - tw)//2 - bb[0]
d.text((x, 246), txt, font=f_black, fill=(234, 234, 234), stroke_width=2, stroke_fill=(17, 17, 17))
d.text((x, 238), txt, font=f_black, fill=(17, 17, 17))
d.text((64, H-104), "MD MOMINUR RAHMAN", font=f_bold, fill=(17, 17, 17))
d.text((W-64 - d.textlength("CSE STUDENT / DEVELOPER / RAJSHAHI", font=f_mono), H-100), "CSE STUDENT / DEVELOPER / RAJSHAHI", font=f_mono, fill=(17, 17, 17))
d.text((64, 110), "ISSUE 01 — 2026", font=f_small, fill=(17, 17, 17))
d.text((W-64-d.textlength("PORTFOLIO / SELECTED WORKS", font=f_small), 110), "PORTFOLIO / SELECTED WORKS", font=f_small, fill=(17, 17, 17))
og.save(os.path.join(PUB, "images", "og-cover.jpg"), "JPEG", quality=90)
print("OG done")
