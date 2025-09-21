<script setup>

defineProps({
    letterStatus: Array,
    guesses: Array,
    currentRow: Number
})




</script>

<!-- Should be the guesses-->

<template>
    <div class="flex flex-col gap-8 border-5 text-center">
        <p class="font-bold text-5xl">Guesses</p>
        <div class="grid gap-2">
            <div v-for="(guess, rowIndex) in guesses" :key="rowIndex" class="grid grid-cols-5 gap-2">
                <span
                v-for="colIndex in 5"
                :key="colIndex"
                class="flex items-center justify-center w-16 h-16 border-4 font-extrabold text-2xl uppercase bg-gray-200"
                :class="{
                    'bg-green-400': letterStatus?.[rowIndex]?.[colIndex - 1] === 'correct',
                    'bg-yellow-400': letterStatus?.[rowIndex]?.[colIndex - 1] === 'exists',
                    'bg-red-400': letterStatus?.[rowIndex]?.[colIndex - 1] === 'wrong',
                    'border-gray-600': !letterStatus?.[rowIndex]?.[colIndex - 1] === ''
                }"
                >
                 {{ guess[colIndex - 1] || '_' }}
                </span>
            </div>
        </div>
    </div>
    
</template>


