# BMI Calculator (MERN)

A small college-project BMI calculator built with MongoDB, Express, React, and Node.js. It calculates BMI, shows a health category, and saves recent calculations to MongoDB.

## Run locally

1. Install [Node.js](https://nodejs.org/) and start MongoDB locally, or use a MongoDB Atlas connection string.
2. Create `server/.env` from `server/.env.example` and set `MONGODB_URI`.
3. Run:

```bash
npm install
npm run install-all
npm run dev
```

Open `http://localhost:5173`.

## Free deployment (Render + MongoDB Atlas)

This repository includes `render.yaml` so the frontend and API deploy together as one Render web service.

1. Create a free MongoDB Atlas cluster and create a database user. Add `0.0.0.0/0` to the IP access list so Render can connect.
2. In Render, create a **Blueprint** from this GitHub repository. Render detects `render.yaml`.
3. Enter the Atlas connection string as the `MONGODB_URI` environment variable and deploy.

Render gives free web services a public `onrender.com` URL. Its free services spin down after 15 minutes of inactivity, so the first request after that can take about a minute. MongoDB Atlas offers one free cluster per project for small learning and proof-of-concept apps.

## API

- `POST /api/bmi` — calculate and save a record
- `GET /api/bmi` — retrieve the latest 10 records
