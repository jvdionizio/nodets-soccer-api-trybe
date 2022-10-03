FROM node:16.14-alpine

WORKDIR /app-backend

EXPOSE 3001

COPY ./ /app-backend/

RUN npm install

CMD [ "npm", "start" ]
