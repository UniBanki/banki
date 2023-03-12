FROM node:lts-alpine3.17

WORKDIR /app

COPY node/ .

RUN npm install
CMD ["node", "index.js"]