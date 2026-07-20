FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist/edu-apoyos-web ./dist/edu-apoyos-web
EXPOSE 4000
CMD ["node", "dist/edu-apoyos-web/server/server.mjs"]
