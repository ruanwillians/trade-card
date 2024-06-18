<template>
  <q-layout view="lHh Lpr lFf">
    <Header>
      <div class="flex justify-between q-ma-sm">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
        </q-toolbar>
      </div>
    </Header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      dark
    >
      <div
        class="column justify-center items-center"
      >
        <q-icon
          color="white"
          name="account_circle"
          class="q-mt-xl"
          size="10rem"
        />
        <h6
          class="text-white text-bold q-ma-none q-mt-lg rounded-borders"
        >
          {{ userName }}
        </h6>
        <q-btn
          rounded
          class="q-mb-xl q-pa-md q-px-xl"
          color="info"
          icon="account_balance_wallet"
          flat
          size="md"
          label="Visualizar Deck"
          @click="handleShowDeck"
          style="font-size: 1.1em"
        />
      </div>
      <q-list>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="bg-image-user">
        <router-view />
      </div>
    </q-page-container>

    <DeckCard>
      <FlipCard
        v-for="card in userCards"
        :key="card.id"
        :card="card"
      />
    </DeckCard>
  </q-layout>
</template>

<script setup lang="ts">
  import {
    onBeforeMount,
    provide,
    reactive,
    ref,
  } from 'vue';
  import { useUserStore } from 'src/stores/userStore';
  import { useDeckStore } from 'src/stores/Deck';
  import Header from 'src/components/Header.vue';
  import EssentialLink, {
    EssentialLinkProps,
  } from 'components/EssentialLink.vue';
  import { Card } from 'src/types/Cards';
  import FlipCard from 'src/components/FlipCard.vue';
  import DeckCard from 'src/components/DeckCard.vue';
  import { getMeCards } from 'src/services/Cards';
  import { showNegativeNotify } from 'src/utils/plugins';

  defineOptions({
    name: 'MainLayout',
  });

  onBeforeMount(async () => {
    getUserCards();
  });

  const linksList: EssentialLinkProps[] = [
    {
      title: 'Cards',
      icon: 'dashboard',
      to: '/cards',
    },
    {
      title: 'Criar Negociação',
      icon: 'published_with_changes',
      to: '/trade/create',
    },
    {
      title: 'Ver negociações',
      icon: 'published_with_changes',
      to: '/trade',
    },
  ];

  const userStore = useUserStore();
  const deckStore = useDeckStore();

  const leftDrawerOpen = ref<boolean>(false);
  const userName = ref<string>(
    userStore.getUsername,
  );
  const userCards = reactive<Card[]>([]);

  const handleShowDeck = () => {
    deckStore.showDeck();
  };

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  };

  const getUserCards = async () => {
    try {
      const { data, status } = await getMeCards();
      if (status === 200) {
        userCards.length = 0;
        data.cards.forEach((item: Card) =>
          userCards.push(item),
        );
      }
    } catch (error) {
      showNegativeNotify(
        'Não foi possível realizar a busca dos Cards',
      );
    }
  };

  provide('getUserCards', getUserCards);
</script>

<style>
  .bg-image-user {
    background-image: url('src/assets/bg-user.png');
    background-size: cover;
    background-position: left;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100%;
  }
</style>
