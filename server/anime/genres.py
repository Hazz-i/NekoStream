import requests
from bs4 import BeautifulSoup
import logging
import json

logging.basicConfig(level=logging.INFO)

def scrape_anime_genres(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')

        genres_elem = soup.find('ul', class_='genres')
        
        if not genres_elem:
            logging.warning("Couldn't find ul with class 'genres_elem'")
            return None
        
        genres = genres_elem.find('li').find_all('a')

        anime_genres = []

        for genre in genres:
            title = genre.get_text(strip=True)
            link = genre['href']

            anime_genres.append({
                'title': title,
                'link': link
            })

        return anime_genres
    
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
# url = 'https://otakudesu.cloud/genre-list/' 

# try:
#     data = scrape_anime_genres(url)
#     if data:
#         print(json.dumps(data, ensure_ascii=False, indent=2))
        
#         # Save to JSON file
#         # save_to_json(data, 'anime_info.json')
#     else:
#         print("No data was scraped.")
# except Exception as e:
#     logging.error(f"An error occurred: {e}")