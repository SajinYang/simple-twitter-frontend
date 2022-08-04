<template>
  <div class="center-container scrollbar">
    <Spinner v-if="isLoading" />
    <template v-else>
      <ul class="tabs-group">
        <li v-for="tab in tabs" :key="tab.id" :class="['nav-tab', { 'active': tab.name === currentRoute }]">
          <router-link class="nav-link" aria-current="page" :to="tab.path" :key="tab.id">
            {{ tab.title }}
          </router-link>
        </li>
      </ul>
      <div class="center-container scrollbar">
        <section class="tweet-popular-section" v-for="liked in userLikes" :key="liked.id">
          <div class="tweet-popular-container">
            <router-link class="tweet" :to="{ name: 'tweet', params: { id: liked.id } }">
              <router-link class="avatar" :to="{ name: 'user', params: { id: liked.User.id } }">
                <img :src="liked.User.avatar | emptyImage" alt="" class="avatarImg" />
              </router-link>
              <div class="tweet-info">
                <div class="tweet-user">
                  <router-link class="tweet-user name" :to="{ name: 'user', params: { id: liked.User.id } }">
                    {{ liked.User.name }}
                  </router-link>
                  <router-link class="tweet-user account" :to="{ name: 'user', params: { id: liked.User.id } }">
                    @{{ liked.User.account }} ・ {{ liked.createdAt | fromNow }}</router-link>
                </div>
                <p class="tweet-content">
                  {{ liked.description }}
                </p>
                <div class="tweet-icon-container">
                  <div class="tweet-reply">
                    <router-link class="cursor-default" to="">
                      <ModalTweetReply :initialTweet="liked" class="tweet-icon-reply"
                        @after-create-reply="afterCreateReply(liked.id)" />
                    </router-link>
                    <span class="tweet-icon-number">{{ liked.repliedCounts }}</span>
                  </div>

                  <div class="tweet-like">
                    <img v-if="liked.isBeingLiked" class="tweet-icon-like" src="../assets/icon/tweet-like.svg"
                      @click.stop.prevent="deleteLike(liked.id)" alt="" />
                    <span class="tweet-icon-number">{{ liked.likesCounts }}</span>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </section>
      </div>
    </template>
  </div>
</template>

<script>
import { fromNowFilter, emptyImageFilter } from '../utils/mixin'
import usersAPI from '../apis/users'
import tweetsAPI from '../apis/tweets'
import { Toast } from '../utils/helpers'
import ModalTweetReply from '../components/ModalTweetReply.vue'
import Spinner from '../components/Spinner1.vue'

export default {
  mixins: [fromNowFilter, emptyImageFilter],
  components: {
    ModalTweetReply,
    Spinner
  },
  data () {
    return {
      userLikes: [],
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
    async fetchUserLiked (userId) {
      try {
        // get all tweets
        const response = await usersAPI.getLikes({ userId })
        if (response.status !== 200) {
          throw new Error(response.message)
        }
        const { data } = response
        this.userLikes = data.map(tweet => ({
          id: tweet.TweetId,
          description: tweet.description,
          createdAt: tweet.createdAt,
          likesCounts: tweet.likesCounts,
          repliedCounts: tweet.repliedCounts,
          isBeingLiked: true,
          UserId: tweet.userOflikedTweet,
          User: {
            id: tweet.userOflikedTweet,
            name: tweet.userNameOflikedTweet,
            account: tweet.userAccountOflikedTweet,
            avatar: tweet.userAvatarOflikedTweet
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
    },
    async deleteLike (tweetId) {
      try {
        const { data } = await tweetsAPI.deleteLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.userLikes.map((tweet) => {
          return tweet.id === tweetId ? {
            ...tweet,
            isBeingLiked: false,
            repliedCounts: tweet.repliedCounts - 1
          } : tweet
        })
        // remove from page
        this.userLikes = this.userLikes.filter(tweet => tweet.id !== tweetId)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法按喜歡，請稍後再試'
        })
      }
    },
    afterCreateReply (id) {
      this.userLikes.map((tweet) => {
        return tweet.id === id ? {
          ...tweet,
          repliedCounts: tweet.repliedCounts + 1
        } : tweet
      })
    }
  },
  created () {
    const { id: userId } = this.$route.params
    this.fetchUserLiked(userId)
    this.fetchTabs(userId)
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUserLiked(id)
    this.fetchTabs(id)
    next()
  }
}
</script>

<style lang="scss" scoped>
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
  min-height: 105px;
  padding: 10px 20px;
  border-bottom: 1px solid var(--border);
  color: var(--dark-100);
}

.tweet-info {
  display: grid;
}

.tweet-content {
  margin: 5px 0;
  line-height: 24px;
  color: var(--dark-100);
  font-weight: 400;
  white-space: pre-line;
}

.tweet-user.name {
  font-weight: 700;
  color: var(--dark-100);
}

.tweet-user.account {
  margin: 0 10px;
  font-size: 14px;
  color: var(--secondary);
}

.tweet-icon-container {
  display: flex;
  width: 100%;
  height: 20px;
}

.tweet-reply,
.tweet-like {
  display: flex;
  align-items: center;
  margin-right: 42px;
  cursor: pointer;
}

.tweet-icon-like {
  height: 16px;
  width: 16px;
  margin-right: 12px;
}

.tweet-icon-like:hover {
  height: 18px;
  width: 18px;
  transition: all 100ms ease-out;
}

.tweet-icon-reply {
  margin-top: 3px;
  margin-right: 3px;
}

.cursor-default {
  cursor: default;
}

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
