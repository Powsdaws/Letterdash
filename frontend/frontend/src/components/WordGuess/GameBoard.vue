<script setup>

defineProps({
    guesses: {
        type: Array,
        required: true
    }
})

</script>

<!-- Should be the guesses-->

<template>
    <div>
        <div class="flex flex-col w-[35vw] h-[70vh] border-4">
            <p class="text-center p-5 font-bold">Guesses</p>
            <div v-for="(guess, i) in guesses" :key="i">
                <span v-for="n in 5" :key="n">
                    {{ guess[n-1] || "" }}
                    {{ console.log("aa" + guess[n]) }}
                </span>
            </div>
        </div>
    </div>
</template>


