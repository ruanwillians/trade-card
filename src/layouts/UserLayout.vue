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
      behavior="mobile"
      bordered
      dark
      class="col"
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
      <div class="row justify-center">
        <q-btn
          rounded
          class="q-mt-xl"
          color="white"
          icon="logout"
          flat
          size="md"
          label="Logout"
          @click="logout"
          style="font-size: 1.1em"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <div class="bg-image-user">
        <router-view />
      </div>
    </q-page-container>

    <DeckCard>
      <h6 v-if="userCards.length === 0">
        Não há cartas no seu deck
      </h6>
      <FlipCard
        v-else
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
  import EssentialLink from 'components/EssentialLink.vue';
  import { Card } from 'src/types/Cards';
  import FlipCard from 'src/components/FlipCard.vue';
  import DeckCard from 'src/components/DeckCard.vue';
  import { getMeCards } from 'src/services/Cards';
  import { showNegativeNotify } from 'src/utils/plugins';
  import { useRouter } from 'vue-router';
  import { EssentialLinkProps } from 'src/types/Links';

  defineOptions({
    name: 'UserLayout',
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
      icon: 'shop',
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
  const router = useRouter();

  const handleShowDeck = () => {
    deckStore.showDeck();
  };

  const logout = () => {
    localStorage.clear();
    router.push('/');
  };

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  };

  const getUserCards = async () => {
    try {
      const response = await getMeCards();

      if (response.status !== 200) {
        throw new Error();
      }

      userCards.length = 0;
      response.data.cards.forEach((item: Card) =>
        userCards.push(item),
      );
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
    background-position: center;
    background-repeat: no-repeat;
    height: 150vh;
    width: 100%;
  }
</style>
