# Use an official Python runtime as a parent image
FROM node:8

# Set the working directory to /code
WORKDIR /code

# Copy the current directory contents into the container at /code
COPY . /code

# Install any needed packages specified in 
RUN npm install

# Make port 3004 available to the world outside this container
EXPOSE 3004

# Define environment variable
ENV PORT 3004

# Run app.py when the container launches
CMD ["npm", "start"]
