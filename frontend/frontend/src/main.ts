import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router.js'

//Primevue
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice';

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      primary: "purple"            // pick your color scheme
    }
  }
});                   

app.use(ToastService) //enable use of toasts
app.component('Toast', Toast)

app.use(router)

app.mount('#app')