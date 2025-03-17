<script setup lang="ts">
import { useRoute } from 'vue-router'

import AppBreadcrumb, { type IBreadcrumb } from '@/components/app-breadcrumb.vue'

const route = useRoute()

const breadcrumbs: IBreadcrumb[] = [
  {
    name: 'Inbox',
    path: '/inbox'
  },
  {
    name: `${route.params.id}`
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
