<template>
  <div class="container-admin">
    <AdminNavBar />
    <UserTweets />
  </div>
</template>

<script>
import AdminNavBar from '../components/AdminNavBar.vue'
import UserTweets from '../components/UserTweets.vue'

export default {
  components: {
    AdminNavBar,
    UserTweets
  }
}
</script>

<style scoped>
.container-admin {
  display: grid;
  grid-template-columns: 178px auto;
  max-width: 1200px;
  justify-items: center;
  margin: 0 auto;
}
</style>
