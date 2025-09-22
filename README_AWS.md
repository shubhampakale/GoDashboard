# Deploying GoDashboard to AWS ECS (Fargate)

This guide explains how to deploy your Dockerized GoDashboard app to AWS using Elastic Container Service (ECS) with Fargate.

## Prerequisites
- AWS account: https://aws.amazon.com/
- AWS CLI installed: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
- Docker image built and available locally

## Steps

### Using AWS Console and CLI (Recommended)

1. In the AWS Console, go to ECR (Elastic Container Registry) and create a new repository (e.g., godashboard).

2. In the ECR repository page, click “View push commands.” AWS will show you the exact CLI commands you need to:
  - Authenticate Docker to ECR
  - Tag your image
  - Push your image

3. Copy and run those commands in your terminal (they will look like this, but with your account/region info):
  ```
  aws ecr get-login-password | docker login --username AWS --password-stdin <your-aws-account-id>.dkr.ecr.<region>.amazonaws.com
  docker tag godashboard <your-aws-account-id>.dkr.ecr.<region>.amazonaws.com/godashboard
  docker push <your-aws-account-id>.dkr.ecr.<region>.amazonaws.com/godashboard
  ```

4. Once your image is in ECR, go back to the AWS Console:
  - Go to ECS (Elastic Container Service)
  - Create a new cluster (choose Fargate)
  - Create a new task definition (Fargate type), add your container image from ECR
  - Run a service using your task definition

5. Set up a public IP or load balancer to access your app.

You only need the CLI for the image push; everything else can be done in the browser.

### 1. Configure AWS CLI
```
aws configure
```
Enter your AWS Access Key, Secret Key, region, and output format.

### 2. Create an ECR Repository
```
aws ecr create-repository --repository-name godashboard
```

### 3. Authenticate Docker to ECR
```
aws ecr get-login-password | docker login --username AWS --password-stdin <your-aws-account-id>.dkr.ecr.<region>.amazonaws.com
```
Replace `<your-aws-account-id>` and `<region>` with your actual AWS account ID and region (e.g., us-east-1).

### 4. Tag and Push Your Docker Image to ECR
- Tag your image:
  ```
  docker tag godashboard <your-aws-account-id>.dkr.ecr.<region>.amazonaws.com/godashboard
  ```
- Push your image:
  ```
  docker push <your-aws-account-id>.dkr.ecr.<region>.amazonaws.com/godashboard
  ```

### 5. Deploy to ECS with Fargate
- Go to the AWS ECS console: https://console.aws.amazon.com/ecs/
- Create a new cluster (choose "Networking only" for Fargate)
- Create a new task definition (Fargate type) and add your container image
- Run a service using your task definition

### 6. Access Your App
- Set up a load balancer or assign a public IP to your service to access your app from the internet.

---

**Notes:**
- Replace all placeholders (`<your-aws-account-id>`, `<region>`) with your actual values.
- AWS free tier includes limited Fargate and ECR usage. Check your usage to avoid charges.
- For more details, see the official docs: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-launch-types.html
