<template>
  <v-select :options="users"
            placeholder="Введите e-mail"
            v-model="selectedUsers"
            multiple
            @open="onOpen"
            @close="onClose"
            :filterable="false"
            @search="onSearch"
            taggable
  >
    <template #no-options>
      <span/>
    </template>
    <template #option="{ label, email }">
      {{ label }}  <br>
      <small v-if="email">{{ email }}</small>
    </template>
    <template #list-footer>
      <li v-show="hasNextPage" ref="load" class="p-4" v-text="loadingText"/>
      <li v-show="isEmpty" class="p-4">
        Пусто
      </li>
    </template>
  </v-select>
</template>

<script>
import {debounce} from "lodash";
import vSelect from '../src/components/Select'
import axios from 'axios'

export default {
  components: { vSelect },
  data: () => ({
    users: [],
    params: {
      search: '',
      page: 0
    },
    observer: null,
    loading: false,
    current_page: 1,
    last_page: 2,
    selectedUsers: [],
    searching: false
  }),
  computed: {
    hasNextPage() {
      return this.current_page < this.last_page
    },
    loadingText() {
      return this.loading ? 'Загружаю' : ''
    },
    isEmpty() {
      return !this.users.length && !this.searching && !this.loading
    },
  },
  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll)
  },
  methods: {
    async onOpen() {
      this.params.page = 0
      this.current_page = 1
      this.last_page = 2
      this.users = []
      if (this.hasNextPage) {
        await this.$nextTick()
        this.observer.observe(this.$refs.load)
      }
    },
    onSearch: debounce(async function(query) {
      this.searching = true
      this.params.page = 0
      this.users = []
      this.params.search = query
      await this.getUsers()
      this.searching = false

    }, 2000),
    onClose() {
      this.observer.disconnect()
    },
    async infiniteScroll([{ isIntersecting, target }]) {
      console.log(111)
      if (isIntersecting && !this.searching) {
        const ul = target.offsetParent
        const scrollTop = target.offsetParent.scrollTop
        this.params.page += 1
        await this.getUsers()
        this.$nextTick(() => {
          ul.scrollTop = scrollTop
        })
      }
    },
    async getUsers() {
      try {
        this.loading = true
        const params = {
          ...(this.params.page && {page: this.params.page}),
          ...((this.params.search && this.params.search.length >= 3) && {search: this.params.search})
        }
        const { data: { data, last_page, current_page } } = await
          axios.get('/gateway/api/v1/users', { params })

        const newUsers = data.map(user => ({
          ...user,
          value: user.id,
          label: user.full_name || user.email || user.phone,
        }))
        this.current_page = current_page || 1
        this.last_page = last_page || 2

        this.users = Array.from(new Set([...this.users, ...newUsers]
          .map(JSON.stringify))).map(JSON.parse)
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
  }
}
</script>
