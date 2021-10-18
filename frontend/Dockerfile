FROM node:12.18.3

WORKDIR /app

COPY package.json .

RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]