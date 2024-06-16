<template>
  <q-dialog
    v-model="store.getDeckState"
    position="bottom"
    full-width
  >
    <q-card dark>
      <q-card-section
        class="row justify-between no-wrap"
      >
        <h4 class="text-info q-ma-none text-bold">
          Cartas do Deck
        </h4>
        <q-btn
          class="q-mlx-md"
          flat
          round
          icon="close"
          @click="handleHideDeck"
        >
          <q-tooltip>
            Fechar deck de cartas
          </q-tooltip>
        </q-btn>
      </q-card-section>
      <q-card-section
        class="row flex items-start q-gutter-lg deck"
      >
        <slot></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { useDeckStore } from 'src/stores/Deck';
  defineOptions({
    name: 'DeckCard',
  });

  const store = useDeckStore();

  const handleHideDeck = () => {
    store.hideDeck();
  };
</script>

<style scoped>
  .deck {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  @media (max-width: 1096px) {
    .deck {
      justify-content: center;
    }
  }
</style>
