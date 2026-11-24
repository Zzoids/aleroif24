import xml.etree.ElementTree as ET

tree = ET.parse(r'd:\Proyectos\aleroif24-web\public\dota_logo.svg')
root = tree.getroot()

path2430 = [e for e in root.iter() if e.attrib.get('id') == 'path2430'][0]
d = path2430.attrib.get('d')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13.5" width="100%" height="100%">
  <defs>
    <linearGradient id="dotaRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF4533" />
      <stop offset="50%" stop-color="#E22415" />
      <stop offset="100%" stop-color="#9C1408" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="0.6" flood-color="#FF2414" flood-opacity="0.9" />
    </filter>
  </defs>
  <path d="{d}" fill="url(#dotaRed)" filter="url(#glow)" />
</svg>'''

with open(r'd:\Proyectos\aleroif24-web\public\dota2_logo_red.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)
print('Saved dota2_logo_red.svg successfully!')
