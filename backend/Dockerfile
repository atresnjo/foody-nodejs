FROM node:14-alpine

WORKDIR ./

COPY ./ ./
COPY package*.json ./

RUN npm install
RUN npm run build:prod

EXPOSE 8080

CMD ["npm", "run", "start:prod"]