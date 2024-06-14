import { defineStore } from 'pinia';
import { User } from '../types/loginSignIn';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      name: '',
      email: '',
      id: '',
    },
  }),
  getters: {
    getUsername: state => state.user.name,
    getUserEmail: state => state.user.email,
    getUserId: state => state.user.id,
  },
  actions: {
    setUser(user: User) {
      this.user = {
        ...user,
      };
    },
  },
  persist: true,
});
