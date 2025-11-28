from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, origins=os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(','))

@app.route('/api/health')
def health():
    return {'status': 'ok', 'message': 'PSU Certificate System Backend'}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)