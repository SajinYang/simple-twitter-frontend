<template>
  <div class="container">
    <NavBar />
    <section class="tweets">
      User 區塊 (個人區塊: 有編輯個人資料、看自己貼文..等 的地方)
    </section>
    <TweetPopularUser />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import TweetPopularUser from '../components/TweetPopularUser.vue'

export default {
  components: {
    NavBar,
    TweetPopularUser
  }
}
</script>
