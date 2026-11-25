
FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN gcc backend/game.c -o backend/game -O2

ENV NODE_ENV=production

CMD ["node", "backend/server.js"]
