// src/composables/useGameApi.js
import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kkwrjzzjsiujvfzgoksq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtrd3Jqenpqc2l1anZmemdva3NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODMxMjIsImV4cCI6MjA3NDA1OTEyMn0.U8s6YOSmPCjXG8wEqhBlftKcY0IzSccRa8DYzWPhOaA'
const supabase = createClient(supabaseUrl, supabaseKey)


export function useGameApi() {  // <-- must be exported
  const solution = ref('')
  const error = ref(null)

  const fetchRandomWord = async () => {
    try {
      const { data, error: err } = await supabase.rpc('get_random_word')
      if (err) throw err
      if (data.length > 0) solution.value = data[0].word.toUpperCase() 
        console.log(data)
    } catch (err) {
      console.error(err)
      error.value = err
    }
  }

  return { solution, error, fetchRandomWord }  // <-- must return object
}
