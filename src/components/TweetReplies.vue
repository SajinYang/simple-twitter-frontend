<template>
  <section class="tweet-popular-section">
    <div class="tweet-popular-container">
      <div v-for="reply of initialreplies" :key="reply.id" class="tweet">
        <div class="avatar">
          <img src="./../assets/img/tweet-nophoto.png" alt="" />
        </div>
        <div class="tweet-info">
          <div class="tweet-user">
            <span class="tweet-user name">{{ reply.Tweet.User.name }}</span>
            <span class="tweet-user account"
              >@{{ reply.User.account }} ・{{
                reply.Tweet.createdAt | fromNow
              }}</span
            >
          </div>
          <div class="tweet-reply">
            <span class="text-reply">回覆 </span
            ><span class="account">@{{ reply.Tweet.User.account }}</span>
          </div>
          <p class="tweet-content">{{ reply.comment }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { fromNowFilter, emptyImageFilter } from '../utils/mixin'

export default {
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    initialreplies: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      tweets: {}
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
  min-height: 116px;
  padding: 5px 20px;
  border-bottom: 1px solid var(--border);
}

.tweet-content {
  /* margin: 5px 0; */
  line-height: 24px;
  color: var(--dark-100);
  font-weight: 400;
}

.avatar {
  margin-top: 7px;
  border-radius: 50%;
}

.tweet-info {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
}

.tweet-user.name {
  font-weight: 700;
}

.tweet-user.account {
  margin: 0 10px;
  font-size: 14px;
  color: var(--secondary);
}

.tweet-reply {
  /* margin-top: 5px; */
  font-size: 14px;
  font-weight: 400;
}

.text-reply {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--secondary);
}

.account {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--brand-color);
}
</style>
