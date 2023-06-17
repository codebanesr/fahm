# Use the Node 18 base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock (or package-lock.json) to the working directory
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the entire app code to the container
COPY . .

# Build the Next.js app
RUN yarn build

# Expose the port on which the app will run (change if necessary)
EXPOSE 3000

# Define the command to start the app
CMD ["yarn", "start"]
