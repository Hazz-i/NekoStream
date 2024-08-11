import requests
from bs4 import BeautifulSoup
import logging
import json

logging.basicConfig(level=logging.INFO)

def scrape_search_anime(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        page = soup.find('div', class_='page')
        
        if not page:
            logging.warning("Couldn't find div with class 'page'")
            return None

        anime_elms = page.find_all('li')
        if not anime_elms:
            logging.warning("Couldn't find li")
            return None
        
        anime_data = []

        for elem in anime_elms:
            datas = elem.find_all('div', class_='set')

            anime = {
                'title': elem.find('h2').get_text(strip=True),
                'link': elem.find('h2').find('a')['href'],
                'image': elem.find('img')['src'],
                'genres': datas[0].get_text(strip=True).replace('Genres:', ''),
                'status': datas[1].get_text(strip=True).replace('Status: ', ''),
                'rating': datas[2].get_text(strip=True).replace('Rating: ', ''),
            }
            anime_data.append(anime)

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
# url = 'https://otakudesu.cloud/?s=boku+no&post_type=anime' 

# try:
#     data = scrape_search_anime(url)
#     if data:
#         print(json.dumps(data, ensure_ascii=False, indent=2))
        
#         # Save to JSON file
#         save_to_json(data, 'anime_player.json')
#     else:
#         print("No data was scraped.")
# except Exception as e:
#     logging.error(f"An error occurred: {e}")
