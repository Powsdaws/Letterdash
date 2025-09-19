<script setup>

defineProps({
    guesses: {
        type: Array,
        required: true //the prop must be given to init this component
    }
})

</script>

<!-- Should be the guesses-->

<template>
    <div class="flex flex-col gap-8 border-5 text-center">
        <p class="font-bold text-5xl">Guesses</p>
        <div class="grid gap-2">
            <div v-for="(guess, i) in guesses" :key="i" class="grid grid-cols-5 gap-2">
                <span v-for="n in 5" :key="n"class="flex items-center justify-center w-12 h-12 border border-gray-400 text-xl font-bold uppercase">
                    {{ guess[n - 1] || "_" }}
                </span>
            </div>
        </div>
    </div>
    
</template>


