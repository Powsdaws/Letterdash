<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
function changePage(route) {
    router.push('/' + route)
}

</script>

<template>

    <div class="flex flex-col gap-12 mt-12 ml-10 mr-10">
        <div class="flex flex-row justify-between items-center">
            <span class="pi pi-home" style="font-size: 2.5rem"></span>
            <h1 class="font-surfer text-4xl">WordGuess</h1>
            <span class="pi pi-user" style="font-size: 2.5rem"></span>
        </div>

        <div>
            <p class="font-lexend text-5xl">Games</p>
            <hr>
        </div>
        
        <div>
            <Card class="border-2" style="width: 20rem; overflow: hidden">
                <template #title>
                    <h2 class="text-center text-3xl">Word Guess</h2>
                </template>
                <template #content>
                     <img alt="word-guess-image" src="../assets/images/Wordguess.gif" />
                </template>
                <template #footer>
                    <div class="flex gap-4 mt-1">
                        <Button label="Play" class="w-full" @click="changePage('wordguess')" />
                    </div>
                </template>
            </Card>
        </div>
        
    </div>
    
</template>