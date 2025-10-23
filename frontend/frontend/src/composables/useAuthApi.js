import axios from 'axios';

export function useAuthApi(email, password, authenticated){
    axios.defaults.withCredentials = true;
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
        const response = await axios.post('http://localhost:5000/api/login', {
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
        await axios.post('http://localhost:5000/api/logout');
        authenticated.value = false;
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
    };

    return { onSignup, onLogin, onLogout}
}