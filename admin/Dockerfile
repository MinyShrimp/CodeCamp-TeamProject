FROM node:18.4-alpine

WORKDIR /app
COPY ./package.json /app
COPY ./yarn.lock /app

RUN yarn install

COPY . /app

EXPOSE 8081
CMD ["yarn", "dev"]