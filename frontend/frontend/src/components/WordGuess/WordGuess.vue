<script setup>
import {ref,  onMounted, onBeforeUnmount} from 'vue';

import GameBoard from './GameBoard.vue';
import Keyboard from './Keyboard.vue';
import { useGameApi } from '@/composables/useGameApi'

//Datastructures for keyboard
const guessedWords = ref(new Set());
const guessedLetters = ref(new Map());

//Datastructures for the gameboard
const guesses = ref(["","","","","", ""]) //The guesses of the player
const currentRow = ref(0);
const currentCol = ref(0);
const correct = ref(false);

//Used to keep track of which letters are in the right place
const letterStatus = ref([
  ["", "", "", "", ""], 
  ["", "", "", "", ""], 
  ["", "", "", "", ""], 
  ["", "", "", "", ""], 
  ["", "", "", "", ""], 
  ["", "", "", "", ""]
]);

//Fetching answer
const {solution, fetchRandomWord} = useGameApi()


onMounted(() => {
  fetchRandomWord()
})

function handleKeyPress(letter) {
    //add letter to the current row
    console.log(guesses)
    if (guesses.value[currentRow.value].length < 5) {
        guesses.value[currentRow.value] += letter;
        currentCol.value++;
    }
}

function handleDeleteLetter() {
    //Removes a letter
    guesses.value[currentRow.value] = guesses.value[currentRow.value].slice(0, -1);
    if (currentCol.value > 0) {
        currentCol.value--;
    }
}

function handleEnter() {
    console.log(currentCol.value)
    console.log(currentRow.value)
    console.log(letterStatus)
    if (currentCol.value === 5) { //if we have a full word
        console.log("Full word")
        for (let i = 0; i < 5; i++) { // go though each letter

            //Add to set of guessed words
            guessedWords.value.add(guesses.value[currentRow.value][i].toUpperCase());
            console.log(guessedWords)
            
            //Set letterstatus
            if (guesses.value[currentRow.value][i].toUpperCase() === solution.value[i].toUpperCase()) {
                letterStatus.value[currentRow.value][i] = "correct" //letterstatus for gameboard
                guessedLetters.value.set(guesses.value[currentRow.value][i].toUpperCase(), "correct") //letterstatus for keyboard
            } else if (solution.value.includes(guesses.value[currentRow.value][i].toUpperCase())) {
                letterStatus.value[currentRow.value][i] = "exists"
                guessedLetters.value.set(guesses.value[currentRow.value][i].toUpperCase(), "exists") 
            } else {
                letterStatus.value[currentRow.value][i] = "wrong"
                guessedLetters.value.set(guesses.value[currentRow.value][i].toUpperCase(), "wrong") 
            }
        }
        if (guesses.value[currentRow.value].toUpperCase() === solution.value) {
            correct.value = true;
            
        }
        console.log(correct.value)
        currentCol.value = 0;
        currentRow.value++;
        
    }


    //TODO This does not work rn
    /*
    function onKeyDown(event) {
    const key = event.key.toUpperCase();
    if (key === "BACKSPACE") handleDeleteLetter();
    else if (key === "ENTER") handleEnter();
    else if (/^[A-Z]$/.test(key)) handleKeyPress(key);
    }

    onMounted(() => window.addEventListener("keydown", onKeyDown));
    onBeforeUnmount(() => window.removeEventListener("keydown", onKeyDown));
    */
    
}

</script>

<template>
    <div class="flex flex-col min-h-screen justify-center items-center content-start gap-8 ">
        <GameBoard :guesses="guesses" :letterStatus="letterStatus" :currentRow="currentRow"></GameBoard>
        <Keyboard :guessedWords="guessedWords" :guessedLetters="guessedLetters"
        @key-press="handleKeyPress"
        @delete="handleDeleteLetter"
        @enter="handleEnter"
        ></Keyboard>
    </div>
    <<Dialog v-model:visible="correct" :style="{ width: '25rem' }">
         <span class=" font-extrabold text-2xl text-center text-surface-500 dark:text-surface-400 block mb-8">YOU GOT IT, WELL DONE!</span>
    </Dialog>
</template>