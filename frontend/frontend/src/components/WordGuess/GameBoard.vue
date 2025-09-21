<script setup>

defineProps({
    guesses: {
        type: Array,
        required: true //the prop must be given to init this component
    },
    rowStatus: Array,
    currentRow: Number
})




</script>

<!-- Should be the guesses-->

<template>
    <div class="flex flex-col gap-8 border-5 text-center">
        <p class="font-bold text-5xl">Guesses</p>
        <Button label="Click Me" />
        <div class="grid gap-2">
            <div v-for="(guess, i) in guesses" :key="i" class="grid grid-cols-5 gap-2">
                <span 
                class="flex items-center justify-center w-12 h-12 border-4 text-xl font-bold uppercase"
                :class="{
                    'border-green-400' : rowStatus?.[i] === 'correct', 
                    'border-red-400' : rowStatus[i] === 'incorrect',
                    ' border-gray-600' : rowStatus[i] === ''}" 
                    v-for="n in 5" :key="n">
                    {{ guess[n - 1] || "_" }}
                </span>
            </div>
        </div>
    </div>
    
</template>


