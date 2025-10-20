import mongoose from 'mongoose'

const ValidWordSchema = new mongoose.Schema({
  word: { type: String, required: true }
})

const ValidWord = mongoose.model('ValidWord', ValidWordSchema, 'valid_words')

export default ValidWord