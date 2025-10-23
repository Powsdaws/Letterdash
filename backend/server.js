// backend/server.js
//Entry point!
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import wordRoutes from "./routes/word.js"
import dotenv from 'dotenv';
dotenv.config(); 

const app = express()
app.use(cors())
app.use(express.json())

console.log("Connecting to:", process.env.MONGODB_URI);


//Connect to db
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err))

// mount routes
app.use("/api/word", wordRoutes) //routes everything to do with words

//Start the server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
