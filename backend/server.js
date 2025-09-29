// backend/server.js
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import wordRoutes from "./routes/word.js"

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/LetterdashDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err))

// mount routes
app.use("/api/word", wordRoutes)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
