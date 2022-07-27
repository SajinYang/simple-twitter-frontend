<template>
  <section class="modal-tweet-section">
    <button class="btn tweet-creat" @click.stop.prevent="openModal">
      推文
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

          <div class="twitter-text-container">
            <textarea
              class="twitter-text"
              placeholder="有什麼新鮮事？"
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
            推文
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
  height: 300px;
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
  grid-template-columns: 50px auto 10%;
  height: 80%;
  padding: 30px 0 0 25px;
}

.twitter-text-container {
  margin: 0 20px;
}

.avatar {
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
</style>