from flask import Flask
import os

app = Flask(__name__)

@app.route('/')
def hello():
    # We use an environment variable so we can see if the deployment actually updated
    version = os.getenv("APP_VERSION", "1.0.0")
    return f"Hello from GKE Autopilot! Current Version: {version}"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)