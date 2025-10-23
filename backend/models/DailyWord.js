import mongoose from 'mongoose';

const dailyWordSchema = new mongoose.Schema({
  word: String,
  date: Date,
});

export default mongoose.model('DailyWord', dailyWordSchema);
