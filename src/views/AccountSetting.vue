<template>
  <div class="container-twitter">
    <NavBar />
    <section class="center-section">
      <div class="title-container mb-4">
        <header class="header">
          <h4 class="title">帳戶設定</h4>
        </header>
      </div>
      <FormAccount
      class="px-4"
      :current-page="'setting'"
      :initial-user="initialUser"
      :is-processing="isProcessing"
      @after-submit="handleAfterSubmit" />
    </section>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import FormAccount from '../components/FormAccount.vue'
import { mapState } from 'vuex'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  components: {
    NavBar,
    FormAccount
  },
  data () {
    return {
      initialUser: {
        account: '',
        name: '',
        email: ''
      },
      isProcessing: false
    }
  },
  methods: {
    fetchUser () {
      const { account, name, email } = this.currentUser
      this.initialUser = { account, name, email }
    },
    async handleAfterSubmit (user) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.updateAccount({
          userId: this.currentUser.id,
          ...user
        })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isProcessing = false
        Toast.fire({
          icon: 'success',
          title: '編輯成功'
        })
        // page reload trigger getCurrentUser
        this.$router.go(0)
      } catch (error) {
        this.isProcessing = false

        const message = error.response.data.message
        Toast.fire({
          icon: 'warning',
          title: message
        })
      }
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    this.fetchUser()
  }
}
</script>
