# Use a lightweight version of Node.js
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of our application code
COPY . .

# Expose the port our app runs on
EXPOSE 8080

# The command to run our app
CMD [ "npm", "start" ]