from PIL import Image
import os, glob

src_dir = "vibe_images"
out_dir = "public/images"
os.makedirs(out_dir, exist_ok=True)

# 弱网：WebP + 限宽，单图控制在百 KB 级
MAX_W = 1280
QUALITY = 72

files = sorted(glob.glob(os.path.join(src_dir, "*.png")))
print(f"found {len(files)} pngs")
for path in files:
    name = os.path.splitext(os.path.basename(path))[0]
    im = Image.open(path).convert("RGB")
    w, h = im.size
    if w > MAX_W:
        nh = int(h * MAX_W / w)
        im = im.resize((MAX_W, nh), Image.LANCZOS)
    out = os.path.join(out_dir, name + ".webp")
    im.save(out, "WEBP", quality=QUALITY, method=6)
    kb = os.path.getsize(out) / 1024
    print(f"{name}.webp  {im.size[0]}x{im.size[1]}  {kb:.0f}KB")

total = sum(os.path.getsize(os.path.join(out_dir, f)) for f in os.listdir(out_dir))
print(f"TOTAL public/images: {total/1024:.0f}KB")
