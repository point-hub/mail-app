<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { format } from 'date-fns/format'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useGetMailsApi } from './retrieve-all.api'

const route = useRoute()
const router = useRouter()
const getMailsApi = useGetMailsApi()

interface IMail {
  _id: string
  created_date: string
  to: string
  subject: string
}

const searchAll = ref('')
const search = ref({
  created_date: '',
  to: '',
  subject: ''
})
const mails = ref<IMail[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
const isLoading = ref(false)
const rowMenuRef = ref()

const updateRouter = () => {
  router.push({
    path: '/mails',
    query: {
      search: searchAll.value,
      page: pagination.value.page,
      'search.created_date': search.value.created_date,
      'search.to': search.value.to,
      'search.subject': search.value.subject
    }
  })
}

watchDebounced(
  searchAll,
  async () => {
    // start loading
    isLoading.value = true
    // reset page 1
    pagination.value.page = 1
    // call api
    const response = await getMailsApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    mails.value = response?.data
    pagination.value = response?.pagination
    // update url query params
    updateRouter()
    // finish loading
    isLoading.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

watchDebounced(
  search.value,
  async () => {
    // start loading
    isLoading.value = true
    // reset page 1
    pagination.value.page = 1
    // call api
    const response = await getMailsApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    mails.value = response?.data
    pagination.value = response?.pagination
    // update url query params
    updateRouter()
    // finish loading
    isLoading.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

// Section Pagination
const onPageUpdate = async () => {
  // call api
  const response = await getMailsApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  mails.value = response?.data
  pagination.value = response?.pagination
  // update url query params
  updateRouter()
}

onMounted(async () => {
  // set default value
  searchAll.value = route.query.search?.toString() ?? ''
  search.value.created_date = route.query['search.created_date']?.toString() ?? ''
  search.value.to = route.query['search.to']?.toString() ?? ''
  search.value.subject = route.query['search.subject']?.toString() ?? ''
  pagination.value.page = Number(route.query.page ?? 1)
  // call api
  const response = await getMailsApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  mails.value = response?.data
  pagination.value = response?.pagination
})
</script>

<template>
  <base-card>
    <template #header>Mails</template>

    <div class="my-5 flex gap-2">
      <!-- <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" /> -->
    </div>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1"></th>
            <th class="w-50">Created Date</th>
            <th class="w-50">To</th>
            <th>Subject</th>
          </tr>
          <tr class="bg-slate-50 dark:bg-slate-700">
            <th></th>
            <th class="basic-table-head">
              <!-- <base-input
                required
                v-model="search.created_date"
                placeholder="Search"
                border="none"
              /> -->
            </th>
            <th class="basic-table-head">
              <!-- <base-input required v-model="search.to" placeholder="Search" border="none" /> -->
            </th>
            <th class="basic-table-head">
              <!-- <base-input required v-model="search.subject" placeholder="Search" border="none" /> -->
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="4">
              <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                <base-spinner color="primary" size="xs" /> <span>Loading</span>
              </p>
            </td>
          </tr>
          <template v-if="!isLoading">
            <tr v-for="(mail, index) in mails" :key="index">
              <td>
                <base-popover placement="bottom" ref="rowMenuRef">
                  <base-button size="xs" @click="rowMenuRef[index].toggle()">
                    <base-icon class="text-xl" icon="i-ph-dots-three-bold"></base-icon>
                  </base-button>
                  <template #content>
                    <base-card class="py-1! px-2! text-sm">
                      <div class="flex flex-col">
                        <router-link :to="`/inbox/${mail._id}`">
                          <base-button variant="text" color="info">
                            <div class="flex gap-2 w-full">
                              <base-icon class="text-xl" icon="i-ph-eye"></base-icon>
                              <p>View</p>
                            </div>
                          </base-button>
                        </router-link>
                        <base-divider orientation="vertical" class="my-1!"></base-divider>
                      </div>
                    </base-card>
                  </template>
                </base-popover>
              </td>
              <td>{{ format(new Date(mail.created_date), 'dd-MM-yyyy') }}</td>
              <td>{{ mail.to }}</td>
              <td>
                <router-link :to="`/inbox/${mail._id}`" class="text-blue">
                  {{ mail.subject }}
                </router-link>
              </td>
            </tr>
          </template>
        </tbody>
      </base-table>
      <base-pagination
        v-if="!isLoading"
        v-model="pagination.page"
        :page-size="pagination.page_size"
        :total-document="pagination.total_document"
        @update:model-value="onPageUpdate()"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
