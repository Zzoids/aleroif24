import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}

def get_mp3s(url):
    req = urllib.request.Request(url, headers=headers)
    html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    return re.findall(r'https://liquipedia\.net/commons/images/[^\"]+\.mp3', html)

sky_mp3s = get_mp3s('https://liquipedia.net/dota2/Skywrath_Mage/Responses')
print(f'Skywrath mp3s: {len(sky_mp3s)}')
for m in sky_mp3s[:10]:
    print('SKY:', m)

necro_mp3s = get_mp3s('https://liquipedia.net/dota2/Necrophos/Responses')
print(f'Necrophos mp3s: {len(necro_mp3s)}')
for m in necro_mp3s[:10]:
    print('NECRO:', m)
