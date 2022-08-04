<template>
  <div>
    <Spinner v-if="isLoading" />
    <!-- NavTabs -->
    <template v-else>
      <nav>
        <ul class="tabs-group">
          <li v-for="tab in tabs" :key="tab.id" :class="['nav-tab', { 'active': tab.name === currentRoute }]">
            <router-link class="nav-link" aria-current="page" :to="tab.path" :key="tab.id">
              {{ tab.title }}
            </router-link>
          </li>
        </ul>
      </nav>
      <TweetReplies :initialreplies="replies" />
      <h5 class="m-6" v-if="replies.length < 1">
        You don’t have any replies yet.
        <p class="text-muted">Start replying to other tweets!. When you do, it’ll show up here.</p>
      </h5>
    </template>
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
      isLoading: true,
      currentRoute: this.$router.currentRoute.name
    }
  },
  methods: {
    fetchTabs (userId) {
      this.tabs = [
        {
          id: 1,
          title: '推文',
          path: `/users/${userId}/tweets`,
          name: 'user'
        },
        {
          id: 2,
          title: '回覆',
          path: `/users/${userId}/replies`,
          name: 'user-replies'
        },
        {
          id: 3,
          title: '喜歡的內容',
          path: `/users/${userId}/likes`,
          name: 'user-likes'
        }
      ]
    },
    async fetchUserReplies (userId) {
      try {
        // get all tweets
        const response = await usersAPI.getRepliedTweets({ userId })
        if (response.status !== 200) {
          throw new Error(response.message)
        }
        const { data } = response
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
    this.fetchTabs(userId)
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUserReplies(id)
    this.fetchTabs(id)
    next()
  }
}
</script>

<style lang="scss" scoped>
.tabs-group {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border);
}

.nav-tab {
  &.active {
    border-bottom: 2px solid var(--brand-color);
  }
}

.nav-link {
  display: block;
  padding: 15px 30px;
  color: var(--secondary);
  cursor: pointer;

  &.active {
    color: var(--brand-color);
  }

  &:hover {
    color: var(--brand-color);
  }
}
</style>
