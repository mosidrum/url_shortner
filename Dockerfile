FROM node:alpine

WORKDIR /app

COPY package*.json .
COPY nodemon.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]
