import express from "express"
import Word from "../models/Word.js"

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

export default router
