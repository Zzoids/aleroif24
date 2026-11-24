import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
}

def download_liquipedia_file(file_name, dest_path):
    url = f'https://liquipedia.net/commons/File:{file_name}'
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        links = re.findall(r'href="(/commons/images/[^"]+\.mp3)"', html)
        if links:
            dl_url = 'https://liquipedia.net' + links[0]
            data = urllib.request.urlopen(urllib.request.Request(dl_url, headers=headers), timeout=10).read()
            with open(dest_path, 'wb') as f:
                f.write(data)
            print(f'SUCCESS: {file_name} -> {dest_path} ({len(data)} bytes)')
            return True
        else:
            print(f'No link found for {file_name}')
    except Exception as e:
        print(f'Failed {file_name}: {e}')
    return False

# Download clean Skywrath lines:
# 1. drag_spawn_02.mp3 ("My wings bear me on!")
# 2. drag_spawn_04.mp3 ("To the skies!")
download_liquipedia_file('Vo_skywrath_mage_drag_spawn_02.mp3', r'd:\Proyectos\aleroif24-web\public\audio\heroes\skywrath_spawn2.mp3')
download_liquipedia_file('Vo_skywrath_mage_drag_spawn_04.mp3', r'd:\Proyectos\aleroif24-web\public\audio\heroes\skywrath_spawn4.mp3')
download_liquipedia_file('Vo_skywrath_mage_drag_spawn_01.mp3', r'd:\Proyectos\aleroif24-web\public\audio\heroes\skywrath_spawn1.mp3')

# Download clean Necrophos lines:
download_liquipedia_file('Vo_necrolyte_necr_spawn_01.mp3', r'd:\Proyectos\aleroif24-web\public\audio\heroes\necrolyte.mp3')
download_liquipedia_file('Vo_necrolyte_necr_spawn_03.mp3', r'd:\Proyectos\aleroif24-web\public\audio\heroes\necrolyte_spawn3.mp3')
download_liquipedia_file('Vo_necrolyte_necr_spawn_04.mp3', r'd:\Proyectos\aleroif24-web\public\audio\heroes\necrolyte_spawn4.mp3')
