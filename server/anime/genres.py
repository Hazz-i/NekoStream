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
    
def has_page_class(tag):
    if tag.name in ['span', 'a']:
        classes = tag.get('class', [])
        # Check if any class contains the word 'page'
        return any('page' in c for c in classes)
    return False

def scrape_grene(url):
    try:
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')
        pages = soup.find('div', class_="page")

        anime_genre_info = []
        genre_elems= pages.find_all('div', class_='col-md-4 col-anime-con genre_2 genre_3 genre_4 genre_9')

        for genre_elem in genre_elems:
            title = genre_elem.find('div', class_="col-anime-title").get_text(strip=True)
            studio = genre_elem.find('div', class_="col-anime-studio").get_text(strip=True)
            epsd = genre_elem.find('div', class_="col-anime-eps").get_text(strip=True)
            rating = genre_elem.find('div', class_="col-anime-rating").get_text(strip=True)
            genre = genre_elem.find('div', class_="col-anime-genre").get_text(strip=True)
            img_url = genre_elem.find('div', class_="col-anime-cover").find('img')['src']
            synopsis = genre_elem.find('div', class_="col-synopsis").text.strip()
            anime_date = genre_elem.find('div', class_="col-anime-date").get_text(strip=True)
            link = genre_elem.find("div", class_="col-anime-title").find('a')['href']
            
            anime_genre_info.append({
                'title': title,
                'studio': studio,
                'epsd': epsd,
                'rating': rating,
                'genre': genre,
                'img_url': img_url,
                'synopsis': synopsis,
                'anime_date': anime_date,
                'link': link
            })

        return anime_genre_info

    except requests.RequestException as e:  
        logging.error(f"An error occurred while fetching the page: {e}")
        return None
    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}")
        return None

def scrape_grene_pages(url):
    try:
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')
        pagination_elements = soup.find_all(['span', 'a'], class_=lambda c: c and 'page-numbers' in c)

        pagination_data = []

        for element in pagination_elements:
            page_text = element.get_text().strip()
            href = element.get('href')
            
            if href:
                pagination_data.append({'page': page_text, 'url': href})
            else:
                pagination_data.append({'page': page_text, 'url': None})

        # Print the results
        # for entry in pagination_data:
        #     print(f"Page: {entry['page']}, URL: {entry['url']}")

        return pagination_data

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
url = 'https://otakudesu.cloud/genres/action/' 

try:
    data = scrape_grene(url)
    if data:
        print(json.dumps(data, ensure_ascii=False, indent=2))
        
        # Save to JSON file
        # save_to_json(data, 'anime_info.json')
    else:
        print("No data was scraped.")
except Exception as e:
    logging.error(f"An error occurred: {e}")