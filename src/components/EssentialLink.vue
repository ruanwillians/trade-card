<template>
  <q-item
    clickable
    tag="a"
    :class="{ active: isActive }"
    @click="goTo(to)"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" color="white" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-bold text-white">
        {{ title }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import {
    useRouter,
    useRoute,
  } from 'vue-router';

  defineOptions({
    name: 'EssentialLink',
  });

  export interface EssentialLinkProps {
    title: string;
    to: string;
    icon?: string;
  }

  const props = defineProps<EssentialLinkProps>();

  const router = useRouter();
  const route = useRoute();

  const goTo = (to: string) => {
    router.push(to);
  };

  const isActive = computed(
    () => route.path === props.to,
  );
</script>

<style scoped>
  .active {
    background-color: var(--q-info);
    color: white;
    border-radius: 50px;
    margin: 3px;
  }
</style>
