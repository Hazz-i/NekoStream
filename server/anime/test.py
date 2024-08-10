import requests
from bs4 import BeautifulSoup

def get_video_links(url):
    # Kirim permintaan GET ke URL
    response = requests.get(url)
    
    # Parse konten HTML
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Temukan semua iframe
    iframes = soup.find_all('iframe')
    

    print(iframes)
    # Cari iframe yang sesuai (biasanya yang pertama dalam konteks ini)
    target_iframe = None
    for iframe in iframes:
        if 'embed' in iframe.get('src', ''):
            target_iframe = iframe
            break
    
    if not target_iframe:
        print("Iframe yang sesuai tidak ditemukan")
        return None
    
    # Ekstrak atribut src
    base_src = target_iframe.get('src')
    
    if not base_src:
        print("Link source tidak ditemukan dalam iframe")
        return None
    
    # Temukan semua elemen ul yang berisi opsi resolusi
    resolution_uls = soup.find_all('ul', class_=['360p', '480p', '720p'])
    
    # Ekstrak links untuk setiap resolusi dan provider
    links = {}
    for ul in resolution_uls:
        resolution = ul.get('class')[0]  # Ambil resolusi dari class ul
        links[resolution] = {}
        
        # Temukan semua elemen li dalam ul ini
        li_elements = ul.find_all('li')
        
        for li in li_elements:
            a_tag = li.find('a')
            if a_tag and a_tag.get('data-content'):
                provider = a_tag.text.strip()
                # Gunakan base_src sebagai dasar dan tambahkan data-content
                links[resolution][provider] = f"{base_src}#{a_tag['data-content']}"
    
    return links

# Contoh penggunaan
url = "https://your-website-url.com/kono-sekai-wa-fukanzen-sugiru-episode-5"
video_links = get_video_links(url)

if video_links:
    for resolution, providers in video_links.items():
        print(f"Links untuk {resolution}:")
        for provider, link in providers.items():
            print(f"  {provider}: {link}")
        print()
else:
    print("Tidak dapat mengekstrak link video")