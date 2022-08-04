<template>
  <div class="container-admin-users">
    <AdminNavBar />
    <TweetUserCards />
  </div>
</template>

<script>
import AdminNavBar from '../components/AdminNavBar.vue'
import TweetUserCards from '../components/TweetUserCards.vue'

export default {
  components: {
    AdminNavBar,
    TweetUserCards
  }
}
</script>

<style scoped>

.container-admin-users {
  display: grid;
  grid-template-columns: 15% auto;
  max-width: 1200px;
  justify-items: center;
  margin: 0 auto;
}
</style>
