<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { ref, computed, onMounted } from 'vue';
const router = useRouter();
function changePage(route) {
    router.push('/' + route)
}


axios.defaults.withCredentials = true;

const { cookies } = useCookies();

//  Reactive state
const email = ref('');
const password = ref('');
const result = ref('');
const authenticated = ref(false);

//  Check if session cookie exists
const checkCookie = computed(() => {
  return !!cookies.get('connect.sid');
});

//  Lifecycle hook
onMounted(() => {
  authenticated.value = checkCookie.value;
});

//  Signup
const onSignup = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/signup', {
      email: email.value,
      password: password.value,
    });
    authenticated.value = true;
  } catch (error) {
    console.error('Signup failed:', error);
  }
};

// Login
const onLogin = async () => {
  try {
    const response = await axios.post('/api/login', {
      email: email.value,
      password: password.value,
    });
    authenticated.value = true;
  } catch (error) {
    alert(error.message);
  }
};

//  Logout
const onLogout = async () => {
  try {
    await axios.post('/api/logout');
    authenticated.value = false;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

</script>

<template>

    <div class="flex flex-col gap-12 mt-12 ml-10 mr-10">
        <div class="flex flex-row justify-between items-center">
            <span class="pi pi-home" style="font-size: 2.5rem"></span>
            <h1 class="font-surfer text-4xl">Letterdash</h1>
            <div>
                <div>
                <input v-model="email" placeholder="Email" />
                <input v-model="password" placeholder="Password" type="password" />
                <button @click="onSignup">Sign Up</button>
                <button @click="onLogin">Log In</button>
                <button @click="onLogout">Log Out</button>

                <p v-if="authenticated">You are logged in!</p>
                </div>
            </div>
        </div>

        <div>
            <p class="font-surfer text-4xl">Games</p>
            <hr>
        </div>
        
        <div>
            <div class="card-hover border-2 rounded-3xl cursor-pointer" style="width: 20rem; overflow: hidden" @click="changePage('wordguess')" >
                <Card >
                <template #title>
                    <h2 class="text-center text-3xl">Word Guess</h2>
                </template>
                <template #content>
                     <img alt="word-guess-image" src="../assets/images/Wordguess.gif" />
                </template>
                <template #footer>
                    <div class="flex gap-4 mt-1">
                        <Button label="Play" class="w-full"/>
                    </div>
                </template>
                </Card>
            </div>
            
        </div>
        
    </div>
    
</template>

<style>

.card-hover:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}


</style>