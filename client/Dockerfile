# Use a lightweight Node.js image
FROM node:22.10.0-alpine3.20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY . .

RUN npm update

# Install dependencies
RUN npm install --include=dev

RUN npm install vite -g

# Copy all project files to the container

# Expose port 3000
EXPOSE 5173

CMD ["npm", "run", "dev"]