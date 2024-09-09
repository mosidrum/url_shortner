FROM node:alpine

WORKDIR /usr/src

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]
