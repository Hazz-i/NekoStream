import requests
from bs4 import BeautifulSoup
import logging
import json

logging.basicConfig(level=logging.INFO)

def extract_info(p_element):
    b_tag = p_element.find('b')
    key = b_tag.get_text(strip=True) if b_tag else None
    if b_tag:
        b_tag.extract()
    value = p_element.get_text(strip=True)
    value = value.replace(':', '').strip()
    return key, value

def scrape_anime_data(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        infozingle = soup.find('div', class_='infozingle')
        
        if not infozingle:
            logging.warning("Couldn't find div with class 'infozingle'")
            return None
        
        anime_description = infozingle.find_all('p')
        
        if not anime_description:
            logging.warning("No p elements found within the infozingle div")
            return None

        anime_data = {}

        for p in anime_description:
            key, value = extract_info(p)
            if key and value:
                anime_data[key] = value

        title_elem = soup.find('h1', class_='entry-title')
        if title_elem:
            anime_data['Judul'] = title_elem.get_text(strip=True)

        # Scrape episode links and release dates

        episode_containers = soup.find_all('div', class_='episodelist')

        for container in episode_containers:

            episode_links = container.find_all('a')
            episodes = []
            date_index = 0

            for link in episode_links:
                episode = {}
                episode['link'] = link['href']
                episode['title'] = link.get_text(strip=True)

                dates = container.find_all('span', class_='zeebr')
                if dates and date_index < len(dates):
                    episode['release_date'] = dates[date_index].get_text(strip=True)
                    date_index += 1
                else:
                    episode['release_date'] = None
                    
                episodes.append(episode)
                anime_data['episodes'] = episodes

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
url = 'https://otakudesu.cloud/anime/yozakura-daisakusen-sub-indo/' 

try:
    data = scrape_anime_data(url)
    if data:
        print(json.dumps(data, ensure_ascii=False, indent=2))
        
        # Save to JSON file
        save_to_json(data, 'anime_info.json')
    else:
        print("No data was scraped.")
except Exception as e:
    logging.error(f"An error occurred: {e}")