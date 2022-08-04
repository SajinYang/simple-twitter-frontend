<template>
  <!-- <div> -->
  <div>
    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- NavTabs -->
      <ul class="tabs-group">
        <li v-for="tab in tabs" :key="tab.id" :class="['nav-tab', { 'active': tab.name === currentRoute }]">
          <router-link class="nav-link" aria-current="page" :to="tab.path" :key="tab.id">
            {{ tab.title }}
          </router-link>
        </li>
      </ul>
      <TweetPopularList v-for="tweet in tweets" :key="tweet.id" :initialTweet="tweet" />
    </template>
  </div>
  <!-- </div> -->
</template>

<script>
import TweetPopularList from '../components/TweetPopularList.vue'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
import Spinner from '../components/Spinner1.vue'

export default {
  components: {
    TweetPopularList,
    Spinner
  },
  data () {
    return {
      tweets: [],
      tabs: [],
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
    async fetchUserTweets (userId) {
      try {
        // get all tweets
        const response = await usersAPI.getTweets({ userId })
        if (response.status !== 200) {
          throw new Error(response.message)
        }
        const { data } = response
        this.tweets = data.map(tweet => ({
          id: tweet.id,
          createdAt: tweet.createdAt,
          description: tweet.description,
          repliedCounts: tweet.repliedCounts,
          isBeingLiked: tweet.isBeingLiked,
          likesCounts: tweet.likesCounts,
          UserId: tweet.UserId,
          User: {
            id: tweet.UserId,
            account: tweet.userAccountOfTweeet,
            name: tweet.userNameOfTweeet,
            avatar: tweet.userAvatarOfTweeet
          }
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
    this.fetchUserTweets(userId)
    this.fetchTabs(userId)
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUserTweets(id)
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
