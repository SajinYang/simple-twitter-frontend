<template>
  <section>
    <form class="tweet-creat-from">
      <div class="avatar">
        <img src="./../assets/img/tweet-nophoto.png" alt="" />
      </div>

      <div class="twitter-text-container">
        <textarea
          class="twitter-text"
          placeholder="有什麼新鮮事？"
          maxlength="200"
          v-model="twitterText"
          required
        ></textarea>
      </div>
      <button
        class="btn btn-post-reply-tweet"
        @click.stop.prevent="createdTweet"
        :disabled="isProcessing"
      >
        推文
      </button>
    </form>
  </section>
</template>

<script>
import tweetsAPI from '../apis/tweets'
import { Toast } from '../utils/helpers'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      twitterText: '',
      isProcessing: false
    }
  },
  methods: {
    ...mapActions(['updatePage']),
    async createdTweet () {
      try {
        if (!this.twitterText.trim()) {
          Toast.fire({
            icon: 'warning',
            title: '推文內容不可空白'
          })
          return
        }

        if (this.twitterText.length > 140) {
          Toast.fire({
            icon: 'warning',
            title: '推文字數不可超過 140 字'
          })
          return
        }

        this.isProcessing = true

        const { data } = await tweetsAPI.createTweet({
          description: this.twitterText
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        Toast.fire({
          icon: 'success',
          title: '新增推文成功'
        })

        this.twitterText = ''
        this.isProcessing = false
        this.updatePage(true)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '新增推文失敗'
        })
        this.isProcessing = false
      }
    }
  }
}
</script>

<style scoped>
.tweet-creat-from {
  display: grid;
  grid-template-columns: 50px auto 10%;
  grid-gap: 10px;
  padding: 15px 20px;
  width: 100%;
  height: 160px;
  border-bottom: 10px solid var(--border);
  position: relative;
}

.twitter-text {
  padding: 10px 5px;
  height: 90%;
  width: 100%;
  border: none;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
}

.twitter-text::-webkit-scrollbar {
  display: none;
}

.btn-post-reply-tweet {
  position: absolute;
  right: 20px;
  bottom: 15px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
