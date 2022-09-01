<template>
  <v-select :options="computedUsers"
            placeholder="Введите e-mail"
            v-model="selectedUsers"
            @open="onOpen"
            @search="onSearch"
            :filterable="true"
  >
    <template #no-options>
      <span/>
    </template>
    <template #option="{ label, email }">
      {{ label }}  <br>
      <small v-if="email">{{ email }}</small>
    </template>
    <template #list-footer>
      <li v-show="isEmpty" class="p-4">
        Пусто
      </li>
    </template>
  </v-select>
</template>

<script>
import vSelect from '../src/components/Select'
import axios from 'axios'

export default {
  components: { vSelect },
  data: () => ({
    users: [],
    loading: false,
    selectedUsers: [],
    search: ''
  }),
  computed: {
    loadingText() {
      return this.loading ? 'Загружаю' : ''
    },
    isEmpty() {
      return !this.computedUsers.length && !this.loading
    },
    computedUsers () {
      return this.search ?
        this.users.filter(user => user.label.toLowerCase().includes(this.search)) :
        this.users
    }
  },

  methods: {
    onSearch (search) {
      this.search = search
    },
    async onOpen() {
      this.users = []
      await this.getUsers()
    },
    async getUsers() {
      try {
        this.loading = true
        const params = {
          noPagination: 1

        }
        const { data: { data } } = await
          axios.get('/gateway/api/v1/users', {params} )

        const newUsers = data.map(user => ({
          ...user,
          value: user.id,
          label: user.full_name || user.email || user.phone,
        }))

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
