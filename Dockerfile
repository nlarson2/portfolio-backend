FROM node:21.7.1 AS node

FROM node AS node-build
COPY package*.json ./
RUN npm install

FROM node-build AS development
WORKDIR /app
EXPOSE 44444

ENTRYPOINT ["npm", "run", "dev"]

FROM development AS production-build
COPY . .
RUN npm run build

FROM node AS production

COPY --from=production-build /app/build /app/build
RUN npm install -g serve

WORKDIR /app
EXPOSE 3000

ENTRYPOINT ["serve", "-s", "build"]
