FROM mhart/alpine-node:14.10.1

RUN mkdir /root/data
WORKDIR /root/data/backend

COPY . .

RUN npm install

CMD [ "npm", "run", "start" ]
