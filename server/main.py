from flask import Flask, jsonify
from flask_cors import CORS
import logging
import os

from anime.animeHome import scrape_home_anime
from anime.ongoingAnime import scrape_ongoing_anime
from anime.episodes import scrape_anime_episodes
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS = CORS(app, origins="*")

@app.route('/neko-stream/home', methods=['GET'])
def home():
    try:
        url = "https://otakudesu.cloud/"
        data = scrape_home_anime(url)
        
        if data:
            results = []
            results.extend(data)
            
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

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))  # Use the port from .env, or default to 5000
    app.run(debug=True, port=port)