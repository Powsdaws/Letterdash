<script setup>

defineProps({
    guessedWords: Object, //note to self: this unwraps, and i dont need to call guessedwords.value.has..
    guessedLetters: Object
})

const emit = defineEmits(["key-press", "delete", "enter"]);

function pressKey(letter) {
    console.log(letter)
    emit("key-press", letter); //emit the letter pressed to wordguess.vue / parent
}

</script>

<template>
    <div class="grid grid-cols-10 gap-2">
        <button v-for="letter in 'QWERTYUIOPASDFGHJKLZXCVBNM'"
        :key = "letter"
        @click="pressKey(letter)"
        class="border outline-offset-2 outline-sky-500 focus:outline-2 size-12"
        :class="{
            'bg-gray-50': guessedLetters.has(letter) === false,
            'bg-gray-300': guessedLetters.get(letter) === 'wrong',
            'bg-yellow-400': guessedLetters.get(letter) === 'exists',
            'bg-green-400': guessedLetters.get(letter) === 'correct',
            }">
        <span >
            {{ letter }}
        </span>
        </button>
        <button @click="emit('enter')">Enter</button>
        <button @click="emit('delete')">Delete</button>
    </div>
    
</template>