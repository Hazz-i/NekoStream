import requests
from bs4 import BeautifulSoup
import logging
import json

logging.basicConfig(level=logging.INFO)

def scrape_anime_players(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        venutama = soup.find('div', class_='venutama')
        
        if not venutama:
            logging.warning("Couldn't find div with class 'venutama'")
            return None

        resolutions = venutama.find('div', class_='mirrorstream')
        if not resolutions:
            logging.warning("Couldn't find div with class 'mirrorstream'")
            return None
        
        anime_data = []

        for ul in resolutions.find_all('ul'):
            resolution = ul['class'][0]  # Mengambil resolusi dari class ul (misal: 'm360p', 'm480p', dll.)
            for li in ul.find_all('li'):
                iframe_div = li.find_previous('div', class_='responsive-embed-stream')
                if iframe_div:
                    iframe = iframe_div.find('iframe')
                    if iframe and 'src' in iframe.attrs:
                        episode = {
                            'resolution': resolution.removeprefix('m'),  # Menghapus karakter 'm' dari resolusi
                            'provider': li.get_text(strip=True),
                            'link': iframe['src']
                        }
                        anime_data.append(episode)

        return anime_data
    
    except requests.RequestException as e:
        logging.error(f"An error occurred while fetching the page: {e}")
        return None
    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}")
        return None

def save_to_json(data, filename):
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        logging.info(f"Data successfully saved to {filename}")
    except Exception as e:
        logging.error(f"An error occurred while saving data to JSON: {e}")

# Usage
# url = 'https://otakudesu.cloud/episode/sknk-episode-6-sub-indo/' 

# try:
#     data = scrape_anime_players(url)
#     if data:
#         print(json.dumps(data, ensure_ascii=False, indent=2))
        
#         # Save to JSON file
#         save_to_json(data, 'anime_player.json')
#     else:
#         print("No data was scraped.")
# except Exception as e:
#     logging.error(f"An error occurred: {e}")
