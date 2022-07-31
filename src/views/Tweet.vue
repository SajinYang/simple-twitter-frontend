<template>
  <div class="container-twitter">
    <NavBar />
    <section class="center-section">
      <header class="header">
        <img
          @click="$router.back()"
          class="icon-back"
          src="../assets/icon/tweet-back.svg"
          alt=""
        />
        <h4 class="title">推文</h4>
      </header>
      <div class="center-container scrollbar">
        <TweetDetail :tweet="tweet" :user="user" />
        <TweetReplies :initialreplies="replies" :user="user" />
      </div>
    </section>
    <TweetPopularUser />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import TweetPopularUser from '../components/TweetPopularUser.vue'
import TweetDetail from '../components/TweetDetail.vue'
import TweetReplies from '../components/TweetReplies.vue'
import TweetsAPI from '../apis/tweets'
import { Toast } from '../utils/helpers'

export default {
  components: {
    NavBar,
    TweetPopularUser,
    TweetDetail,
    TweetReplies
  },
  data () {
    return {
      tweet: {
        id: -1,
        UserId: -1,
        description: '',
        likesCounts: -1,
        repliedCounts: -1,
        isBeingLiked: true,
        createdAt: ''
      },
      user: {
        UserId: -1,
        account: '',
        name: '',
        avatar: ''
      },
      replies: []
    }
  },
  created () {
    const { id: tweetId } = this.$route.params
    this.fetchTweet(tweetId)
    this.fetchReply(tweetId)
  },
  methods: {
    async fetchTweet (tweetId) {
      try {
        const { data } = await TweetsAPI.getTweet({ tweetId })
        const {
          id,
          UserId,
          description,
          likesCounts,
          repliedCounts,
          isBeingLiked,
          createdAt
        } = data

        const { account, name, avatar } = data.User

        this.tweet = {
          id,
          UserId,
          description,
          likesCounts,
          repliedCounts,
          isBeingLiked,
          createdAt
        }

        this.user = {
          account,
          name,
          avatar,
          UserId
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資料，請稍後再試'
        })
      }
    },
    async fetchReply (tweetId) {
      try {
        const { data } = await TweetsAPI.getReply({ tweetId })

        this.replies = [...data]
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得回覆推文資料，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
.icon-back {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 10px;
}

.title {
  margin-left: 15px;
}
</style>
