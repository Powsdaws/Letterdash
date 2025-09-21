<script setup>
import {ref} from 'vue';
import GameBoard from './GameBoard.vue';
import Keyboard from './Keyboard.vue';

const guesses = ref(["","","","","", ""]) //The guesses of the player
const currentRow = ref(0);
const currentCol = ref(0);

//Used to keep track of which letters are in the right place
const letterStatus = ref([
  ["", "", "", "", ""], 
  ["", "", "", "", ""], 
  ["", "", "", "", ""], 
  ["", "", "", "", ""], 
  ["", "", "", "", ""], 
  ["", "", "", "", ""]
]);

const res = await fetch("http://localhost:5000/api/word")
const word = await res.json();
const solution = word.word.toUpperCase();
console.log(solution)

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
        for (let i = 0; i < 5; i++) {
            if (guesses.value[currentRow.value][i].toUpperCase() === solution[i]) {
                letterStatus.value[currentRow.value][i] = "correct"
            } else if (solution.includes(guesses.value[currentRow.value][i].toUpperCase())) {
                letterStatus.value[currentRow.value][i] = "exists"
            } else {
                letterStatus.value[currentRow.value][i] = "wrong"
            }
        }
        currentCol.value = 0;
        currentRow.value++;
    }
    
}

</script>

<template>
    <div class="flex flex-col min-h-screen justify-center items-center content-start gap-8 ">
        <GameBoard :guesses="guesses" :letterStatus="letterStatus" :currentRow="currentRow"></GameBoard>
        <Keyboard
        @key-press="handleKeyPress"
        @delete="handleDeleteLetter"
        @enter="handleEnter"
        ></Keyboard>
    </div>
    
</template>