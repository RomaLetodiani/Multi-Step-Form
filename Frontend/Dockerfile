FROM node:alpine AS builder

ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
