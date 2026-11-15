# Step 1: Use an official Node.js runtime as the base image
FROM node:18-slim

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json first 
# This is a trick to make builds faster by caching dependencies
COPY app/package*.json ./

# Step 4: Install the dependencies
RUN npm install --production

# Step 5: Copy the rest of your application code
COPY app/ .

# Step 6: Tell the container which port to expose
EXPOSE 8080

# Step 7: Define the command to run your app
CMD [ "npm", "start" ]