FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
EXPOSE 3010
CMD [ "npm", "start" ]
RUN npm install