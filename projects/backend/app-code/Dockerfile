FROM --platform=linux/amd64 python:3.8-slim-buster
EXPOSE 80
WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
COPY ./backend /app/backend
COPY settings.py /app/settings.py
COPY .secrets.toml /app/.secrets.toml
RUN python -m pip install -r requirements.txt
CMD ["flask", "run", "-port", "80", "--app", "backend.app:create_app"]
