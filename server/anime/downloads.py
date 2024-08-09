import requests
from bs4 import BeautifulSoup
import logging
import json

logging.basicConfig(level=logging.INFO)

def scrape_anime_downloads(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        download = soup.find('div', class_='download')
        
        if not download:
            logging.warning("Couldn't find div with class 'download'")
            return None
        
        download_entries = download.find_all('ul')
        
        if not download_entries:
            logging.warning("No ul elements found within the download div")
            return None

        download_links = []
        seen_links = set()
        
        for entry in download_entries:
            try:
                elements = entry.find_all('li')
                
                # Process each element
                for elem in elements:
                    type_text = elem.find('strong').get_text(strip=True) if elem.find('strong') else "Unknown"
                    size = elem.find('i').get_text(strip=True) if elem.find('i') else "Unknown Size"
                    links = elem.find_all('a')
                    
                    for link in links:
                        href = link['href']
                        platform = link.get_text(strip=True)
                        
                        # Create a unique key based on type, link, and platform to avoid duplicates
                        unique_key = (type_text, href, platform)

                        if unique_key not in seen_links:
                            seen_links.add(unique_key)
                            download_links.append({
                                'type': type_text,
                                'link': href,
                                'platform': platform,
                                'size': size
                            })
            except Exception as e:
                logging.error(f"Error processing entry: {e}")
        
        return download_links
    
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
# url = 'https://otakudesu.cloud/episode/ttw-episode-4-sub-indo/' 

# try:
#     data = scrape_anime_downloads(url)
#     if data:
#         print(json.dumps(data, ensure_ascii=False, indent=2))
        
#         # Save to JSON file
#         save_to_json(data, 'anime_download_list.json')
#     else:
#         print("No data was scraped.")
# except Exception as e:
#     logging.error(f"An error occurred: {e}")
