from flask import Flask, jsonify
import logging
from downloads import scrape_anime_data  

app = Flask(__name__)

@app.route('/scrape_anime', methods=['GET'])
def scrape_anime():
    try:
        url = "https://otakudesu.cloud/episode/ttw-episode-4-sub-indo/"  # Replace with the target URL
        data = scrape_anime_data(url)
        
        if data:
            results = []
            for item in data:
                result = {
                    "type": item.get('type'),
                    "link": item.get('link'),
                    "platform": item.get('platform'),
                    "size": item.get('size')
                }
                results.append(result)
            
            return jsonify({'success': "success", 'data': results})
        else:
            return jsonify({'success': "fail", 'message': "No data was scraped."}), 404

    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return jsonify({'success': "fail", 'message': "An error occurred.", 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
