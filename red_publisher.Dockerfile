FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npx", "ts-node", "red_publisher.ts"]
