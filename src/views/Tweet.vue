<template>
  <div class="container-twitter">
    <NavBar />
    <section class="tweets">tweet 區塊 (單一堆文)</section>
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
