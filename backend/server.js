//serves as entrypoint for my application

// fileName : server.js 
// Example using the http module
import express from "express";
import mongoose from "mongoose";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());


app.get("/api/word", (req, res) => {
  res.json({ word: "apple" }); // later fetch random from DB
});

mongoose.connect("mongodb://localhost:27017/wordle");

//Starts the server/app
const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}) 