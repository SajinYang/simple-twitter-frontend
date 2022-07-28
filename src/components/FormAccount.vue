<template>
  <form action="#" class="form-group" @submit.stop.prevent="handleSubmit">
    <div class="input-group">
      <input type="text" name="account" id="account" placeholder="請輸入帳號" maxlength="100" v-model="user.account"
        required>
      <label for="account">帳號</label>

      <div class="input-hints">
        <span class="error" :style="{ visibility: user.account.length > 10 ? 'visible' : 'hidden' }">字數超出上限！</span>
        <span :class="{ error: user.account.length > 10 }" v-if="user.account.length">{{ user.account.length
        }}/10</span>
      </div>
    </div>
    <div class="input-group">
      <input type="text" name="name" id="name" placeholder="請輸入使用者名稱" maxlength="100" v-model="user.name" required>
      <label for="name">名稱</label>

      <div class="input-hints">
        <span class="error" :style="{ visibility: user.name.length > 50 ? 'visible' : 'hidden' }">字數超出上限！</span>
        <span :class="{ error: user.name.length > 50 }" v-if="user.name.length">{{ user.name.length }}/50</span>
      </div>
    </div>
    <div class="input-group">
      <input type="email" name="email" id="email" placeholder="請輸入Email" v-model.lazy="user.email" required
        @change="checkEmailFormat">

      <label for="email">Email</label>
      <!-- <div class="input-hints">
        <span class="error" v-if="user.email && !checkEmailFormat()">Email須包含「@」，請檢查「{{ user.email
          }}」是否為正確email格式</span>
      </div> -->
    </div>
    <div class="input-group">
      <input type="password" name="password" id="password" placeholder="請設定密碼" maxlength="100"
        v-model.lazy="user.password" required>
      <label for="password">密碼</label>
    </div>
    <div class="input-group">
      <input type="password" name="password" id="passwordCheck" placeholder="請再次設定密碼" maxlength="100"
        v-model.lazy="user.passwordCheck" required>
      <label for="passwordCheck">密碼確認</label>
    </div>

    <button type="submit" class="btn-primary" :disabled="isProcessing">{{ isProcessing ? '處理中' : '註冊' }}</button>
    <router-link :to="{ name: 'sign-in' }" class="btn-link">取消</router-link>
  </form>
</template>

<style lang="scss" scoped>
.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

// input start
.input-group {
  position: relative;
  margin-bottom: 2rem;
  width: 100%;
}

input {
  // @extend %input-style;
  // position: relative;
  // width: 540px;
  width: 100%;
  height: 54px;
  padding: 1.5rem 1rem 0 1rem;
  background-color: #F5F8FA;
  color: var(--dark-100);
  border: none;
  border-bottom: 2px solid var(--message-primary);

  &::placeholder {
    font-size: 1rem;
    color: var(--dark-60);
  }

  &:hover,
  &:focus {
    border-bottom: 2px solid var(--info);
  }

  &:disabled {
    border-bottom: 2px solid var(--dark-50);
  }

  &.error {
    border-bottom: 2px solid var(--error);
  }
}

label {
  position: absolute;
  left: 1rem;
  color: var(--dark-80);
}

.input-hints {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;

  & .error {
    color: var(--error);
  }
}

// input end

.btn-primary {
  margin: 0.5rem auto 1rem auto;
  padding: 0.5rem 0;
  width: 100%;
  border-radius: 50px;
  background-color: var(--brand-color);
  color: var(--dark-0);
  font-size: 20px;
  line-height: 30px;
}

.btn-link {
  color: var(--btn-link);
  text-decoration: underline;
  font-size: 1rem;
}
</style>

<script>
export default {
  props: {
    initialUser: {
      type: Object,
      default: () => {
        return {
          account: '',
          name: '',
          email: '',
          password: '',
          passwordCheck: ''
        }
      }
    }
  },
  data () {
    return {
      user: {
        account: '',
        name: '',
        email: '',
        password: '',
        passwordCheck: ''
      },
      isAuthenticated: false,
      isProcessing: false
    }
  },
  methods: {
    fetchUser () {
      this.user = {
        ...this.initialUser
      }
    },
    checkEmailFormat () {
      const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      console.log(pattern.test(this.user.email))
      return pattern.test(this.user.email)
    },
    checkPassword () {
      console.log('check password')
      return this.password === this.passwordCheck
    },
    async handleSubmit (e) {
      // TODO: API
      this.isProcessing = true
      console.log('handleSubmit')
      console.log(e.target)
      console.log(this.user)
      // if success emit to parent
      this.isProcessing = false
      // this.$emit('after-submit', true)
    }
  },
  created () {
    this.fetchUser()
  }
}
</script>
