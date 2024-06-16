import { defineStore } from 'pinia';

export const useDeckStore = defineStore('deck', {
  state: () => ({
    showDeckState: false,
  }),
  getters: {
    getDeckState: state => state.showDeckState,
  },
  actions: {
    showDeck(): void {
      this.showDeckState = true;
    },

    hideDeck(): void {
      this.showDeckState = false;
    },
  },
  persist: true,
});
