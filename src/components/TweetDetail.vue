<template>
  <section class="tweet-popular-section">
    <div class="tweet-popular-container">
      <div class="tweet">
        <div class="tweet-info">
          <div class="tweet-user-container">
            <div class="avatar">
              <img src="./../assets/img/tweet-nophoto.png" alt="" />
            </div>
            <div class="tweet-user">
              <span class="tweet-user-name">Apple</span>
              <span class="tweet-user-account">@apple</span>
            </div>
          </div>
          <p class="tweet-content">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
            cillum dolor. Voluptate exercitation incididunt aliquip deserunt.
          </p>
          <div class="tweet-time-container">
            <div class="tweet-time">
              <span class="tweet-time-create">上午 10:05・2021年11月10日</span>
            </div>
          </div>
          <div class="tweet-data-container">
            <div class="tweet-reply">
              <strong>34</strong><span class="tweet-icon-number">回覆</span>
            </div>
            <div class="tweet-reply">
              <strong>808</strong
              ><span class="tweet-icon-number"> 喜歡次數</span>
            </div>
          </div>
          <div class="tweet-icon-container">
            <div class="tweet-reply">
              <ModalTweetReply1 class="tweet-icon-reply" />
            </div>

            <div class="tweet-like">
              <img
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

export default {
  components: {
    ModalTweetReply1
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
.tweet-like {
  display: flex;
  align-items: center;
  margin-right: 42px;
}

.tweet-icon-like,
.tweet-icon-reply {
  height: 25px;
  width: 25px;
}

.tweet-icon-reply {
  margin-top: 3px;
  margin-right: 3px;
}

.tweet-icon-like {
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
