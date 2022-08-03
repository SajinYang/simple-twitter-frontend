<template>
  <div class="container-admin">
    <AdminNavBar />
    <AdminUserTweets />
  </div>
</template>

<script>
import AdminNavBar from '../components/AdminNavBar.vue'
import AdminUserTweets from '../components/AdminUserTweets.vue'

export default {
  components: {
    AdminNavBar,
    AdminUserTweets
  }
}
</script>

<style scoped>
.container-admin {
  display: grid;
  grid-template-columns: 20% auto;
  max-width: 1200px;
  justify-items: center;
  margin: 0 auto;
}
</style>
