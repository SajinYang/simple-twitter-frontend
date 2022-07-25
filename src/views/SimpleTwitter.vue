<template>
  <div class="container">
    <NavBar />
    <section class="tweets">tweets 區塊 (首頁)</section>
    <TweetPopularUser />
  </div>
</template>

<script>
import NavBar from './../components/NavBar.vue'
import TweetPopularUser from '../components/TweetPopularUser.vue'

export default {
  components: {
    NavBar,
    TweetPopularUser
  }
}
</script>
