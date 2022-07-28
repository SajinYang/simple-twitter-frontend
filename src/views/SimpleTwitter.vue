<template>
  <div class="container">
    <NavBar />
    <div class="center-container scrollbar">
      <TweetCreateNew />
      <TweetPopularList />
    </div>
    <TweetPopularUser />
  </div>
</template>

<script>
import NavBar from './../components/NavBar.vue'
import TweetPopularUser from '../components/TweetPopularUser.vue'
import TweetCreateNew from '../components/TweetCreateNew.vue'
import TweetPopularList from '../components/TweetPopularList.vue'

export default {
  components: {
    NavBar,
    TweetPopularUser,
    TweetCreateNew,
    TweetPopularList
  }
}
</script>
