from PIL import Image, ImageDraw

def make_killua_transparent():
    src = r'C:\Users\Marco\.gemini\antigravity\brain\237bd834-5df9-4a44-b99c-fca004316aa8\.user_uploaded\media_1795465560134_a381519d.jpg'
    img = Image.open(src).convert('RGBA')
    w, h = img.size

    # Flood fill transparent from corners and along border
    # Floodfill with thresh
    for x in range(0, w, 20):
        if img.getpixel((x, 0))[:3] == (0, 0, 0):
            ImageDraw.floodfill(img, (x, 0), (0, 0, 0, 0), thresh=28)
        if img.getpixel((x, h - 1))[:3] == (0, 0, 0):
            ImageDraw.floodfill(img, (x, h - 1), (0, 0, 0, 0), thresh=28)

    for y in range(0, h, 20):
        if img.getpixel((0, y))[:3] == (0, 0, 0):
            ImageDraw.floodfill(img, (0, y), (0, 0, 0, 0), thresh=28)
        if img.getpixel((w - 1, y))[:3] == (0, 0, 0):
            ImageDraw.floodfill(img, (w - 1, y), (0, 0, 0, 0), thresh=28)

    # Also check between legs: around center bottom
    # Killua legs are around x=200..340, y=550..700
    mid_x = w // 2
    for y in range(h - 150, h - 30, 10):
        pix = img.getpixel((mid_x, y))
        if pix[:3] == (0, 0, 0) and pix[3] != 0:
            ImageDraw.floodfill(img, (mid_x, y), (0, 0, 0, 0), thresh=28)

    out_path = r'd:\Proyectos\aleroif24-web\public\killua_chibi.png'
    img.save(out_path, 'PNG')
    print('Saved transparent Killua to:', out_path)

make_killua_transparent()
