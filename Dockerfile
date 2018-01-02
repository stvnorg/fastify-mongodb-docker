FROM node:carbon
WORKDIR /app
ADD . /app
RUN npm install fastify --save
RUN npm install fastify-mongodb --save
EXPOSE 3333
CMD ["node", "index.js"]
