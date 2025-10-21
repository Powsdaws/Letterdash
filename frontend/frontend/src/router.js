import { createRouter, createWebHistory } from 'vue-router';
import WordGuess from '@/views/WordGuess.vue';
import HomePage from '@/views/HomePage.vue'

const routes = [
    {path: '/wordguess', name: 'WordGuess', component: WordGuess},
    {path: '/', name: 'HomePage', component: HomePage}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;