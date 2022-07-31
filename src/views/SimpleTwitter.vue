<template>
  <div class="container-twitter">
    <NavBar />
    <section class="center-section">
      <div class="title-container">
        <header class="header">
          <h4 class="title">首頁</h4>
        </header>
      </div>
      <div class="center-container scrollbar">
        <TweetCreateNew />
        <TweetPopularList class="card-hover"
          v-for="tweet in tweets"
          :key="tweet.id"
          :initialTweet="tweet"
          @after-create-tweet="afterCreateTweet"
        />
      </div>
    </section>
    <TweetPopularUser />
  </div>
</template>

<script>
import NavBar from './../components/NavBar.vue'
import TweetPopularUser from '../components/TweetPopularUser.vue'
import TweetCreateNew from '../components/TweetCreateNew.vue'
import TweetPopularList from '../components/TweetPopularList.vue'
import tweetsAPI from '../apis/tweets'
import { Toast } from '../utils/helpers'

export default {
  components: {
    NavBar,
    TweetPopularUser,
    TweetCreateNew,
    TweetPopularList
  },
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
    },
    afterCreateTweet () {
      this.fetchTweets()
    }
  }
}
</script>
