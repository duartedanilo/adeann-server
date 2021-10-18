FROM nikolaik/python-nodejs:python3.6-nodejs14

WORKDIR /code

COPY adeann /code/adeann
COPY server /code/server

RUN pip install --no-cache-dir -r adeann/requirements.txt

WORKDIR /code/server

RUN npm install --production

EXPOSE 5000

CMD ["node", "src/index.js"]
