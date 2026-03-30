# Stage 1: Build React app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build argument for API URL
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build React app
RUN npm run build

# Stage 2: Serve built React with 'serve'
FROM node:20-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy build files
COPY --from=build /app/build ./build

# Expose port 80
EXPOSE 3000

# Start serving the React app
CMD ["serve", "-s", "build", "-l", "80"]
