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
        <h3>登入 Alphitter</h3>
      </div>
      <div class="col-12">
        <FormLogin />
      </div>
      <div class="col-12">
        <div class="login-options">
          <router-link :to="{ name: 'sign-up' }" class="btn-link">註冊</router-link>
          <router-link to="/admin" class="btn-link option-admin">後台登入</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  margin: 0 auto;
  width: 40px;
  height: 40px;
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
  justify-content: flex-end;
}

.option-admin {
  &::before {
    content: "";
    margin-right: 0.75rem;
    width: 3px;
    height: 3px;
    border: 2px solid #000;
    border-radius: 50%;
    background-color: #000;
  }

  display: flex;
  align-items: center;
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
