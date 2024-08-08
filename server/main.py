from flask import Flask, jsonify
from flask_cors import CORS
import logging
from anime.animeHome import scrape_home_anime
from anime.ongoigAnime import scrape_ongoing_anime
from dotenv import load_dotenv
import os

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
            for item in data:
                result = {
                    'title': item.get('title'),    
                    'link': item.get('link'),
                    'episode' : item.get('episode'),
                    'image_url': item.get('image_url'),
                    'image_alt': item.get('image_alt'),
                    'date_release': item.get('date_release'),
                    'day_release': item.get('day_release')
                }
                results.append(result)
            
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


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))  # Use the port from .env, or default to 5000
    app.run(debug=True, port=port)