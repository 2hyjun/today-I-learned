FROM node:7.7.2-alpine

WORKDIR /usr/app

COPY package.json .
run npm install --quiet

COPY . .

CMD ["node", "app.js"]
