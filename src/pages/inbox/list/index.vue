<script setup lang="ts">
import { onMounted } from 'vue'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardTable from './card-table.vue'

onMounted(() => {})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />
    <card-table />
  </div>
</template>

<style scoped lang="postcss"></style>
