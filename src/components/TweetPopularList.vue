<template>
  <section class="tweet-popular-section">
    <div class="tweet-popular-container">
      <div class="tweet">
        <div class="avatar">
          <img src="./../assets/img/tweet-nophoto.png" alt="" />
        </div>
        <div class="tweet-info">
          <div class="tweet-user">
            <span class="tweet-user name">{{ tweet.User.name }}</span>
            <span class="tweet-user account"
              >@{{ tweet.User.account }} ・{{ tweet.createdAt | fromNow }}</span
            >
          </div>
          <p class="tweet-content">
            {{ tweet.description }}
          </p>
          <div class="tweet-icon-container">
            <div class="tweet-reply">
              <ModalTweetReply class="tweet-icon-reply" />
              <span class="tweet-icon-number">{{ tweet.repliedCounts }}</span>
            </div>

            <div class="tweet-like">
              <img
                v-if="tweet.isBeingLiked"
                class="tweet-icon-like"
                src="../assets/icon/tweet-like.svg"
                alt=""
              />
              <img
                v-else
                class="tweet-icon-like"
                src="../assets/icon/tweet-unlike.svg"
                alt=""
              />
              <span class="tweet-icon-number">{{ tweet.likesCounts }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ModalTweetReply from './ModalTweetReply.vue'
// import tweetsAPI from '../apis/tweets'
// import { Toast } from '../utils/helpers'
import { fromNowFilter, emptyImageFilter } from '../utils/mixin'

export default {
  components: {
    ModalTweetReply
  },
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    initinalTweet: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tweet: this.initinalTweet
    }
  },
  methods: {
    //  @click.stop.prevent="addLike(tweet.id)"
    // async addLike (tweetId) {
    //   try {
    //     console.log('click')
    //     const { data } = await tweetsAPI.addLike(tweetId)
    //     if (data.status !== 'success') {
    //       throw new Error(data.message)
    //     }
    //     this.tweet.isBeingLiked = true
    //     this.tweet.likesCounts += 1
    //   } catch (error) {
    //     Toast.fire({
    //       icon: 'error',
    //       title: '無法按喜歡，請稍後再試'
    //     })
    //   }
    // }
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
  min-height: 116px;
  padding: 10px 20px;
  border-bottom: 1px solid var(--border);
}

.tweet-info {
  display: grid;
}

.tweet-content {
  margin: 5px 0;
  line-height: 24px;
  color: var(--dark-100);
  font-weight: 400;
}

.tweet-user.name {
  font-weight: 700;
}

.tweet-user.account {
  margin: 0 10px;
  font-size: 14px;
  color: var(--secondary);
}

.tweet-icon-container {
  display: flex;
  width: 100%;
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

.tweet-icon-reply {
  margin-top: 3px;
  margin-right: 3px;
}
</style>
