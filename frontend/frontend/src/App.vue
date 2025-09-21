<script setup lang="ts">
import WordGuess from './components/WordGuess/WordGuess.vue';
</script>

<template>
  <Suspense>
    <template #default>
      <WordGuess />
    </template>
    <template #fallback>
      <ProgressSpinner class="flex flex-col min-h-screen justify-center" />
    </template>
  </Suspense>

  
</template>


<style scoped>
</style>
