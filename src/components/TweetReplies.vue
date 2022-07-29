<template>
  <section class="tweet-popular-section">
    <div class="tweet-popular-container">
      <div v-for="tweet of tweets" :key="tweet.id" class="tweet">
        <div class="avatar">
          <img src="./../assets/img/tweet-nophoto.png" alt="" />
        </div>
        <div class="tweet-info">
          <div class="tweet-user">
            <span class="tweet-user name">Apple</span>
            <span class="tweet-user account"
              >@apple ・{{ tweet.createdAt | fromNow }}</span
            >
          </div>
          <div class="tweet-reply">
            <span class="text-reply">回覆 </span
            ><span class="account">@apple</span>
          </div>
          <p class="tweet-content">
            {{ tweet.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import tweetsAPI from '../apis/tweets'
import { Toast } from '../utils/helpers'
import { fromNowFilter, emptyImageFilter } from '../utils/mixin'

export default {
  mixins: [fromNowFilter, emptyImageFilter],
  data () {
    return {
      tweets: {}
    }
  },
  created () {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets () {
      try {
        const response = await tweetsAPI.getTweets()
        const data = response.data
        this.tweets = {
          ...data
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資料，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
.tweet-popular-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.tweet-popular-container {
  width: 100%;
}

.tweet {
  display: grid;
  grid-template-columns: 50px auto;
  grid-gap: 15px;
  width: 100%;
  min-height: 116px;
  padding: 5px 20px;
  border-bottom: 1px solid var(--border);
}

.tweet-content {
  /* margin: 5px 0; */
  line-height: 24px;
  color: var(--dark-100);
  font-weight: 400;
}

.avatar {
  margin-top: 7px;
   border-radius: 50%;
}

.tweet-info {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
}

.tweet-user.name {
  font-weight: 700;
}

.tweet-user.account {
  margin: 0 10px;
  font-size: 14px;
  color: var(--secondary);
}

.tweet-reply {
  /* margin-top: 5px; */
  font-size: 14px;
  font-weight: 400;
}

.text-reply {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--secondary);
}

.account {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--brand-color);
}
</style>
