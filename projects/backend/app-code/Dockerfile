FROM --platform=linux/amd64 python:3.8-slim-buster
EXPOSE 80
WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
COPY ./backend /app/backend
RUN python -m pip install -r requirements.txt
CMD ["python", "-m", "backend"]
