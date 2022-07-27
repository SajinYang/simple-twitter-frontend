<template>
  <section class="modal-tweet-section">
    <button class="btn tweet-reply" @click.stop.prevent="openModal">
      <img src="./../assets/icon/tweet-reply.svg" alt="" />
    </button>

    <div v-show="modalStatus">
      <div class="modal-background"></div>
      <div class="modal-container">
        <div class="modal-header">
          <div class="btn modal-close" @click.stop.prevent="closeModal">
            <img src="./../assets/icon/modal-cancel.svg" alt="" />
          </div>
        </div>

        <div class="modal-content">
          <div class="avatar">
            <img src="./../assets/img/tweet-nophoto.png" alt="" />
          </div>

          <div class="twitter-reply-container">
            <span class="twitter-reply name">Apple</span>
            <span class="twitter-reply info">@apple ・3 小時</span>
            <p class="twitter-reply content">
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
              ullamco cillum dolor. Voluptate exercitation incididunt aliquip
              deserunt reprehenderit elit laborum.
            </p>
            <span class="twitter-reply account">回覆給 @Mitsubishi</span>
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
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
    },
    createdTweet () {
      if (!this.twitterText.trim()) {
        this.warningStatus = 'trim'
        return
      }

      if (this.twitterText.length > 140) {
        this.warningStatus = 'length'
      }

      // todo: 串接
    },
    resetwarningStatus () {
      this.warningStatus = ''
    }
  }
}
</script>

<style scoped>
.tweet-creat {
  padding: 8px 24px;
  width: 178px;
  height: 46px;
  background: var(--brand-color);
  border-radius: 50px;
  font-size: 20px;
  color: var(--dark-0);
}
.modal-container {
  width: 634px;
  height: 500px;
  position: absolute;
  z-index: 999;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--dark-0);
  border-radius: 14px;
}

.modal-header {
  border-bottom: 1px solid #e6ecf0;
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

.twitter-reply {
  margin: 15px 5px;
}

.avatar-reply {
  margin-top: -15px;
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
</style>