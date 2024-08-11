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
    
def scrape_batch_home(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes

        soup = BeautifulSoup(response.text, 'html.parser')

        rapidiv = soup.find_all('div', class_='rapi')
        venzdiv = rapidiv[1].find('div', class_='venz')

        if not rapidiv or not venzdiv:
            logging.warning("Couldn't find div with class 'rapi' and 'venz'")
            return None

        anime_batch_entries = venzdiv.find_all('li')

        if not anime_batch_entries:
            logging.warning("No li elements found within the venzdiv")
            return None

        anime_batch_data = []

        for entry in anime_batch_entries:
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

                anime_batch_data.append({
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

        return anime_batch_data
    except requests.RequestException as e:
        logging.error(f"An error occurred while fetching the page: {e}")
        return None
    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}")
        return None

def scrape_home_movie(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes

        soup = BeautifulSoup(response.text, 'html.parser')

        widgetseries = soup.find('div', class_='widgetseries')

        if not widgetseries:
            logging.warning("Couldn't find div with class 'widgetseries'")
            return None

        movie_entries = widgetseries.find_all('li')

        if not movie_entries:
            logging.warning("No li elements found within the venz div")
            return None

        anime_movie_data = []

        for entry in movie_entries:
            try:
                img_elem = entry.find('div', class_='imgseries')
                if not img_elem:
                    logging.warning(f"Couldn't find 'imgseries' div in entry")
                    continue

                link = img_elem.find('a')['href']
                img = img_elem.find('a').find('img')['src']

                body_elem = entry.find('div', class_='lftinfo')
                if not body_elem:
                    logging.warning(f"Couldn't find 'lftinfo' div in entry")
                    continue

                title = body_elem.find('h2').text.strip()

                # mengambil elemen span
                spans = body_elem.find_all('span')   
                genre = spans[0].text.strip()
                day_release = spans[1].text.strip()

                anime_movie_data.append({
                    'title': title,
                    'link': link,
                    'image_url': img,
                    'genre': genre,
                    'day_release': day_release
                })
            except Exception as e:
                logging.error(f"Error processing entry: {e}")
                continue

        return anime_movie_data

    except requests.RequestException as e:
        logging.error(f"An error occurred while fetching the page: {e}")
        return None
    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}")
        return None

def scrape_top_anime_list(url):
    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for bad status codes

    soup = BeautifulSoup(response.text, 'html.parser')

    table = soup.find('table', class_='top-ranking-table')

    table_rows = table.find_all('tr', class_="ranking-list")

    top_anime_data = []
    for row in table_rows:
        try:

            ranking = row.find("td", class_="rank ac").text.strip()
            title = row.find("td", class_="rank ac").text.strip()
            img = row.find('td', class_="title al va-t word-break").find('a').find('img')['data-src']
            title = row.find('td', class_="title al va-t word-break").find("div", class_="di-ib clearfix").find("h3").text.strip()
            info = row.find('td', class_="title al va-t word-break").find("div", class_="information di-ib mt4").text.strip()

            description_parts = info.splitlines()
            description = description_parts[0].strip().replace('TV ', '').replace('(', '').replace(')', '')
            date_range = description_parts[1].strip()

            rate = row.find('td', class_="score ac fs14").text.strip()

            top_anime_data.append({
                'ranking': ranking,
                'title': title,
                'image_url': img,
                'rating': rate,
                'data_range': date_range,
                "description": description
            })
        except Exception as e:
            logging.error(f"Error processing entry: {e}")
            continue
    return top_anime_data

def save_to_json(data, filename):
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        logging.info(f"Data successfully saved to {filename}")
    except Exception as e:
        logging.error(f"An error occurred while saving data to JSON: {e}")


# Usage
# url = 'https://otakudesu.cloud/'
# url = 'https://myanimelist.net/topanime.php?type=bypopularity&limit=0'

# try:
#     data = scrape_top_anime_list(url)
#     if data:
#         print(json.dumps(data, ensure_ascii=False, indent=2))

#         # Save to JSON file
#         # save_to_json(data, 'anime_list.json')
#     else:
#         print("No data was scraped.")
# except Exception as e:
#     logging.error(f"An error occurred: {e}")
