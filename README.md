# A Test for Docker Compose & Vite

This repo is an example of how to get Docker Compose to build production ready code while concurrently being able to locally create frontend dev environment that can interact with backend.

1. Docker ENV variables with VITE are converted to arguments in the build script to be loaded into runtime ENV varaibles
2. Docker volume for backend is persisted to preserve database entries.

## Build Project

1. Install docker & docker-compose
2. Customize .env variables in the root directory
3. run `docker-compose up -d --build`

The production ready environment is available at http://localhost

## Dev Frontend

1. navigate to ./frontend
2. Customize .env VITE_API_PORT in /frontend directory to match the build environment
3. run `npm run dev`

The frontend dev environment is available at http://localhost:5173 but still interacts with backend api at port 3001

## Built With

-   docker
-   docker-compose

FRONTEND

-   vue 3
-   vite
-   axios

DATABASE

-   mongodb

BACKEND

-   express
-   mongoose
