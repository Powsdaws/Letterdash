import mongoose from "mongoose"

const WordSchema = new mongoose.Schema({
  word: { type: String, required: true }
})

const Word = mongoose.model("Word", WordSchema)

export default Word
