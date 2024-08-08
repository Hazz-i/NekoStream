import requests
from bs4 import BeautifulSoup
import logging
import json

logging.basicConfig(level=logging.INFO)

def scrape_home_anime(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes

        soup = BeautifulSoup(response.text, 'html.parser')

        venzdiv = soup.find('div', class_='venz')

        if not venzdiv:
            logging.warning("Couldn't find div with class 'venz'")
            return None

        anime_entries = venzdiv.find_all('li')

        if not anime_entries:
            logging.warning("No li elements found within the venz div")
            return None

        anime_data = []

        for entry in anime_entries:
            try:
                elem = entry.find('div', class_='detpost')
                if not elem:
                    logging.warning(f"Couldn't find 'anime-detpost' div in entry")
                    continue

                day_release = elem.find('div', class_='epztipe').text.strip()
                date_release = elem.find('div', class_='newnime').text.strip()
                episode = elem.find('div', class_='epz').text.strip()

                body_elem = elem.find('div', class_='thumb')
                if not body_elem:
                    logging.warning(f"Couldn't find 'thumb' div in entry")
                    continue

                link_elem = body_elem.find('a')
                full_link = link_elem['href'] if link_elem and 'href' in link_elem.attrs else 'No link found'
                cleaned_link = full_link.replace("https://otakudesu.cloud/anime/", "")
                # Hapus trailing slash
                link = cleaned_link.rstrip("/")

                title_elem = body_elem.find('h2')
                title = title_elem.text.strip() if title_elem else 'No title found'

                img_elem = body_elem.find('img')
                img_url = img_elem['src'] if img_elem and 'src' in img_elem.attrs else 'No image found'
                img_alt = img_elem['alt'] if img_elem and 'alt' in img_elem.attrs else 'No alt text found'

                anime_data.append({
                    'title': title,
                    'link': link,
                    'episode' : episode,
                    'image_url': img_url,
                    'image_alt': img_alt,
                    'date_release': date_release,
                    'day_release': day_release
                })
            except Exception as e:
                logging.error(f"Error processing entry: {e}")
                continue

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
url = f'https://otakudesu.cloud/'

try:
    data = scrape_home_anime(url)
    if data:
        print(json.dumps(data, ensure_ascii=False, indent=2))

        # Save to JSON file
        save_to_json(data, 'anime_list.json')
    else:
        print("No data was scraped.")
except Exception as e:
    logging.error(f"An error occurred: {e}")
