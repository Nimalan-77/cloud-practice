from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return "<h1>Hello from GKE!</h1><p>This was deployed via Jenkins using WIF!</p>"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)