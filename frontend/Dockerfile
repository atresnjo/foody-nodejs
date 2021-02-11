FROM node:14-alpine

WORKDIR ./

COPY ./ ./
COPY ./public ./public
COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]