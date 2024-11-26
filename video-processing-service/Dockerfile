# Stage 1: Build stage
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Create necessary directories
RUN mkdir -p /app/src/videos/preprocessed /app/src/videos/processed
RUN npm run build

# Stage 2: Production stage
FROM node:20
RUN apt-get update && apt-get install -y ffmpeg
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
# Create the video directories in the production stage
RUN mkdir -p /app/src/videos/preprocessed /app/src/videos/processed
# Copy the src/videos directory structure
COPY --from=builder /app/src /app/src
EXPOSE 3000
# Using start instead of serve since they're the same
CMD ["npm", "start"]