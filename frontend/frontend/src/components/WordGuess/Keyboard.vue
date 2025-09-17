<script setup>

const emit = defineEmits(["key-press", "delete", "enter"]);

function pressKey(letter) {
    emit("key-press", letter); //emit the letter pressed to wordguess.vue / parent
}

</script>

<template>
    <div class="keyboard">
        <button v-for="letter in 'QWERTYUIOPASDFGHJKLZXCVBNM'"
        :key = "letter"
        @click="pressKey(letter)">{{ letter }}
        </button>

        <button @click="emit('enter')">Enter</button>
        <button @click="emit('delete')">Delete</button>
    </div>
</template>