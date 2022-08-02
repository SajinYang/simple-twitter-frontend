<template>
  <form action="#" class="form-group" @submit.stop.prevent="handleSubmit">
    <div class="input-group">
      <input type="text" name="account" id="account" placeholder="請輸入帳號" maxlength="100" v-model="user.account"
        :class="{ error: user.account.length > 10 }" required>
      <label for="account">帳號</label>

      <div class="input-hints">
        <span class="error" :style="{ visibility: user.account.length > 10 ? 'visible' : 'hidden' }">
          字數超出上限！
        </span>
        <span :class="{ error: user.account.length > 10 }" v-if="user.account.length">
          {{ user.account.length }}/10
        </span>
      </div>
    </div>
    <div class="input-group">
      <input type="text" name="name" id="name" placeholder="請輸入使用者名稱" maxlength="100" v-model="user.name"
        :class="{ error: user.name.length > 50 }" required>
      <label for="name">名稱</label>

      <div class="input-hints">
        <span class="error" :style="{ visibility: user.name.length > 50 ? 'visible' : 'hidden' }">
          字數超出上限！
        </span>
        <span :class="{ error: user.name.length > 50 }" v-if="user.name.length">
          {{ user.name.length }}/50
        </span>
      </div>
    </div>
    <div class="input-group">
      <input type="email" name="email" id="email" placeholder="請輸入Email" v-model.lazy="user.email" required
        @change="checkEmailFormat">

      <label for="email">Email</label>
    </div>
    <div class="input-group">
      <input type="password" name="password" id="password" placeholder="請設定密碼" maxlength="100"
        v-model.lazy="user.password" :required="currentPage === 'signup'">
      <label for="password">密碼</label>
    </div>
    <div class="input-group">
      <input type="password" name="password" id="passwordCheck" placeholder="請再次設定密碼" maxlength="100"
        v-model.lazy="user.checkPassword" :required="currentPage === 'signup'">
      <label for="checkPassword">密碼確認</label>
    </div>

    <button type="submit" class="btn-setting" :disabled="isProcessing" v-if="currentPage === 'setting'">
      {{ isProcessing ? '處理中' : '儲存' }}
    </button>
    <button type="submit" class="btn-primary" :disabled="isProcessing" v-if="currentPage === 'signup'">
      {{ isProcessing ? '處理中' : '註冊' }}
    </button>
    <router-link class="btn-link" :to="{ name: 'sign-in' }" v-if="currentPage === 'signup'">
      取消
    </router-link>
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

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
}

.btn-link {
  color: var(--btn-link);
  text-decoration: underline;
  font-size: 1rem;
}

.btn-setting {
  align-self: end;
  padding: 8px 24px;
  border-radius: 50px;
  background-color: var(--brand-color);
  color: var(--dark-0);
  font-size: 20px;
  line-height: 30px;

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
}
</style>

<script>
import { Toast } from '../utils/helpers'

export default {
  props: {
    currentPage: {
      type: String,
      required: true
    },
    initialUser: {
      type: Object,
      default: () => {
        return {
          account: '',
          name: '',
          email: '',
          password: '',
          checkPassword: ''
        }
      }
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      user: {
        account: '',
        name: '',
        email: '',
        password: '',
        checkPassword: ''
      }
    }
  },
  methods: {
    fetchInitialUser () {
      this.user = {
        ...this.user,
        ...this.initialUser
      }
    },
    checkEmailFormat () {
      const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      console.log(pattern.test(this.user.email))
      return pattern.test(this.user.email)
    },
    handleSubmit (e) {
      // basic check
      if (
        !this.user.account ||
        !this.user.name ||
        !this.user.email
      ) {
        Toast.fire({
          icon: 'warning',
          title: '請確認已填寫所有欄位'
        })
        return false
      }
      if (this.currentPage === 'signup' &&
        (!this.user.password ||
        !this.user.checkPassword)
      ) {
        Toast.fire({
          icon: 'warning',
          title: '請確認已填寫所有欄位'
        })
        return false
      }
      if (this.password !== this.checkPassword &&
        this.currentPage === 'signup') {
        Toast.fire({
          icon: 'warning',
          title: '兩次輸入的密碼不同'
        })
        this.checkPassword = ''
        return false
      }

      // if success emit to parent
      this.$emit('after-submit', this.user)
    }
  },
  created () {
    // when editing
    this.fetchInitialUser()
  }
}
</script>
