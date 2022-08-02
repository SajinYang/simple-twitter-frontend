<template>
  <div class="container-lg pt-6 px-4">
    <div class="row">
      <div class="col-12">
        <div class="logo">
          <router-link to="/tweets">
            <img src="./../assets/icon/navbar-logo.svg" alt="" />
          </router-link>
        </div>
      </div>
      <div class="col-12">
        <h3>建立你的帳號</h3>
      </div>
      <div class="col-12">
        <FormAccount
        :current-page="'signup'"
        :is-processing="isProcessing"
        @after-submit="handleAfterSubmit" />
      </div>
    </div>
  </div>
</template>

<script>
// 註冊成功後，轉址登入頁
import FormAccount from '../components/FormAccount.vue'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  components: {
    FormAccount
  },
  data () {
    return {
      isProcessing: false
    }
  },
  methods: {
    async handleAfterSubmit (user) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.signUp({
          ...user
        })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: '註冊成功，請登入'
        })
        // 轉址
        this.$router.push({ name: 'sign-in' })
      } catch (error) {
        this.isProcessing = false
        console.log(error)
        Toast.fire({
          icon: 'warning',
          title: '註冊失敗，請稍後再試'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}

h3 {
  margin: 1.8rem 0 2.5rem 0;
  text-align: center;
}
</style>
