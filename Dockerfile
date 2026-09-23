# 1. Use Node to build the app
FROM node:24.20.0-bookworm-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2. Use a clean Node image to run the app
FROM node:24.20.0-bookworm-slim
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

EXPOSE 3000
ENV NODE_ENV=production

# This starts the SvelteKit server
CMD [ "node", "build" ]