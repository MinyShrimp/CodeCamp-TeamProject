FROM node:16.14-alpine

WORKDIR /app
COPY ./package.json /app
COPY ./yarn.lock /app

RUN yarn install

COPY . /app

EXPOSE 8081
CMD ["yarn", "dev"]