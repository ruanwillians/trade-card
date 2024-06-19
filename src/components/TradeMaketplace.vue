<template>
  <div class="q-px-lg q-py-md">
    <q-inner-loading
      dark
      :showing="loading"
      label-class="text-primary"
      label-style="font-size: 1.1em"
      style="height: 100vh"
    >
      <q-spinner-bars
        size="50px"
        color="primary"
      />
      <p class="text-white q-my-md">
        Carregando negociações
      </p>
    </q-inner-loading>
    <div v-if="!loading">
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
          <q-btn
            round
            v-if="
              trade.userId === store.getUserId
            "
            icon="delete"
            color="info"
            @click="
              () => confirmDeleteTrade(trade.id)
            "
          >
            <q-tooltip>
              Excluir negociação
            </q-tooltip>
          </q-btn>

          <h4
            class="row justify-center text-bold bg-secondary rounded-borders q-mt-md"
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
  </div>
</template>

<script setup lang="ts">
  import { Dialog, useQuasar } from 'quasar';
  import {
    computed,
    onBeforeMount,
    ref,
    reactive,
    watch,
    getCurrentInstance,
  } from 'vue';
  import {
    deleteTrade,
    getTrades,
  } from 'src/services/Trades';
  import { Trade } from '../types/Trades';
  import {
    showNegativeNotify,
    showPositiveNotify,
  } from 'src/utils/plugins';
  import FlipCard from '../components/FlipCard.vue';
  import { formatDate } from '../utils/FormatDate';
  import { useUserStore } from 'src/stores/userStore';

  const store = useUserStore();

  const instance = getCurrentInstance();
  const page = ref(1);
  const loading = ref<boolean>(false);

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
      loading.value = true;
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
      loading.value = false;
    }
  };

  const deleteTradeByUser = async (
    id: string,
  ) => {
    try {
      const { status } = await deleteTrade(id);

      if (status === 201) {
        showPositiveNotify(
          'Negociação excluída com sucesso',
        );
      }
    } catch (error) {
      showNegativeNotify(
        'Não foi possível exluir a negociação, tente novamente',
      );
    }
  };

  const confirmDeleteTrade = (id: string) => {
    Dialog.create({
      color: 'info',
      dark: true,
      title: 'Excluir negociação',
      message:
        'Você deseja excluir a negociação?',
      cancel: {
        label: 'Cancelar',
        flat: true,
      },
      ok: {
        label: 'Excluir negociação',
        color: 'info',
      },
      persistent: true,
      style: 'min-width: 25vw;',
    }).onOk(() => {
      deleteTradeByUser(id);
      getTradesPerPage(1);
    });
  };

  const handlePageClick = () => {
    if (instance) {
      instance.emit('actionScroll');
    }
  };
</script>
