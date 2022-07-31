<template>
  <section class="modal-tweet-section">
    <button class="btn tweet-reply" @click.stop.prevent="openModal">
      <img
        class="tweet-reply-icon"
        src="./../assets/icon/tweet-reply.svg"
        alt=""
      />
    </button>

    <div class="modal-tweet" v-show="modalStatus">
      <div class="modal-background" @click.stop.prevent="closeModal"></div>
      <div class="modal-container">
        <div class="modal-header">
          <div class="btn modal-close" @click.stop.prevent="closeModal">
            <img src="./../assets/icon/modal-cancel.svg" alt="" />
          </div>
        </div>

        <form class="modal-content">
          <div class="avatar">
            <img :src="user.avatar | emptyImage" alt="" />
          </div>

          <div class="twitter-reply-container">
            <span class="twitter-reply name">{{ user.name }}</span>
            <span class="twitter-reply info">@{{ user.account }}・{{ tweet.createdAt | fromNow }}</span>
            <p class="twitter-reply content">
              {{ tweet.description }}
            </p>
            <span class="twitter-reply-text">回覆給 </span>
            <span class="twitter-reply-account"> @{{ user.account }}</span>
          </div>

          <div class="avatar avatar-reply">
            <img src="./../assets/img/tweet-nophoto.png" alt="" />
          </div>

          <div class="modal-line"></div>

          <div class="twitter-reply-container">
            <textarea
              class="twitter-text"
              placeholder="推你的回覆"
              maxlength="200"
              v-model="twitterText"
              @click.stop.prevent="resetwarningStatus"
            ></textarea>
          </div>

          <span v-if="warningStatus === 'length'" class="warning-sign"
            >字數不可超過 140 字</span
          >
          <span v-if="warningStatus === 'trim'" class="warning-sign"
            >內容不可空白</span
          >

          <button
            class="btn btn-post-reply-tweet"
            @click.stop.prevent="createdTweet"
          >
            回覆
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { Toast } from '../utils/helpers'
import { emptyImageFilter, fromNowFilter } from '../utils/mixin'

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
  mixins: [emptyImageFilter, fromNowFilter],
  data () {
    return {
      twitterText: '',
      modalStatus: false,
      warningStatus: ''
    }
  },
  methods: {
    openModal () {
      this.modalStatus = true
    },
    closeModal () {
      this.modalStatus = false
      this.twitterText = ''
      this.warningStatus = ''
    },
    createdTweet () {
      if (!this.twitterText.trim()) {
        this.warningStatus = 'trim'
        return
      }

      if (this.twitterText.length > 140) {
        this.warningStatus = 'length'
        return
      }

      // todo: 串接

      Toast.fire({
        icon: 'success',
        title: '回覆推文成功'
      })

      this.closeModal()
    },
    resetwarningStatus () {
      this.warningStatus = ''
    }
  }
}
</script>

<style scoped>
.modal-tweet {
  position: fixed;
}
.tweet-reply-icon {
  width: 25px;
  height: 25px;
}
.modal-container {
  width: 634px;
  height: 500px;
  position: fixed;
  z-index: 999;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--dark-0);
  border-radius: 14px;
}

.modal-header {
  border-bottom: 1px solid var(--border);
  height: 56px;
  width: 100%;
}

.modal-content {
  display: grid;
  grid-template-columns: 50px auto;
  grid-template-rows: 48% auto;
  height: 80%;
  padding: 30px 0 0 25px;
}

.twitter-reply-container {
  margin: 0 20px;
}

.twitter-reply.content {
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: var(--dark-100);
}

.twitter-reply.name {
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;
  color: var(--dark-100);
}

.twitter-reply.info {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--secondary);
}

.twitter-reply {
  margin: 15px 5px;
}

.avatar-reply {
  margin-top: -15px;
  border-radius: 50%;
}

.twitter-text {
  height: 100%;
  width: 100%;
  border: none;
  font-size: 16px;
}

.btn-post-reply-tweet {
  position: absolute;
  right: 16px;
  bottom: 16px;
}

.warning-sign {
  position: absolute;
  right: 100px;
  bottom: 25px;
  font-size: 15px;
  color: var(--error);
  font-weight: 500;
}

.modal-line {
  position: absolute;
  width: 2px;
  height: 86px;
  background: var(--dark-60);
  left: 48px;
  top: 148px;
}

.twitter-reply-text {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--secondary);
}

.twitter-reply-account {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #ff6600;
}
</style>
