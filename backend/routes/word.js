import express from "express"
import Word from "../models/DailyWord.js"
import ValidWords from "../models/ValidWord.js"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
dayjs.extend(customParseFormat);



const router = express.Router()
const dateToday = dayjs().format('DD-MM-YYYY');
const parsedDate = dayjs(dateToday, 'DD-MM-YYYY').toDate(); 


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

router.get('/daily-word', async (req, res) => {
  try {
    const startOfDay = dayjs().startOf('day').toDate();   
    const endOfDay = dayjs().endOf('day').toDate();       

    const dailyWord = await Word.findOne({
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (!dailyWord) {
      return res.status(404).json({ error: "No daily word found for today" });
    }

    res.json({ word: dailyWord.word });
  } catch (err) {
    console.log("Could not fetch daily word: ", err);
    res.status(500).json({ error: "Server error" });
  }
});

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
