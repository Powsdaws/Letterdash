<script setup>
import {ref,  onMounted, onBeforeUnmount, onUnmounted} from 'vue';
import GameBoard from '../components/WordGuess/GameBoard.vue';
import Keyboard from '../components/WordGuess/Keyboard.vue';
import { useGameApi } from '@/composables/useGameApi'
import { useToast } from 'primevue';
import { useRouter } from 'vue-router';

const WORD_LENGTH = 5;

const router = useRouter();

//Datastructures for keyboard
const guessedWords = ref(new Set());
const guessedLetters = ref(new Map());

//Datastructures for the gameboard
const guesses = ref(["","","","","", ""]) //The guesses of the player
const currentRow = ref(0);
const currentCol = ref(0);
const correct = ref(false); //if user won
const lost = ref(false); //if user lost
const toast = useToast();

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
const {solution, fetchRandomWord, isValidGuess, fetchValidWords, fetchDailyWord} = useGameApi()


onMounted(() => {
  fetchDailyWord()
  fetchValidWords()
  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeyDown)
})

//handling clicking letters
function handleKeyPress(letter) {
    //add letter to the current row
    if (guesses.value[currentRow.value].length < WORD_LENGTH) {
        guesses.value[currentRow.value] += letter.toUpperCase();
        currentCol.value++;
    }
}

//handling key presses
function handleKeyDown(event) {
    var keyValue = event.key;
    var keyCode = event.keyCode

    if (keyCode === 8) {
        handleDeleteLetter();
    } else if (keyCode === 13) {
        handleEnter();
    } else if (keyCode >= 65 && keyCode <= 90 ) {
        handleKeyPress(keyValue)
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
    if (currentCol.value === WORD_LENGTH) { //if we have a full word
        const guess = guesses.value[currentRow.value].toUpperCase()

        console.log(guesses)
        //check if valid word
        if (!isValidGuess(guess)){
            console.log("Not a valid word")
            handleInvalidGuess(guess, " is not a valid word.");
            return;
        } else if (guesses.value.slice(0, currentRow.value).includes(guess)) {
            console.log("Word already guessed")
            handleInvalidGuess(guess, " is already guessed.");
            return;
        }

        for (let i = 0; i < WORD_LENGTH; i++) { // go though each letter

            //Add to set of guessed words
            guessedWords.value.add(guesses.value[currentRow.value][i].toUpperCase());
            
            //Set letterstatus
            if (guess[i].toUpperCase() === solution.value[i].toUpperCase()) {
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

        //check if won
        if (guess.toUpperCase() === solution.value) {
            console.log("WON")
            correct.value = true;
        } else if (currentRow.value === 5) {
            //check if lost
            console.log("LOST")
            lost.value = true;
        }
        currentCol.value = 0;
        currentRow.value++;
        
    }
}

//handles when user inputs a invalid word
function handleInvalidGuess(guess, message) {
    toast.add({
        severity: 'info',
        detail: `"${guess}"${message}`,
        life: 2000  
    })
}

function returnToHomePage() {
    router.push('/');
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
    <<Dialog v-model:visible="correct" :closable="false" :close-on-escape="false" :style="{ width: '25rem' }">
         <span class=" font-extrabold text-2xl text-center text-surface-500 dark:text-surface-400 block mb-8">YOU GOT IT, WELL DONE!</span>
         <Button class="w-full" @click="returnToHomePage">Return to homepage</Button>
    </Dialog>
    <Dialog v-model:visible="lost" :closable="false" :close-on-escape="false" :style="{ width: '25rem' }">
         <span class=" font-extrabold text-2xl text-center text-surface-500 dark:text-surface-400 block mb-8">Ahww! That was not it sadly</span>
         <Button class="w-full" @click="returnToHomePage">Return to homepage</Button>
    </Dialog>

    <Toast 
    position="bottom-center" ></Toast> 
</template>