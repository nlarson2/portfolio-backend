FROM node:21.7.1 AS node

FROM node AS node-build
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 44444

FROM node-build AS development
WORKDIR /app

ENTRYPOINT ["npm", "run", "dev"]

FROM development AS production-build
COPY . .
RUN npm run build

FROM node-build AS production
COPY . .
RUN npm run build
# COPY --from=production-build /app/build /app/build
# RUN npm install -g serve
# RUN npm install fastify

WORKDIR /app/build
CMD ["node", "index.js"]
# ENTRYPOINT ["node", "build/index.js"]
# ENTRYPOINT ["serve", "-s", "build"]
