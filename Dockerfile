FROM node:22-bookworm-slim

WORKDIR /
COPY . .
RUN npm install

EXPOSE 80
ENTRYPOINT npm start