FROM mhart/alpine-node:14.10.1

RUN mkdir /root/data
WORKDIR /root/data/frontend

COPY . .

RUN npm install
RUN npm install -g serve

CMD [ "serve", "-s", "build" ]