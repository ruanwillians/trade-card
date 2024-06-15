<template>
  <q-page class="row items-center justify-start">
    <div
      class="col-lg-4 col-md-4 col-sm-6 q-mx-xl"
    >
      <h1 class="text-info text-bold title">
        O Maior mercado de trade de Cards!
      </h1>
      <h5 class="text-white subtitle">
        Conquiste seus cards, conheça outros
        players e faça trocas para fortalecer o
        seu deck.
      </h5>
      <q-btn
        rounded
        class="full-width btn rounded glossy"
        color="info q-pa-md"
        label="Ver negociações"
        @click="scrollToNegotiations"
      />
    </div>
  </q-page>
  <q-page class="row" id="tradeMarketplacePage">
    <div class="marketplace-page">
      <h3 class="text-info text-bold text-center">
        Negociações
      </h3>

      <TradeMaketplace
        @actionScroll="scrollToNegotiations"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import TradeMaketplace from 'src/components/TradeMaketplace.vue';
  const scrollToNegotiations = () => {
    const element = document.querySelector(
      '#tradeMarketplacePage',
    );
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };
</script>

<style scoped>
  .scroll-transition {
    transition: transform 0.3s ease-out;
  }
  .title {
    font-size: 5rem;
    line-height: 1;
    margin-bottom: 0;
  }

  .subtitle {
    font-size: 2em;
  }

  .btn {
    font-size: 1.5em;
  }
  .marketplace-page {
    margin-top: 5em;
    width: 100vw;
  }

  @media (max-width: 720px) {
    .title {
      font-size: 3rem;
      line-height: 1.2;
      text-align: center;
    }

    .subtitle {
      font-size: 1.2rem;
      line-height: 1.2;
      text-align: center;
    }

    .marketplace-page {
      margin-top: 8em;
    }
  }
</style>
