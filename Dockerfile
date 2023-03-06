FROM node:latest

WORKDIR /app

COPY node/ .

RUN npm install
CMD ["node", "."]