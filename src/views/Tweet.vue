<template>
  <div class="container-twitter">
    <NavBar />
    <section class="center-section">
      <header class="header">
          <img @click="$router.back()" class="icon-back" src="../assets/icon/tweet-back.svg" alt="" />
          <h4 class="title">推文</h4>
        </header>
      <div class="center-container scrollbar">
        <TweetDetail />
        <TweetReplies />
      </div>
    </section>
    <TweetPopularUser />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import TweetPopularUser from '../components/TweetPopularUser.vue'
import TweetDetail from '../components/TweetDetail.vue'
import TweetReplies from '../components/TweetReplies.vue'

export default {
  components: {
    NavBar,
    TweetPopularUser,
    TweetDetail,
    TweetReplies
  }
}
</script>

<style scoped>
.icon-back {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.title {
  margin-left: 10px;
}
</style>
