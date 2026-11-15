# Cloud & DevOps Practice Portfolio 🚀

Welcome to my **Cloud & DevOps Practice** repository! This space serves as a portfolio of hands-on projects where I explore, implement, and master modern cloud infrastructure, CI/CD pipelines, container orchestration, and GitOps workflows. 

Each project represents a specific architectural pattern or toolchain configuration designed to solve real-world deployment, automation, and scaling challenges.

---

## 📂 Project Directory & Overview

| # | Project Name | Core Tech Stack | Description |
|---|---|---|---|
| **1** | [Cloud-build](./1.%20Cloud-build) | GCP Cloud Build, Docker | Automated container image building and cloud-native integration pipelines. |
| **2** | [cloud-deploy-demo](./2.%20cloud-deploy-demo) | Google Cloud Deploy, Kubernetes | Managed continuous delivery pipelines targeting modern container platforms. |
| **3** | [github-actions-with-multi-stage](./3.%20github-actions-with-multi-stage) | GitHub Actions, Docker, Multi-stage builds | Optimized CI pipelines leveraging multi-stage Docker builds to reduce image sizes and secure artifacts. |
| **4** | [gke-3tier-standard](./4.%20gke-3tier-standard) | Kubernetes (GKE), WIF , Bastion Host | Enterprise-grade 3-tier application architecture (Frontend, Backend, Database) deployed on Google Kubernetes Engine. |
| **5** | [jenkins-gke-project](./5.%20jenkins-gke-project) | Jenkins, GKE | End-to-end CI/CD automation combining Jenkins automation servers with Kubernetes-native deployments. |
 |

---

## 🛠️ Detailed Project Breakdown

### 1. Cloud-build
* **Focus:** Cloud-Native CI Automation
* **Overview:** This project explores Google Cloud Build to execute automated software build pipelines directly in the cloud. It focuses on writing efficient build configurations (`cloudbuild.yaml`) to compile code, build secure container images, and push them to artifact registries with minimal local overhead.

### 2. cloud-deploy-demo
* **Focus:** Continuous Delivery & Release Management
* **Overview:** Designed to practice structured application delivery, this project demonstrates the use of deployment pipelines to promote releases across multiple environments (such as staging and production). It emphasizes safe rollout strategies and integration with cloud deployment targets.

### 3. github-actions-with-multi-stage
* **Focus:** CI/CD Workflow Optimization & Containerization
* **Overview:** This project highlights advanced GitHub Actions automation paired with multi-stage Docker builds. By separating build dependencies from the final runtime environment, it achieves significantly smaller image footprints, improved security posture, and faster deployment cycles.

### 4. gke-3tier-standard
* **Focus:** Microservices Architecture & Kubernetes Orchestration
* **Overview:** A classic enterprise architecture implementation, this project deploys a standard 3-tier application (web frontend, application backend, and persistent database layer) onto Google Kubernetes Engine (GKE). It covers Kubernetes resource configurations like Deployments, Services, Ingress, and ConfigMaps to ensure high availability and scalability.

### 5. jenkins-gke-project
* **Focus:** Enterprise Automation & CI/CD on Kubernetes
* **Overview:** This project integrates traditional CI/CD tooling with modern container orchestrators by running Jenkins pipelines that provision and deploy workloads onto GKE clusters. It showcases pipeline-as-code principles, credential management, and dynamic agent provisioning.


---

## 💡 Connect With Me
If you have any feedback, suggestions, or want to discuss DevOps practices, feel free to reach out or explore my profile!