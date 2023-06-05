# Stage 1: Build the application
FROM node:14-alpine AS build

WORKDIR /app

COPY package*.json ./

# Install the dependencies
RUN npm install

COPY . .

# Build the Nest.js application
RUN npm run build

# Stage 2: Create a minimal production-ready image
FROM node:14-alpine

# Install poppler-utils for pdf reader
RUN apk update && apk add poppler-utils

WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Expose the port your Nest.js application is listening on (default is 3000)
EXPOSE 3000

# Start the Nest.js application
CMD [ "npm", "run", "start:prod" ]