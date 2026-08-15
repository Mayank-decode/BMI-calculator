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

## API

- `POST /api/bmi` — calculate and save a record
- `GET /api/bmi` — retrieve the latest 10 records
