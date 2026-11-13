FROM node:18-bookworm-slim

WORKDIR /app

# MongoDB-compatible database (FerretDB with SQLite storage) for the demo deployment
ADD https://github.com/FerretDB/FerretDB/releases/download/v1.24.0/ferretdb-linux-amd64 /usr/local/bin/ferretdb
RUN chmod +x /usr/local/bin/ferretdb && mkdir -p /data

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

ENV PORT=3060
ENV MONGO_URL=mongodb://127.0.0.1:27017
EXPOSE 3060

CMD ["sh", "-c", "ferretdb --handler=sqlite --sqlite-url=file:/data/ --listen-addr=127.0.0.1:27017 --telemetry=disable & sleep 3 && node app.js"]
