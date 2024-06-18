<template>
  <q-page class="row" id="tradeMarketplacePage">
    <div class="marketplace-page">
      <h1
        class="text-white q-ma-sm rounded-borders title text-bold q-ml-md"
      >
        Todas as negociações
      </h1>
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
    font-size: 4rem;
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
