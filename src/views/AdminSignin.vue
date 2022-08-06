<template>
  <div class="container-lg pt-6 pb-4 px-4">
    <div class="row">
      <div class="col-12">
        <div class="logo">
          <router-link to="/tweets">
            <img src="./../assets/icon/navbar-logo.svg" alt="" />
          </router-link>
        </div>
      </div>
      <div class="col-12">
        <h3>後台登入</h3>
      </div>
      <div class="col-12">
        <FormLogin :is-admin-page="true" />
      </div>
      <div class="col-12">
        <router-link to="/signin" class="btn-link f-right">前台登入</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.f-right {
  float: right;
}

.logo {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}

h3 {
  margin: 1.8rem 0 2.5rem 0;
  text-align: center;
}

.btn-link {
  margin-right: 0.75rem;
  color: var(--btn-link);
  text-decoration: underline;
  font-size: 1rem;
}

.login-options {
  display: flex;
  align-items: flex-end;
}
</style>

<script>
import FormLogin from '../components/FormLogin.vue'

export default {
  components: {
    FormLogin
  }
}
</script>
