from flask import Flask, jsonify
from flask_cors import CORS
import logging
import os

from anime.animeHome import scrape_home_anime, scrape_home_movie, scrape_batch_home, scrape_top_anime_list
from anime.ongoingAnime import scrape_ongoing_anime
from anime.episodes import scrape_anime_episodes
from anime.players import scrape_anime_players
from anime.downloads import scrape_anime_downloads
from anime.searchAnime import scrape_search_anime
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS = CORS(app, origins="*")

@app.route('/neko-stream/home', methods=['GET'])
def home():
    try:
        # Memanggil fungsi untuk mendapatkan data anime
        anime_url = "https://otakudesu.cloud/"
        anime_data = scrape_home_anime(anime_url)
        anime_batch_data = scrape_batch_home(anime_url)
        
        # Memanggil fungsi untuk mendapatkan data movie
        anime_list = "https://myanimelist.net/"
        top_anime_list = scrape_top_anime_list(anime_list)
        
        if anime_data or anime_batch_data or top_anime_list:
            results = {
                'anime': anime_data if anime_data else [],
                'batch': anime_batch_data if anime_batch_data else [],
                'top_anime_list': top_anime_list if top_anime_list else []
            }
            
            return jsonify({'success': "success", 'data': results})
        else:
            return jsonify({'success': "fail", 'message': "No data was scraped."}), 404

    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return jsonify({'success': "fail", 'message': "An error occurred.", 'error': str(e)}), 500

@app.route('/neko-stream/ongoing-all', methods=['GET'])
def ongoing():
    try:
        page = 1
        results = []

        while True:
            url = f'https://otakudesu.cloud/ongoing-anime/page/{page}/'
            logging.info(f"Scraping page {page}")
            data = scrape_ongoing_anime(url)

            if data:
                results.extend(data)
                page += 1
            else:
                logging.info(f"No more data found on page {page}. Stopping.")
                break  

        if results:
            return jsonify({'success': "success", 'data': results})
        else:
            return jsonify({'success': "fail", 'message': "No data was scraped."}), 404
            
            
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return jsonify({'success': "fail", 'message': "An error occurred.", 'error': str(e)}), 500

@app.route('/neko-stream/<anime>/details', methods=['GET'])
def details(anime):
    try:
        url = f"https://otakudesu.cloud/anime/{anime}/"
        data = scrape_anime_episodes(url)
        
        if data:
            results = []
            results.extend(data)
            
            return jsonify({'success': "success", 'data': results})
        else:
            return jsonify({'success': "fail", 'message': "No data was scraped."}), 404

    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return jsonify({'success': "fail", 'message': "An error occurred.", 'error': str(e)}), 500
    

@app.route('/neko-stream/<anime>/<episode>', methods=['GET'])
def players(anime, episode):
    try:
        # Validate parameters
        if not anime or not episode:
            return jsonify({'success': "fail", 'message': "Invalid parameters."}), 400

        url = f"https://otakudesu.cloud/episode/{episode}/"
        
        # Log the URL being accessed
        logging.info(f"Accessing URL: {url}")

        data = scrape_anime_players(url)
        
        if data:
            results = []
            results.extend(data)
            return jsonify({'success': "success", 'data': results})
        else:
            return jsonify({'success': "fail", 'message': "No data was scraped."}), 404

    except Exception as e:
        # Log the error with traceback for better debugging
        logging.error(f"An error occurred: {e}", exc_info=True)
        return jsonify({'success': "fail", 'message': "An error occurred.", 'error': str(e)}), 500

    
@app.route('/neko-stream/<anime>/<episode>/downloads', methods=['GET'])
def downloads(anime, episode):
    try:
        if not anime or not episode:
            return jsonify({'success': "fail", 'message': "Invalid parameters."}), 400

        url = f"https://otakudesu.cloud/episode/{episode}/"
        data = scrape_anime_downloads(url)
        
        if data:
            results = []
            results.extend(data)
            
            return jsonify({'success': "success", 'data': results})
        else:
            return jsonify({'success': "fail", 'message': "No data was scraped."}), 404

    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return jsonify({'success': "fail", 'message': "An error occurred.", 'error': str(e)}), 500

@app.route('/neko-stream/search=<anime>', methods=['GET'])
def search(anime):
    try:
        animeSearch = anime.replace(" ", "+")
        if not anime:
            return jsonify({'success': "fail", 'message': "Invalid parameters."}), 400

        url = f"https://otakudesu.cloud/?s={animeSearch}&post_type=anime"
        data = scrape_search_anime(url)
        
        if data:
            results = []
            results.extend(data)
            
            return jsonify({'success': "success", 'data': results})
        else:
            return jsonify({'success': "fail", 'message': "No data was scraped."}), 404

    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return jsonify({'success': "fail", 'message': "An error occurred.", 'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))  # Use the port from .env, or default to 5000
    app.run(debug=True, port=port)