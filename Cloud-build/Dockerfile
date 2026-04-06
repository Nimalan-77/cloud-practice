FROM python:3.10-slim

WORKDIR /app

COPY Cloud-build/requirements.txt .
RUN pip install -r requirements.txt

COPY Cloud-build/ .

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 app:app