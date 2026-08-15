import mongoose from 'mongoose';

const bmiRecordSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, maxlength: 50, default: 'Guest' },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bmi: { type: Number, required: true },
    category: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('BmiRecord', bmiRecordSchema);
