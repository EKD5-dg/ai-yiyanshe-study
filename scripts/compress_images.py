# 生成 public/images 的 WebP 题图：限宽 + 裁掉右下角水印带 + WebP 压缩。
#
# 只把结果以 "文件名<TAB>base64" 打到 stdout，由 scripts/write_images.js 落地：
# 本机 TSD 驱动会加密 python 写出的二进制文件，node 与浏览器只能读到 %TSD 密文，
# 直接落盘会让线上图片解码失败、页面留下空白占位块。
#
# 用法：python scripts/compress_images.py | node scripts/write_images.js
from PIL import Image
import base64, io, os

SRC_DIR = "vibe_images"
OUT_DIR = "public/images"
# 页面容器最宽 928 CSS px，1024 已够一轮弱网下的清晰显示
MAX_W = 1024
QUALITY = 72
# 出图工具在右下角压了半透明水印，裁掉的底部高度与图宽成正比（1280 宽时为 76px）
WM_BOTTOM_RATIO = 76 / 1280

for fn in sorted(os.listdir(OUT_DIR)):
    if not fn.endswith(".webp"):
        continue
    im = Image.open(os.path.join(SRC_DIR, fn[:-5] + ".png")).convert("RGB")
    if im.size[0] > MAX_W:
        im = im.resize((MAX_W, round(im.size[1] * MAX_W / im.size[0])), Image.LANCZOS)
    w, h = im.size
    im = im.crop((0, 0, w, h - round(w * WM_BOTTOM_RATIO)))
    buf = io.BytesIO()
    im.save(buf, "WEBP", quality=QUALITY, method=6)
    print(f"{fn}\t{base64.b64encode(buf.getvalue()).decode()}")
