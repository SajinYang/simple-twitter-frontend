<template>
  <form action="#" class="form-group" @submit.stop.prevent="handleSubmit">
    <div class="input-group">
      <input type="text" name="account"
             id="account" autocomplete="username"
             placeholder="請輸入帳號" maxlength="100"
             v-model="account" :class="{ error: account.length > 10 || apiErrMsg.length }"
             required autofocus>
      <label for="account">帳號</label>

      <div class="input-hints">
        <div>
          <span class="error" v-if="apiErrMsg.length">
            {{ apiErrMsg }}
          </span>
          <span class="error" v-if="account.length > 10 && apiErrMsg.length"> 且
          </span>
          <span class="error" :style="{ visibility: account.length > 10 ? 'visible' : 'hidden' }">
            字數超出上限！
          </span>
        </div>
        <span :class="{ error: account.length > 10 }" v-if="account.length">{{ account.length }}/10
        </span>
      </div>
    </div>
    <div class="input-group">
      <input type="password" name="password" id="password" placeholder="請設定密碼" maxlength="100" autocomplete="password"
        v-model.lazy="password" required>
      <label for="password">密碼</label>
    </div>

    <button type="submit" class="btn-primary" :disabled="!account || !password || isProcessing">
      {{ isProcessing ? '登入中...' : '登入' }}
    </button>
  </form>
</template>

<style lang="scss" scoped>
.form-group {
  flex-basis: 100%;
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
  // min-width: 576px;
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
</style>

<script>
import authorizationAPI from '../apis/authorization'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'

export default {
  props: {
    isAdminPage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      account: '',
      password: '',
      isProcessing: false,
      apiErrMsg: ''
    }
  },
  methods: {
    async handleSubmit () {
      try {
        if (!this.account || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請確認已填寫 帳號 和 密碼'
          })
          return
        }
        if (this.account.trim().length > 10) {
          Toast.fire({
            icon: 'warning',
            title: '帳號字數超過上限，請重新填寫'
          })
          return
        }
        this.isProcessing = true
        const api = this.isAdminPage ? adminAPI : authorizationAPI

        const { data } = await api.signIn({
          account: this.account,
          password: this.password
        })

        if (data.status !== 'success') {
          Toast.fire({
            icon: 'warning',
            title: data.message
          })
          throw new Error(data.message)
        }
        const { id, account, name, email, avatar, isAdmin } = this.isAdminPage ? data.data : data.user

        localStorage.setItem('token', data.token)
        this.$store.commit('setCurrentUser', { id, account, name, email, avatar, isAdmin })

        // 轉址到主頁
        this.isAdminPage ? this.$router.push('/admin/tweets') : this.$router.push('/tweets')
      } catch (error) {
        this.password = ''
        this.isProcessing = false

        const message = error.response.data.message
        this.apiErrMsg = message
      }
    }
  }
}
</script>
