FROM node:alpine as build

WORKDIR /usr/src/app

COPY client/package*.json client/
RUN cd client && npm ci
COPY client/ client/
RUN cd client && npm run build


FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
COPY --from=build /usr/src/app/client/build /usr/src/app/client/build


CMD ["npx", "ts-node", "index.ts"]

