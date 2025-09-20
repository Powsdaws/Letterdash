<script setup lang="ts">
import WordGuess from './components/WordGuess/WordGuess.vue';
</script>

<template>
  <Suspense>
    <template #default>
      <WordGuess />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<style scoped>
</style>
