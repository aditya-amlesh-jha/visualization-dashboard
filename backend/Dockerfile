FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install yarn
RUN yarn install

CMD ["npm", "start"]