import requests
from bs4 import BeautifulSoup
import logging
import json
from datetime import datetime

logging.basicConfig(level=logging.INFO)

def scrape_anime_data(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        mirrorstream = soup.find('div', class_='mirrorstream')
        
        if not mirrorstream:
            logging.warning("Couldn't find div with class 'mirrorstream'")
            return None
        
        link_entries = mirrorstream.find_all('ul')
        
        if not link_entries:
            logging.warning("No ul elements found within the link_entries div")
            return None

        setream_link = []
        
        for entry in link_entries:
            try:
                elem = entry.find('li')

                print(elem)
                # date_release = elem.find('div', class_='epztipe').text.strip()

                # body_elem = elem.find('div', class_='thumb')
                # if not body_elem:
                #     logging.warning(f"Couldn't find 'thumb' div in entry")
                #     continue

                # link_elem = body_elem.find('a')
                # link = link_elem['href'] if link_elem and 'href' in link_elem.attrs else 'No link found'

                # title_elem = body_elem.find('h2')
                # title = title_elem.text.strip() if title_elem else 'No title found'

                # img_elem = body_elem.find('img')
                # img_url = img_elem['src'] if img_elem and 'src' in img_elem.attrs else 'No image found'
                # img_alt = img_elem['alt'] if img_elem and 'alt' in img_elem.attrs else 'No alt text found'

                # anime_data.append({
                #     'title': title,
                #     'link': link,
                #     'image_url': img_url,
                #     'image_alt': img_alt,
                #     'date_release': date_release
                # })
            except Exception as e:
                logging.error(f"Error processing entry: {e}")
                continue
        
        # return anime_data
    
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
# url = 'https://otakudesu.cloud/'  # Replace with the actual URL

# try:
#     data = scrape_anime_data(url)
#     if data:
#         for item in data:
#             print(f"Title: {item['title']}")
#             print(f"Link: {item['link']}")
#             print(f"Image URL: {item['image_url']}")
#             print(f"Image Alt: {item['image_alt']}")
#             print(f"Date Release: {item['date_release']}")
#             print('-' * 50)
#     else:
#         print("No data was scraped.")
# except Exception as e:
#     logging.error(f"An error occurred: {e}")


url = 'https://otakudesu.cloud/episode/ttw-episode-4-sub-indo/'
data = scrape_anime_data(url)

if data:
    # Generate a filename with current timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    # filename = f"anime_data_{timestamp}.json"
    filename = f"anime_data.json"
    
    # Prepare the data structure for JSON
    json_data = {
        "scrape_date": datetime.now().isoformat(),
        "source_url": url,
        "anime_list": data
    }
    
    # Save data to JSON file
    save_to_json(json_data, filename)
    
    print(f"Scraped {len(data)} anime entries. Data saved to {filename}")
else:
    print("No data was scraped.")