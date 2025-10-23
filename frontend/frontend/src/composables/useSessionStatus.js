// used to check if the browser has a session cookie - if there the user is logged in. (was in HomePage before)

import { ref, computed, onMounted } from 'vue';
import { useCookies } from 'vue3-cookies';

export function useSessionStatus() {
  const { cookies } = useCookies();
  const authenticated = ref(false);

  //  Check if session cookie exists
  const checkCookie = computed(() => !!cookies.get('connect.sid'));

  onMounted(() => {
    authenticated.value = checkCookie.value;
  });

  return { authenticated };
}
