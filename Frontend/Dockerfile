FROM node:alpine AS builder

ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "start"]

# docker pull romanletodiani/multi-frontend:latest
# docker run -d --rm -p 5173:80 --name multiFrontend romanletodiani/multi-frontend:latest