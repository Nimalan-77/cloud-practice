from flask import Flask
import os

app = Flask(__name__)

@app.route('/api/data')
def get_data():
    return "Data successfully fetched from the Backend API!"

if __name__ == '__main__':
    # Use 0.0.0.0 to make it reachable within the K8s cluster
    app.run(host='0.0.0.0', port=5000)