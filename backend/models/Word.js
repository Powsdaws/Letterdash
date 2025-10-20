import mongoose from "mongoose"

//Object Data Modeling (ODM) library - allows to interact with the Word collection (table in db)

const WordSchema = new mongoose.Schema({
  word: { type: String, required: true }
})

const Word = mongoose.model("Word", WordSchema)

export default Word
