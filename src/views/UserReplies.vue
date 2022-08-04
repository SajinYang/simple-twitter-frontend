<template>
  <div class="center-container scrollbar">
    <Spinner v-if="isLoading"/>
    <TweetReplies v-else :initialreplies="replies" />
  </div>
</template>

<script>
import TweetReplies from '../components/TweetReplies.vue'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
import Spinner from '../components/Spinner1.vue'

export default {
  components: {
    TweetReplies,
    Spinner
  },
  data () {
    return {
      replies: [],
      isLoading: true
    }
  },
  methods: {
    async fetchUserReplies (userId) {
      try {
        // get all tweets
        const response = await usersAPI.getRepliedTweets({ userId })
        if (response.status !== 200) {
          throw new Error(response.message)
        }
        const { data } = response
        // console.log(data)
        this.replies = data.map(reply => ({
          id: reply.replyId,
          UserId: reply.userOfReply,
          User: {
            id: reply.userOfReply,
            account: reply.userAccountOfReply,
            name: reply.userNameOfReply,
            avatar: reply.userAvatarOfReply
          },
          Tweet: {
            User: {
              id: reply.userOfRepliedTweet,
              account: reply.userAccountOfRepliedTweet
            }
          },
          createdAt: reply.repliedTweetCreatedAt,
          comment: reply.comment
        }))
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者所有tweets，請稍後再試'
        })
      }
    }
  },
  created () {
    const { id: userId } = this.$route.params
    this.fetchUserReplies(userId)
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUserReplies(id)
    next()
  }
}
</script>
