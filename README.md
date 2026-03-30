

````markdown
# MERN Fitness Tracker App

A full-stack MERN application (MongoDB, Express, React, Node.js) for fitness tracking, Dockerized for production deployment, and ready for Docker Hub and Kubernetes.

---

## Features

- MongoDB Atlas as database
- Node.js backend with JWT authentication
- React frontend consuming backend API
- Dockerized for easy deployment
- Production-ready images for backend and frontend

---

## 1. Local Setup

### Step 1: Clone Repository
```bash
git clone <your-repo-url>
cd FitnessTrack
````

### Step 2: Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

## 2. Setup Environment Variables

You **must create `.env` files** for both backend and frontend.
These files contain secrets like database URL and JWT key.

### Backend `.env` (`/backend/.env`)

```env
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster-url>/myDatabase?retryWrites=true&w=majority
JWT=secret78 #optional write anything you want 
PORT=8080
```

### Frontend `.env` (`/frontend/.env`)

```env
REACT_APP_API_URL=http://<your-server-ip>:8080/api
```

* Replace `<your-server-ip>` with your server IP or `localhost` for local development.

---

## 3. MongoDB Atlas Setup

Follow these steps to get your **MongoDB connection URL**:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) → Login.
2. Create a **cluster** (free tier is fine for testing).
3. Go to **Database Access** → Add a new database user with username & password.
4. Go to **Network Access** → Add your IP address (or `0.0.0.0/0` for testing).
5. Go to **Clusters → Connect → Connect your application**.
6. Copy the connection string, e.g.:

```text
mongodb+srv://username:password@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
```

7. Paste it in your **backend `.env`** file under `MONGODB_URL`.

---

## 4. Docker Deployment

We will build and run Docker containers **without embedding secrets**, passing `.env` at runtime.

### Step 1: Backend Dockerfile (`/backend/Dockerfile`)

```dockerfile
FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]
```

### Step 2: Frontend Dockerfile (`/frontend/Dockerfile`)

```dockerfile
# Stage 1: Build React App
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# Stage 2: Serve Production Build
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build /app/build
EXPOSE 80
CMD ["serve", "-s", "build", "-l", "80"]
```

---

### Step 3: Build Docker Images

#### Backend

```bash
cd backend
docker build -t mernapp-backend:latest .
```

#### Frontend

```bash
cd ../frontend
export REACT_APP_API_URL=http://<your-server-ip>:8080/api
docker build --build-arg REACT_APP_API_URL=$REACT_APP_API_URL -t mernapp-frontend:latest .
```

---

### Step 4: Run Docker Containers Locally

#### Backend

```bash
docker run -d -p 8080:8080 --env-file ./backend/.env --name backend mernapp-backend:latest
```

#### Frontend

```bash
docker run -d -p 3000:80 --name frontend mernapp-frontend:latest
```

Access your app:

```
http://<your-server-ip>:3000
```

---

## 5. Push Images to Docker Hub

### Step 1: Login to Docker Hub

```bash
docker login
```

* Enter your Docker Hub username and password.

### Step 2: Tag Images

```bash
docker tag mernapp-backend:latest <dockerhub-username>/mernapp-backend:latest
docker tag mernapp-frontend:latest <dockerhub-username>/mernapp-frontend:latest
```

### Step 3: Push Images

```bash
docker push <dockerhub-username>/mernapp-backend:latest
docker push <dockerhub-username>/mernapp-frontend:latest
```

✅ Your images are now available on Docker Hub.

---

## 6. Notes & Best Practices

1. **Do not commit `.env` files** — secrets must be passed at runtime.
2. **Frontend environment variables** must be provided **at build time** with `ARG` + `ENV`.
3. Backend reads `.env` variables at **runtime** using `--env-file`.
4. Docker images are production-ready and can be deployed to **Kubernetes**.
5. In Kubernetes, use **Secrets** to store sensitive env variables instead of `.env` files.

---

## 7. Next Steps

* Deploy these Docker images on a cloud server.
* Use **Kubernetes with Ingress** for production traffic routing.
* Automate CI/CD for builds and pushes to Docker Hub.

```

---

This `README.md` now includes:  

- Local setup instructions  
- `.env` files for **frontend & backend**  
- MongoDB Atlas connection process  
- Docker build & run commands  
- Docker Hub login, tag, and push process  
- Best practices notes for production  

---

