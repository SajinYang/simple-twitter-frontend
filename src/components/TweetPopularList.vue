<template>
  <section class="tweet-popular-section">
    <div class="tweet-popular-container">
      <router-link
        class="tweet"
        :to="{ name: 'tweet', params: { id: tweet.id } }"
      >
        <router-link class="avatar" :to="{ name: 'user', params: { id: tweet.id } }">
          <img :src="tweet.User.avatar | emptyImage" alt="" />
        </router-link>
        <div class="tweet-info">
          <div class="tweet-user">
            <router-link class="tweet-user name" :to="{ name: 'user', params: { id: tweet.id } }">{{ tweet.User.name }}</router-link>
            <router-link class="tweet-user account" :to="{ name: 'user', params: { id: tweet.id } }"
              >@{{ tweet.User.account }} ・ {{ tweet.createdAt | fromNow }}</router-link
            >
          </div>
          <p class="tweet-content">
            {{ tweet.description }}
          </p>
          <div class="tweet-icon-container">
            <div class="tweet-reply">
              <router-link class="cursor-default" to="">
                <ModalTweetReply
                  :initialTweet="initialTweet"
                  class="tweet-icon-reply"
                  @after-create-reply="afterCreateReply"
                />
              </router-link>
              <span class="tweet-icon-number">{{ tweet.repliedCounts }}</span>
            </div>

            <div class="tweet-like">
              <img
                v-if="tweet.isBeingLiked"
                class="tweet-icon-like"
                src="../assets/icon/tweet-like.svg"
                @click.stop.prevent="deleteLike(tweet.id)"
                alt=""
              />
              <img
                v-else
                class="tweet-icon-like"
                src="../assets/icon/tweet-unlike.svg"
                @click.stop.prevent="addLike(tweet.id)"
                alt=""
              />
              <span class="tweet-icon-number">{{ tweet.likesCounts }}</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
import ModalTweetReply from './ModalTweetReply.vue'
import tweetsAPI from '../apis/tweets'
import { Toast } from '../utils/helpers'
import { fromNowFilter, emptyImageFilter } from '../utils/mixin'

export default {
  components: {
    ModalTweetReply
  },
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tweet: this.initialTweet
    }
  },
  methods: {
    async addLike (tweetId) {
      try {
        const { data } = await tweetsAPI.addLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.tweet.isBeingLiked = true
        this.tweet.likesCounts += 1
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法按喜歡，請稍後再試'
        })
      }
    },
    async deleteLike (tweetId) {
      try {
        const { data } = await tweetsAPI.deleteLike({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.tweet.isBeingLiked = false
        this.tweet.likesCounts -= 1
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法按喜歡，請稍後再試'
        })
      }
    },
    afterCreateReply () {
      this.tweet.repliedCounts += 1
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
</style>
