# GoDashboard - Docker Setup Guide

This guide will help you build and run your GoDashboard React app using Docker.

## Prerequisites
- Docker Desktop installed and running on your system

## Steps

### 1. Build the Docker Image
Open a terminal in your project directory and run:

```
docker build -t godashboard .
```

This command builds a Docker image named `godashboard` using the Dockerfile in your project.

### 2. Run the Docker Container
After the image is built, start a container with:

```
docker run -p 80:80 godashboard
```

- `-p 80:80` maps port 80 of your computer to port 80 in the container.
- The app will be available at [http://localhost](http://localhost) in your browser.

### 3. Stop the Container
To stop the running container, press `Ctrl+C` in the terminal where it is running.

Alternatively, you can list running containers and stop them:

```
docker ps
```
Find the CONTAINER ID for `godashboard`, then run:
```
docker stop <CONTAINER_ID>
```

## Additional Commands

- List all Docker images:
  ```
  docker images
  ```
- Remove an image:
  ```
  docker rmi godashboard
  ```
- Remove all stopped containers:
  ```
  docker container prune
  ```

## Pushing Your Image to Docker Hub

To make your Docker image available online, push it to Docker Hub:

1. Log in to Docker Hub:
   ```
   docker login
   ```
   Enter your Docker Hub username and password when prompted.

2. Tag your image (replace `yourdockerhubusername` with your Docker Hub username):
   ```
   docker tag godashboard yourdockerhubusername/godashboard
   ```

3. Push the image to Docker Hub:
   ```
   docker push yourdockerhubusername/godashboard
   ```

After pushing, your image will be available on Docker Hub and can be pulled from anywhere.

---

If you have any issues, make sure Docker Desktop is running and your system meets the requirements.
