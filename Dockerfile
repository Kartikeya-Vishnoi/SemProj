# Use a specific version of Ubuntu
FROM ubuntu:latest

# Update package lists and install necessary packages
RUN apt update -y && \
    apt install -y curl git

# Install Node.js using NodeSource repository
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Clone the project repository
RUN git clone https://github.com/Kartikeya-Vishnoi/SemProj

# Copy the script into the project directory
COPY ./script.sh ./SemProj/script.sh

# Set execute permissions for the script
RUN chmod 700 ./SemProj/script.sh

# Set the working directory
WORKDIR /SemProj

# Expose necessary ports
EXPOSE 3000 8080 8900

# Install globally required npm package
RUN npm install -g concurrently

# Define the entry point for the container
ENTRYPOINT ["./script.sh", "&&", "npm", "start"]
