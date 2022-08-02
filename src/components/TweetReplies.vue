<template>
  <section class="tweet-popular-section">
    <div class="tweet-popular-container">
      <div v-for="reply of initialreplies" :key="reply.id" class="tweet">
        <router-link class="avatar" :to="{ name: 'user', params: { id: reply.UserId } }">
          <img :src="reply.User.avatar | emptyImage" alt="" />
        </router-link>
        <div class="tweet-info">
          <div class="tweet-user">
            <router-link class="tweet-user name" :to="{ name: 'user', params: { id: reply.UserId } }">{{ reply.User.name }}</router-link>
            <router-link class="tweet-user account" :to="{ name: 'user', params: { id: reply.UserId } }"
              >@{{ reply.User.account }} ・ {{
                reply.createdAt | fromNow
              }}</router-link
            >
          </div>
          <div class="tweet-reply">
            <span class="text-reply">回覆 </span
            ><router-link class="account" :to="{ name: 'user', params: { id: reply.Tweet.User.id } }">@{{ reply.Tweet.User.account }}</router-link>
          </div>
          <p class="tweet-content">{{ reply.comment }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { fromNowFilter, emptyImageFilter } from '../utils/mixin'
import { mapState, mapActions } from 'vuex'

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
  },
  computed: {
    ...mapState({ updatePageNow: 'updatePageNow' })
  },
  methods: {
    ...mapActions(['updatePage'])
  },
  watch: {
    updatePageNow () {
      if (this.updatePageNow) {
        this.updatePage(false)
      }
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
  line-height: 24px;
  color: var(--dark-100);
  font-weight: 400;
  white-space: pre-line;
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
  color: var(--dark-100);
}

.tweet-user.account {
  margin: 0 10px;
  font-size: 14px;
  color: var(--secondary);
}

.tweet-reply {
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
