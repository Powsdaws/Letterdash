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
        <p class="font-surfer text-3xl">Guesses</p>
        <div class="grid gap-2">
            <div v-for="(guess, rowIndex) in guesses" :key="rowIndex" class="grid grid-cols-5 gap-2">
                <span
                v-for="colIndex in 5"
                :key="colIndex"
                class="flex items-center justify-center w-16 h-16 border-2 border-gray-200 font-extrabold text-2xl uppercase"
                :class="{
                    'bg-green-400 ': letterStatus?.[rowIndex]?.[colIndex - 1] === 'correct',
                    'bg-yellow-400': letterStatus?.[rowIndex]?.[colIndex - 1] === 'exists',
                    'bg-red-400 shake': letterStatus?.[rowIndex]?.[colIndex - 1] === 'wrong',
                    'bg-gray-100': letterStatus?.[rowIndex]?.[colIndex - 1] === ''
                }"
                >
                 {{ guess[colIndex - 1] || '_' }}
                </span>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
    .shake {
        animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        transform: translate3d(0, 0, 0);
    }

    @keyframes shake {
        10%,
        90% {
            transform: translate3d(-1px, 0, 0);
        }

        20%,
        80% {
            transform: translate3d(2px, 0, 0);
        }

        30%,
        50%,
        70% {
            transform: translate3d(-4px, 0, 0);
        }

        40%,
        60% {
            transform: translate3d(4px, 0, 0);
        }
    }

</style>

