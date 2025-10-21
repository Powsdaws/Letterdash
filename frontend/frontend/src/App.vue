<script setup lang="ts">
import { RouterView } from 'vue-router';
import WordGuess from './views/WordGuess.vue';
</script>

<template>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <ProgressSpinner class="flex flex-col min-h-screen justify-center" />
    </template>
  </Suspense>

  
</template>


<style scoped>
</style>
