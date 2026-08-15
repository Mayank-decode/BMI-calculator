import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import BmiRecord from './models/BmiRecord.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

function getCategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Healthy weight';
  if (bmi < 30) return 'Overweight';
  return 'Obesity';
}

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.get('/api/bmi', async (_req, res) => {
  try {
    const records = await BmiRecord.find().sort({ createdAt: -1 }).limit(10);
    res.json(records);
  } catch {
    res.status(500).json({ message: 'Unable to load BMI history.' });
  }
});

app.post('/api/bmi', async (req, res) => {
  const { name, height, weight } = req.body;
  const heightValue = Number(height);
  const weightValue = Number(weight);

  if (!Number.isFinite(heightValue) || !Number.isFinite(weightValue) || heightValue <= 0 || weightValue <= 0) {
    return res.status(400).json({ message: 'Please enter valid positive height and weight values.' });
  }

  const bmi = Number((weightValue / ((heightValue / 100) ** 2)).toFixed(1));
  const record = await BmiRecord.create({ name: name || 'Guest', height: heightValue, weight: weightValue, bmi, category: getCategory(bmi) });
  res.status(201).json(record);
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`API running at http://localhost:${port}`)))
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });
