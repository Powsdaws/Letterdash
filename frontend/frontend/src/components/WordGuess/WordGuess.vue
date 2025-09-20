<script setup>
import {ref} from 'vue';
import GameBoard from './GameBoard.vue';
import Keyboard from './Keyboard.vue';

const guesses = ref(["","","","","", ""]) //The guesses of the player
const currentRow = ref(0);
const rowStatus = ref(['','','','','', '']);
const res = await fetch("http://localhost:5000/api/word")
const word = await res.json();
const solution = word.word
console.log(solution)

function handleKeyPress(letter) {
    //add letter to the current row
    console.log(guesses)
    if (guesses.value[currentRow.value].length < 5) {
        guesses.value[currentRow.value] += letter;
    }
}

function handleDeleteLetter() {
    //Removes a letter
    guesses.value[currentRow.value] = guesses.value[currentRow.value].slice(0, -1);
}

function handleEnter() {
    if (guesses.value[currentRow.value].length === 5) {
        if (guesses.value[currentRow.value].toUpperCase() === solution.toUpperCase()) {
            rowStatus.value[currentRow.value] = "correct"
            console.log("NICELY DONE!")
        } else {
            rowStatus.value[currentRow.value] = "incorrect"
        }
        
        currentRow.value++;
    }
}

</script>

<template>
    <div class="flex flex-col min-h-screen justify-center items-center content-start gap-4 ">
        <GameBoard :guesses="guesses" :rowStatus="rowStatus" :currentRow="currentRow"></GameBoard>
        <Keyboard
        @key-press="handleKeyPress"
        @delete="handleDeleteLetter"
        @enter="handleEnter"
        ></Keyboard>
    </div>
    
</template>