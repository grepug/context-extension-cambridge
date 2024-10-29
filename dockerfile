# Use the official Deno image as the base image
FROM denoland/deno:2.0.3

# Set the working directory
WORKDIR /app

# Copy the project files to the working directory
COPY . .

# Cache the dependencies as a separate layer
RUN deno cache src/denoServer.ts

# Expose the port the app runs on
EXPOSE 4000

# Run the Deno application
CMD ["deno", "task", "start"]