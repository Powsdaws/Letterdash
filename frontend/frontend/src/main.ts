import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'

//Primevue
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-blue/theme.css'  // or another Lara theme
import 'primevue/resources/primevue.min.css'             
import 'primeicons/primeicons.css'                       

const app = createApp(App)
app.use(PrimeVue)

app.mount('#app')