# TODO: Make this work:

FROM node:alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json (if using)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the .env file to the container
COPY .env ./  

COPY . .

# Assuming your tsc script compiles TypeScript files
RUN npm run build

FROM node:alpine

# Assuming your compiled JS goes into dist folder
COPY --from=builder /app/dist .  

# Replace with your main entry point if different
CMD [ "node", "index.js" ] 
