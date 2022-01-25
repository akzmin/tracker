FROM node:17.4.0
WORKDIR /tracker

COPY package*.json ./

RUN npm install

COPY ./src ./src

EXPOSE 8888
CMD [ "node", "src/index.js ]