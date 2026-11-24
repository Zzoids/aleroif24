from PIL import Image, ImageDraw, ImageFilter

def create_superhero_minki():
    # Base is emote_chavo.png (Minki with Chavo hat and striped shirt, cute eyes, no mask, no knife)
    chavo_path = r'd:\Proyectos\aleroif24-web\public\minki\emote_chavo.png'
    minki = Image.open(chavo_path).convert('RGBA')
    mw, mh = minki.size

    # We want extra canvas around for the epic fluttering cape behind him
    canvas_w = mw + 160
    canvas_h = mh + 60
    canvas = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))

    # 1. Draw Epic Fluttering Red Superhero Cape with Gold Trim (Behind Minki)
    # The cape flows to the left and back as Minki flies in to rescue Killua!
    cape = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))
    draw_cape = ImageDraw.Draw(cape)

    # Cape folds / waves
    # Main outer cape body (vibrant hero crimson #DC2626 and #B91C1C)
    # Originates at Minki's neck/shoulders: around x=canvas_w//2 - 20, y=canvas_h//2 - 30
    neck_x = 180
    neck_y = 190

    # Outer billowing cape
    cape_poly = [
        (neck_x, neck_y),
        (neck_x - 40, neck_y + 20),
        (neck_x - 120, neck_y + 60),
        (neck_x - 160, neck_y + 120),
        (neck_x - 170, neck_y + 170),
        (neck_x - 140, neck_y + 195),
        (neck_x - 110, neck_y + 180),
        (neck_x - 70, neck_y + 215),
        (neck_x - 30, neck_y + 190),
        (neck_x + 10, neck_y + 210),
        (neck_x + 60, neck_y + 185),
        (neck_x + 80, neck_y + 140),
        (neck_x + 40, neck_y + 80),
        (neck_x + 15, neck_y + 30),
    ]
    draw_cape.polygon(cape_poly, fill=(220, 38, 38, 255), outline=(153, 27, 27, 255))

    # Inner fold shadow / depth (#991B1B)
    fold_1 = [
        (neck_x - 10, neck_y + 15),
        (neck_x - 80, neck_y + 70),
        (neck_x - 140, neck_y + 140),
        (neck_x - 110, neck_y + 180),
        (neck_x - 60, neck_y + 120),
        (neck_x - 10, neck_y + 50),
    ]
    draw_cape.polygon(fold_1, fill=(185, 28, 28, 255))

    # Golden Trim along the edge of the cape (#F59E0B)
    gold_trim = [
        (neck_x - 170, neck_y + 170),
        (neck_x - 140, neck_y + 195),
        (neck_x - 110, neck_y + 180),
        (neck_x - 70, neck_y + 215),
        (neck_x - 30, neck_y + 190),
        (neck_x + 10, neck_y + 210),
        (neck_x + 60, neck_y + 185),
    ]
    for i in range(len(gold_trim) - 1):
        draw_cape.line([gold_trim[i], gold_trim[i+1]], fill=(245, 158, 11, 255), width=6)

    # Paste cape onto canvas
    canvas.paste(cape, (0, 0), cape)

    # 2. Paste Minki in front of the cape
    # Position Minki so neck matches neck_x, neck_y
    minki_x = 90
    minki_y = 40
    canvas.paste(minki, (minki_x, minki_y), minki)

    # 3. Add Golden Superhero Cape Clasp / Brooch in front of Minki's collar
    fg = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))
    draw_fg = ImageDraw.Draw(fg)

    # Golden cape clasp around collar
    clasp_x = minki_x + mw // 2 - 18
    clasp_y = minki_y + 245
    # Golden star brooch
    draw_fg.ellipse([clasp_x - 10, clasp_y - 10, clasp_x + 10, clasp_y + 10], fill=(245, 158, 11, 255), outline=(180, 83, 9, 255), width=2)
    draw_fg.ellipse([clasp_x - 6, clasp_y - 6, clasp_x + 6, clasp_y + 6], fill=(254, 240, 138, 255))
    # Red ribbon ties
    draw_fg.line([(clasp_x - 10, clasp_y - 2), (clasp_x - 25, clasp_y - 15)], fill=(220, 38, 38, 255), width=5)
    draw_fg.line([(clasp_x + 10, clasp_y - 2), (clasp_x + 25, clasp_y - 15)], fill=(220, 38, 38, 255), width=5)

    canvas.paste(fg, (0, 0), fg)

    # Crop excess transparent borders
    bbox = canvas.getbbox()
    cropped = canvas.crop(bbox)

    out_path = r'd:\Proyectos\aleroif24-web\public\minki\minki_superhero.png'
    cropped.save(out_path, 'PNG')
    print('Saved superhero Minki to:', out_path, 'size:', cropped.size)

create_superhero_minki()
