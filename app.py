import os
from flask import Flask, Response

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/env.js')
def env_js():
    token = os.getenv('BASIC_B64', '')
    return Response(f'window.BASIC_B64 = "{token}";', mimetype='application/javascript')

@app.route('/')
def root():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
