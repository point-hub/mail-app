<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useGetMailApi } from './retrieve-all.api'

const route = useRoute()
const getMailApi = useGetMailApi()

const mail = ref()

onMounted(async () => {
  // call api
  const response = await getMailApi.send(route.params.id as string)
  mail.value = response
})
</script>

<template>
  <base-card>
    <template #header>Inbox</template>

    <div class="my-5 flex gap-2">
      <iframe
        id="iframe"
        :srcdoc="mail?.html"
        frameborder="0"
        style="overflow: hidden; height: 100vh; width: 100%"
        height="100%"
        width="100%"
      ></iframe>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
