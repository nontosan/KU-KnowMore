FROM mhart/alpine-node:14.10.1

RUN apk add --no-cache tzdata
ENV TZ=Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir /root/data
WORKDIR /root/data/backend

COPY . .

RUN npm install

CMD [ "npm", "run", "start" ]
