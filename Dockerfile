# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nest.js application
RUN npm run build

# Expose the application on port 3000
EXPOSE 3000

# Command to run the Nest.js application in production mode
CMD ["npm", "run", "start:prod"]
