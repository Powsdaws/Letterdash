<script setup>

const emit = defineEmits(["key-press", "delete", "enter"]);

function pressKey(letter) {
    emit("key-press", letter); //emit the letter pressed to wordguess.vue / parent
}

</script>

<template>
    <div class="grid grid-cols-10 gap-2">
        <button v-for="letter in 'QWERTYUIOPASDFGHJKLZXCVBNM'"
        :key = "letter"
        @click="pressKey(letter)"
        class="border outline-offset-2 outline-sky-500 focus:outline-2 size-12">
        <span >
            {{ letter }}
        </span>
        </button>
        <button @click="emit('enter')">Enter</button>
        <button @click="emit('delete')">Delete</button>
    </div>
    
</template>