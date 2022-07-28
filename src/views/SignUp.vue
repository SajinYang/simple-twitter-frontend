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
        <FormAccount @after-submit="handleAfterSubmit" />
      </div>
    </div>
  </div>
</template>

<script>
import FormAccount from '../components/FormAccount.vue'

export default {
  components: {
    FormAccount
  },
  methods: {
    handleAfterSubmit (e) {
      console.log('handleAfterSubmit')
      console.log(e.target)
      // TODO:alert success?
      if (e.target) {
        this.$router.push('/tweets')
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
