# Specify the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose a port (if needed) for the application to listen on
EXPOSE 3000

# Specify the command to run the application
CMD ["npm", "start"]