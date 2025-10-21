import { createRouter, createWebHistory } from 'vue-router';
import WordGuess from '@/views/WordGuess.vue';

const routes = [
    {path: '/wordguess', name: 'WordGuess', component: WordGuess}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;