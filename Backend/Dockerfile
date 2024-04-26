FROM node:alpine AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if using)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the .env file to the container
COPY .env ./  

COPY . .

# Build the app
RUN npm run build

EXPOSE 5050

# Replace with your main entry point if different
CMD [ "npm", "start" ] 

# docker pull romanletodiani/multi-backend:latest
# docker run -d -p 5050:5050 --name multiBackend romanletodiani/multi-backend:latest