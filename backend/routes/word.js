import express from "express"
import Word from "../models/Word.js"

const router = express.Router();

router.get("/random", async (req, res) => {
    try {
        // Use aggregation with $sample to get ONE random word
        const result = await Word.aggregate([{ $sample: { size: 1 } }]);

        if (result.length > 0) {
            res.json({Word: result[0].word});
        } else {
            res.status(404).json({error: "No words in db"})
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
