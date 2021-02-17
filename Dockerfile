FROM node:15.8.0-alpine3.10

RUN apk add --no-cache tzdata
ENV TZ=Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir /root/data
WORKDIR /root/data/backend

COPY . .

RUN npm install

CMD [ "npm", "run", "start" ]
