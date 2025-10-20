// src/composables/useGameApi.js
import { ref } from 'vue'

export function useGameApi() {
  const error = ref(null)
  const loading = ref(false)

  const solution = ref('')
  
  const validWords = ref(new Set())

  const fetchRandomWord = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch("http://localhost:5000/api/word/random") // Express backend
      if (!res.ok) throw new Error(`HTTP error ${res.status}`)
      const data = await res.json()
      solution.value = data.word.toUpperCase()
      console.log("Fetched solution:", solution.value)
    } catch (err) {
      console.error("Failed to fetch word:", err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const fetchValidWords = async () => {
    try {
      const result = await fetch("http://localhost:5000/api/word/valid-words")
      const data = await result.json()
      validWords.value = new Set(data.map(entry => entry.aahed.toUpperCase())) //map data array of objects to array of strings
    } catch (err) {
      console.log("Failed to fetch valid-words with error: ", err)
      error.value = err
    }
  }

  const isValidGuess = (guess) => {
    return validWords.value.has(guess.toUpperCase())
  }

  return { solution, fetchRandomWord, isValidGuess ,fetchValidWords }
}
