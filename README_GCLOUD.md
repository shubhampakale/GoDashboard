# Deploying GoDashboard to Google Cloud Run

This guide explains how to deploy your Dockerized GoDashboard app to Google Cloud Run using the free tier.

## Prerequisites
- Google Cloud account (https://cloud.google.com/)
- Google Cloud SDK installed: https://cloud.google.com/sdk
- Docker image built and pushed to Docker Hub or locally available

## Steps

### 1. Authenticate and Set Up Your Project
```
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```
Replace `YOUR_PROJECT_ID` with your actual Google Cloud project ID.

### 2. Enable Required APIs
```
gcloud services enable run.googleapis.com artifactregistry.googleapis.com
```

### 3. Create an Artifact Registry Repository (if needed)
```
gcloud artifacts repositories create my-repo --repository-format=docker --location=us-central1
```

### 4. Tag and Push Your Docker Image to Artifact Registry
- Tag your image:
  ```
  docker tag godashboard us-central1-docker.pkg.dev/YOUR_PROJECT_ID/my-repo/godashboard
  ```
- Authenticate Docker to Google:
  ```
  gcloud auth configure-docker us-central1-docker.pkg.dev
  ```
- Push your image:
  ```
  docker push us-central1-docker.pkg.dev/YOUR_PROJECT_ID/my-repo/godashboard
  ```

### 5. Deploy to Cloud Run
```
gcloud run deploy godashboard \
  --image=us-central1-docker.pkg.dev/YOUR_PROJECT_ID/my-repo/godashboard \
  --platform=managed \
  --region=us-central1 \
  --allow-unauthenticated
```

### 6. Access Your App
After deployment, Google Cloud will provide a public URL for your app.

---

**Notes:**
- Replace `YOUR_PROJECT_ID` with your actual Google Cloud project ID everywhere.
- The free tier has resource and usage limits. For production, review Google Cloud Run pricing and quotas.
- For more details, see the official docs: https://cloud.google.com/run/docs/quickstarts/build-and-deploy
