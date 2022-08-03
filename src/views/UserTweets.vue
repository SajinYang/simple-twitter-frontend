<template>
  <div>
    <div class="center-container scrollbar">
      <TweetPopularList v-for="tweet in tweets" :key="tweet.id" :initialTweet="tweet" />
    </div>
  </div>
</template>

<script>
import TweetPopularList from '../components/TweetPopularList.vue'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  components: {
    TweetPopularList
  },
  data () {
    return {
      tweets: []
    }
  },
  methods: {
    async fetchUserTweets (userId) {
      try {
        // get all tweets
        const response = await usersAPI.getTweets({ userId })
        if (response.status !== 200) {
          throw new Error(response.message)
        }
        const { data } = response
        // console.log(data)
        this.tweets = data.map(tweet => ({
          id: tweet.id,
          createdAt: tweet.createdAt,
          description: tweet.description,
          repliedCounts: tweet.repliedCounts,
          isBeingLiked: tweet.isBeingLiked,
          likesCounts: tweet.likesCounts,
          User: {
            id: tweet.UserId,
            account: tweet.userAccountOfTweeet,
            name: tweet.userNameOfTweeet,
            avatar: tweet.userAvatarOfTweeet
          }
        }))
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者所有tweets，請稍後再試'
        })
      }
    }
  },
  created () {
    const { id: userId } = this.$route.params
    this.fetchUserTweets(userId)
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUserTweets(id)
    next()
  }
}
</script>
