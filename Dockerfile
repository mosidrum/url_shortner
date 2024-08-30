FROM node:alpine

WORKDIR /usr/src/shortit_app

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]