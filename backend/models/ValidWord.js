import mongoose from 'mongoose';

const validWordSchema = new mongoose.Schema({
  word: String,
});

export default mongoose.model('ValidWord', validWordSchema);
