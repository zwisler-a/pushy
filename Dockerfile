FROM node:21-alpine as build

WORKDIR /app

COPY ui/package.json ui/package-lock.json ./
RUN npm install

COPY ui/ ./
RUN npm run build

FROM node:21-alpine

WORKDIR /app

COPY server/package.json server/package-lock.json ./
RUN npm install

RUN mkdir data
COPY server/ ./

COPY --from=build /app/build ./public

EXPOSE 3000

CMD ["node", "bin/www"]
