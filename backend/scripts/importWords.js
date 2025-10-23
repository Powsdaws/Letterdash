import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DailyWord from '../models/DailyWord.js';
import ValidWord from '../models/ValidWord.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function importCSV(filePath, Model, transform = (row) => row) {
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(transform(data)))
    .on('end', async () => {
      try {
        await Model.insertMany(results);
        console.log(`imported ${results.length} into ${Model.collection.collectionName}`);
        mongoose.connection.close();
      } catch (err) {
        console.error('Import error:', err);
      }
    });
}

// Transform date format from DD-MM-YYYY to ISO
const transformDaily = (row) => ({
  word: row.word,
  date: new Date(row.date.split('-').reverse().join('-')),
});

//importCSV('../other/words.csv', DailyWord, transformDaily);
importCSV('../other/valid-wordle-words.csv', ValidWord);
