<template>
  <div class="q-px-lg q-py-md">
    <q-timeline
      v-for="trade in trades"
      :key="trade.id"
      :layout="layout"
      color="info"
      dark
    >
      <q-timeline-entry
        :title="
          trade.user?.name || 'Usuário Anônimo'
        "
        :subtitle="formatDate(trade.createdAt)"
        side="left"
        icon="account_circle"
      >
        <h4
          class="row justify-center text-bold bg-secondary rounded-borders"
        >
          Ofertou
        </h4>
        <div
          class="row q-gutter-lg justify-end"
          :class="{
            'justify-center':
              useQuasar().screen.lt.sm,
            'justify-end':
              !useQuasar().screen.lt.sm,
          }"
        >
          <FlipCard
            v-for="cardEntry in trade.tradeCards.filter(
              card => card.type === 'OFFERING',
            )"
            :key="cardEntry.id"
            :card="cardEntry.card"
          />
        </div>
      </q-timeline-entry>
      <q-timeline-entry
        side="right"
        icon="published_with_changes"
      >
        <h4
          class="row justify-center text-bold bg-info rounded-borders"
        >
          Quer Receber
        </h4>
        <div
          class="row q-gutter-lg"
          :class="{
            'justify-center':
              useQuasar().screen.lt.sm,
            'justify-start':
              !useQuasar().screen.lt.sm,
          }"
        >
          <FlipCard
            v-for="cardEntry in trade.tradeCards.filter(
              card => card.type === 'OFFERING',
            )"
            :key="cardEntry.id"
            :card="cardEntry.card"
          />
        </div>
      </q-timeline-entry>
    </q-timeline>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="page"
        color="info"
        :max="4"
        boundary-links
        @click="handlePageClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useQuasar } from 'quasar';
  import {
    computed,
    onBeforeMount,
    ref,
    reactive,
    watch,
    getCurrentInstance,
  } from 'vue';
  import { getTrades } from 'src/services/Trades';
  import { Trade } from '../types/Trades';
  import {
    hideLoading,
    showLoading,
    showNegativeNotify,
  } from 'src/utils/plugins';
  import FlipCard from '../components/FlipCard.vue';
  import { formatDate } from '../utils/FormatDate';

  const instance = getCurrentInstance();
  const page = ref(1);

  const trades = reactive<Trade[]>([]);

  defineOptions({
    name: 'TradeMarketPlace',
  });

  onBeforeMount(async () => {
    getTradesPerPage(page.value);
  });

  watch(page, newPage => {
    getTradesPerPage(newPage);
  });

  const layout = computed(() => {
    return useQuasar().screen.lt.sm
      ? 'dense'
      : useQuasar().screen.lt.md
      ? 'comfortable'
      : 'loose';
  });
  const getTradesPerPage = async (
    page: number,
  ) => {
    try {
      showLoading('Carregando negociações');
      const { status, data } = await getTrades(
        page,
      );

      if (status === 200) {
        trades.length = 0;
        data.list.forEach((item: Trade) =>
          trades.push(item),
        );
      }
    } catch (error) {
      showNegativeNotify(
        'Não foi possível buscar as informações de negociações',
      );
    } finally {
      hideLoading();
    }
  };

  const handlePageClick = () => {
    if (instance) {
      instance.emit('actionScroll');
    }
  };
</script>
