import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'

//Primevue
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";   // Or Lara, Material, Nora, etc.
import "primeicons/primeicons.css";                       

const app = createApp(App)
app.use(PrimeVue)

app.mount('#app')