# CI/CD Pipeline using Google Cloud Build, GitHub, and Cloud Run

> **Date:** 06 Apr 2026
>
> **Task:** CI/CD pipeline using Cloud Build from GitHub and deploy it in Cloud Run

## Introduction

This document provides a complete implementation guide for configuring a CI/CD pipeline using:

* **GitHub**

* **Google Cloud**

* **Cloud Build**

* **Cloud Run**

* **Artifact Registry**

* **Dockerized Flask application deployment**

The implementation enables automatic deployment of a Flask application to Cloud Run whenever code is pushed to the GitHub repository.

## Architecture Overview

```
Developer Machine --[git push]--> GitHub Repository --[Cloud Build Trigger]--> Cloud Build Pipeline --[docker build]--> Artifact Registry --[deploy container]--> Cloud Run Service --[HTTPS Endpoint]--> Public Users

```

## Technology Stack

| Component | Technology | 
| ----- | ----- | 
| **Source Control** | GitHub | 
| **CI/CD Engine** | Cloud Build | 
| **Container Runtime** | Docker | 
| **Container Registry** | Artifact Registry | 
| **Runtime Platform** | Cloud Run | 
| **Application Framework** | Flask | 
| **WSGI Server** | Gunicorn | 
| **Base Image** | `python:3.10-slim` | 

## Repository Structure

```
cloud-practice/
└── Cloud-build/
    ├── app.py
    ├── Dockerfile
    ├── requirements.txt
    └── cloudbuild.yaml

```

## Step 1: Create Artifact Registry Repository

### Repository Configuration

| Parameter | Value | 
| ----- | ----- | 
| **Name** | `cloud-build-demo` | 
| **Format** | Docker | 
| **Mode** | Standard | 
| **Location Type** | Region | 
| **Region** | `asia-south1` | 

> `[[Insert Image Here: Artifact Registry Configuration Table / Screenshot]]`

## Step 2: Connect GitHub Repository to Cloud Build

### Objective

Configure Cloud Build GitHub integration and create a deployment trigger.

### GitHub Integration Steps

1. Navigate to **Cloud Build** > **Triggers**.

2. Click **"Connect Repository"**.

3. Select **GitHub (Cloud Build GitHub App)**.

4. Authorize access in GitHub.

5. Select repository: `cloud-practice`.

### Trigger Configuration

| Parameter | Value | 
| ----- | ----- | 
| **Name** | `github-cloud-run-trigger` | 
| **Event** | Push to branch | 
| **Branch Regex** | `^main$` | 
| **Build Config Type** | Cloud Build configuration file | 
| **Config File Path** | `Cloud-build/cloudbuild.yaml` | 
| **Region** | `asia-south1` | 

## Application Configuration

### Step 3: Flask Application

**Objective:** Create a Flask web application.

**File Name:** `app.py`

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello from Cloud Build!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
```

### Step 4: Requirements File

**File Name:** `requirements.txt`

```text
flask
gunicorn
```

### Step 5: Dockerfile Configuration

**File Name:** `Dockerfile`

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=8080

CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]
```

## CI/CD Pipeline Configuration

### Step 6: Cloud Build Pipeline

**Objective:** Automate Docker image build, image push, and Cloud Run deployment.

**File Name:** `cloudbuild.yaml`

```yaml
steps:
  # Step 1: Build Docker Image from the subfolder context
  - name: 'gcr.io/cloud-builders/docker'
    args: [
      'build',
      '-t',
      # Replace with your own Artifact Registry image path: <REGION>-docker.pkg.dev/<PROJECT_ID>/<REPO_NAME>/<IMAGE_NAME>
      'asia-south1-docker.pkg.dev/your-project-id/your-repo-name/your-image-name',
      '-f',
      'Cloud-build/Dockerfile', # Path to Dockerfile
      'Cloud-build'             # Build context directory
    ]

  # Step 2: Push the built Docker image to Google Artifact Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: [
      'push',
      # Use your own image path here
      'asia-south1-docker.pkg.dev/your-project-id/your-repo-name/your-image-name'
    ]

  # Step 3: Deploy the container image to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args: [
      'run', 'deploy', 'my-flask-app',
      '--image',
      # Use your own image path here
      'asia-south1-docker.pkg.dev/your-project-id/your-repo-name/your-image-name',
      '--region', 'asia-south1',
      '--platform', 'managed',
      '--allow-unauthenticated' # Allows public HTTP access to the service
    ]

# Store the built image metadata in Cloud Build logs
images:
  # Use your own image path here
  - 'asia-south1-docker.pkg.dev/your-project-id/your-repo-name/your-image-name'

# Configure Cloud Build logging behavior
options:
  logging: CLOUD_LOGGING_ONLY
```

### Important Build Context Decision

* **Chosen Structure:** The repository maintained multiple learning folders. Instead of moving application files to the repository root, a subfolder approach was used.

* **Used Approach:** `-f Cloud-build/Dockerfile Cloud-build`

* **Reason:**

  * Allows a monorepo-style repository structure.

  * Supports multiple projects in the same repository.

  * Maintains independent build contexts.

## Security & Access Management

### Step 7: Cloud Build IAM Permissions

**Objective:** Allow Cloud Build to deploy Cloud Run services, modify IAM policies, and apply unauthenticated access.

Create a service account and assign the roles below:

| Role | Purpose | 
| ----- | ----- | 
| **Cloud Run Admin** | Deploy Cloud Run services | 
| **Service Account User** | Use runtime service accounts | 

## Deployment Process

### Step 8: Git Operations

**Objective:** Push code changes and trigger the CI/CD pipeline.

#### Commands Used

```bash
git add <folder-name-or-file-name>
git commit -m "Add CI/CD pipeline"
git push origin main
```

#### Sample Output & Verification

1. **Cloud Build Execution Logs:**

   > `[[Insert Image Here: Cloud Build History & Successful Build Details Screenshot]]`

2. **Artifact Registry Image Verification:**

   > `[[Insert Image Here: Artifact Registry Image 'my-app-image' Uploaded Screenshot]]`

3. **Cloud Run Service Deployment:**

   > `[[Insert Image Here: Cloud Run Service 'my-flask-app' Details & Metrics Screenshot]]`

4. **Live Application Output:**

   > `[[Insert Image Here: Browser Output Displaying 'Hello from Cloud Build!']]`