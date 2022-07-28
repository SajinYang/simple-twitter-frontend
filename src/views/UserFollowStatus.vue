<template>
  <div class="container-twitter">
    <NavBar />
    <section class="tweets">
      UserFollowStatus 區塊 (可看到追蹤者、跟蹤者list)
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
