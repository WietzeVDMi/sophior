FROM node:20-slim

RUN npm install -g @shopify/cli @shopify/theme

WORKDIR /app
