FROM node:21.7.1 AS node

FROM node AS node-build
COPY package*.json ./
RUN npm install
EXPOSE 44444

FROM node-build AS development
WORKDIR /app

ENTRYPOINT ["npm", "run", "dev"]

FROM development AS production-build
COPY . .
RUN npm run build

FROM node AS production

COPY --from=production-build /app/build /app/build
RUN npm install -g serve

WORKDIR /app
ENTRYPOINT ["node", "index.js"]
# ENTRYPOINT ["serve", "-s", "build"]
