<script setup lang="ts">
import { RouterView } from 'vue-router';
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
