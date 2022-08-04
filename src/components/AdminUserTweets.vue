<template>
  <section class="admin-section">
    <header class="admin-header">
      <h4>推文清單</h4>
    </header>
    <Spinner v-if="isLoading" />
    <div v-else class="admin-tweet-container scrollbar">
      <div v-for="tweet in tweets" :key="tweet.id" class="admin-tweet">
        <div class="avatar">
          <img
            class="avatarImg"
            :src="tweet.avatarOdUser | emptyImage"
            alt=""
          />
        </div>
        <div class="tweet-info">
          <div class="tweet-user">
            <span class="tweet-user name">{{ tweet.nameOfUser }}</span>
            <span class="tweet-user account"
              >@{{ tweet.account }} ・{{ tweet.createdAt | fromNow }}</span
            >
          </div>
          <p class="tweet-content">
            {{ tweet.description }}
          </p>
        </div>
        <button
          @click.stop.prevent="deleteAdminTweet(tweet.id)"
          class="tweet-close"
          type="button"
        >
          <img
            class="icon-close"
            src="../assets/icon/admin-deletetweet.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'
import { emptyImageFilter, fromNowFilter } from '../utils/mixin'
import Spinner from '../components/Spinner1.vue'

export default {
  mixins: [emptyImageFilter, fromNowFilter],
  components: {
    Spinner
  },
  data () {
    return {
      tweets: {},
      isLoading: true
    }
  },
  created () {
    this.fetchAdmintweets()
  },
  methods: {
    async fetchAdmintweets () {
      try {
        const response = await adminAPI.getAdmintweets()
        this.tweets = [...response.data.tweets]
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'warning',
          title: '無法取得推文管理清單，請稍後再試'
        })
      }
    },
    async deleteAdminTweet (tweetId) {
      try {
        const confirm = window.confirm('確定刪除此推文嗎？')
        if (confirm === true) {
          const { data } = await adminAPI.deleteAdminTweet({
            tweetId
          })

          if (data.status !== 'success') {
            throw new Error(data.message)
          }

          this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId)

          Toast.fire({
            icon: 'success',
            title: '刪除推文成功'
          })
        } else {
          return
        }
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '無法刪除推文，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
.admin-section {
  height: 100vh;
  width: 100%;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  position: relative;
}

.admin-header {
  height: 75px;
  width: 100%;
  border-bottom: 1px solid var(--border);
  position: absolute;
  z-index: 50;
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.admin-tweet-container {
  margin-top: 75px;
  width: 100%;
  height: calc(100vh - 75px);
  overflow-y: overlay;
  overflow-x: hidden;
}

.admin-tweet {
  width: 100%;
  min-height: 100px;
  display: grid;
  grid-template-columns: 50px auto 5%;
  grid-gap: 10px;
  padding: 10px 20px;
  border-bottom: 1px solid var(--border);
}

.tweet-info {
  display: grid;
  grid-template-rows: 30px auto;
  width: 100%;
}

.tweet-user {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.tweet-user.name {
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;
}

.tweet-close {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.icon-close {
  height: 15px;
  width: 15px;
  cursor: pointer;
}
</style>
