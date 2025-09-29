// src/composables/useGameApi.js
import { ref } from 'vue'

export function useGameApi() {
  const solution = ref('')
  const error = ref(null)
  const loading = ref(false)

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

  return { solution, fetchRandomWord }
}
