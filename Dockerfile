FROM node:8.10.0

ADD . /site
WORKDIR /site
RUN npm install

EXPOSE 3000

CMD npm run dev
