import os
from PIL import Image

upload_dir = r'C:\Users\Marco\.gemini\antigravity\brain\237bd834-5df9-4a44-b99c-fca004316aa8\.user_uploaded'
out_dir = r'd:\Proyectos\aleroif24-web\public\party_animals'
os.makedirs(out_dir, exist_ok=True)

photos = [
    ('media_1795466245617_27cb3fa6.jpg', 'party_1.jpg', '22 nov. 2026', 'Victoria de Patos y Gomita', 'match'),
    ('media_1795466244213_ca0af4fb.jpg', 'party_2.jpg', '22 nov. 2026', '¡Todos contra todos en la arena!', 'action'),
    ('media_1795466244232_50e10f21.jpg', 'party_3.jpg', '22 nov. 2026', 'Rey de la Corona y los puñetazos', 'action'),
    ('media_1795466244209_dbe3537b.jpg', 'party_4.jpg', '22 nov. 2026', 'Minki modo Party Animal en el suelo', 'action'),
    ('media_1795466244718_597cb86c.jpg', 'party_5.jpg', '22 nov. 2026', 'Siesta grupal tras una ronda intensa', 'action'),
    ('media_1795466246132_5ae3eb9a.jpg', 'party_6.jpg', '23 nov. 2026', 'El Tigre y la Banda de Patos', 'match'),
    ('media_1795466246417_d7e0b9df.jpg', 'party_7.jpg', '22 nov. 2026', 'Perrito con flor y gato legendario', 'match'),
    ('media_1795466246933_e20ff8be.jpg', 'party_8.jpg', '22 nov. 2026', 'Doble corona dorada en el podio', 'match'),
    ('media_1795466245956_677730b0.jpg', 'party_9.jpg', '22 nov. 2026', 'Gomita Roja dominando la pista', 'match'),
    ('media_1795466246069_fca759f7.jpg', 'party_10.jpg', '21 nov. 2026', 'Gorila y pato con lentes oscuros', 'match'),
    ('media_1795466245603_ed3068a6.jpg', 'party_11.jpg', '23 nov. 2026', 'Elegancia con corbata y victoria', 'match'),
]

for src_name, dest_name, date, title, category in photos:
    src_path = os.path.join(upload_dir, src_name)
    im = Image.open(src_path)
    # Save optimized JPEG
    dest_path = os.path.join(out_dir, dest_name)
    im.save(dest_path, 'JPEG', quality=90)
    print(f'Saved {dest_name}: {im.size}')

print('All 11 Party Animals photos saved successfully!')
