<template>
  <section class="tweet-popular-section">
    <div class="tweet-popular-container">
      <div class="tweet">
        <div class="tweet-info">
          <div class="tweet-user-container">
            <router-link class="avatar" :to="{ name: 'user', params: { id: user.UserId } }">
              <img class="avatarImg" :src="user.avatar | emptyImage" alt="" />
            </router-link>
            <router-link class="tweet-user" :to="{ name: 'user', params: { id: user.UserId } }">
              <span class="tweet-user-name">{{ user.name }}</span>
              <span class="tweet-user-account"
                >@{{ user.account }}</span
              >
            </router-link>
          </div>
          <p class="tweet-content">
            {{ tweet.description }}
          </p>
          <div class="tweet-time-container">
            <div class="tweet-time">
              <span class="tweet-time-create">{{
                tweet.createdAt | date
              }}</span>
            </div>
          </div>
          <div class="tweet-data-container">
            <div class="tweet-reply">
              <strong>{{ tweet.repliedCounts }}</strong
              ><span class="tweet-icon-number">回覆</span>
            </div>
            <div class="tweet-reply">
              <strong>{{ tweet.likesCounts }}</strong
              ><span class="tweet-icon-number"> 喜歡次數</span>
            </div>
          </div>
          <div class="tweet-icon-container">
            <div class="tweet-reply">
              <ModalTweetReply1 :tweet="tweet" :user="user" class="tweet-icon-reply" />
            </div>

            <div class="tweet-like">
              <img
                v-if="!tweet.isBeingLiked"
                @click.stop.prevent="addLike(tweet.id)"
                class="tweet-icon-unlike"
                src="../assets/icon/tweet-unlike.svg"
                alt=""
              />
              <img
                v-else
                @click.stop.prevent="deleteLike(tweet.id)"
                class="tweet-icon-like"
                src="../assets/icon/tweet-like.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ModalTweetReply1 from './ModalTweetReply1.vue'
import tweetsAPI from '../apis/tweets'
import { Toast } from '../utils/helpers'
import { emptyImageFilter, fromNowFilter, dateFilter } from '../utils/mixin'

export default {
  props: {
    tweet: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  mixins: [emptyImageFilter, fromNowFilter, dateFilter],
  components: {
    ModalTweetReply1
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
    }
  }
}
</script>

<style scoped>
.tweet-popular-container {
  width: 100%;
}

.tweet {
  width: 100%;
  height: auto;
  padding: 10px 20px;
  border-bottom: 1px solid var(--border);
}

.tweet-info {
  display: grid;
}

.tweet-content {
  margin: 8px 0;
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  color: var(--dark-100);
  white-space: pre-line;
}

.tweet-time-create {
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: var(--secondary);
}

.tweet-user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}

.tweet-user-name {
  font-weight: 700;
  color: var(--dark-100);
}

.tweet-user-account {
  font-size: 14px;
  color: var(--secondary);
}

.tweet-user-name,
.tweet-user-account {
  margin-top: 5px;
}

.tweet-user-container,
.tweet-icon-container,
.tweet-data-container,
.tweet-time-container {
  display: flex;
  width: 100%;
}

.tweet-data-container {
  margin: 10px 0;
  padding: 15px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.tweet-reply,
.tweet-like,
.tweet-icon-unlike {
  display: flex;
  align-items: center;
  margin-right: 42px;
  cursor: pointer;
}

.tweet-icon-like,
.tweet-icon-unlike,
.tweet-icon-reply {
  height: 25px;
  width: 25px;
}

.tweet-icon-reply {
  margin-top: 3px;
  margin-right: 3px;
}

.tweet-icon-like,
.tweet-icon-unlike {
  margin-top: 2px;
  margin-left: 35px;
}

.tweet-icon-number {
  margin-left: 5px;
  font-weight: 700;
  font-size: 19px;
  line-height: 23px;
  color: var(--secondary);
}
</style>
