import express from "express"
import Word from "../models/Word.js"
import ValidWords from "../models/ValidWord.js"

const router = express.Router()

// GET /api/word/random
router.get("/random", async (req, res) => {
  try {
    const result = await Word.aggregate([{ $sample: { size: 1 } }]) // pick random doc
    if (result.length > 0) {
      res.json({ word: result[0].word }) // send word back to frontend
    } else {
      res.status(404).json({ error: "No words in database" })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

router.get("/valid-words", async (req, res) => { //check http://localhost:5000/api/word/valid-words
  try {
    const validWords = await ValidWords.find().select('-_id')
    res.json(validWords)
  } catch (err) {
    console.log("Could not fetch all valid-words: ", err)
    res.status(500).json({ error: "Server error" })
  }
})

export default router
