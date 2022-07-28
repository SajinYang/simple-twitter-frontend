<template>
  <div class="container-twitter">
    <NavBar />
    <section class="tweets">
      User 區塊 (個人區塊: 有編輯個人資料、看自己貼文..等 的地方)

      <button class="btn-edit" @click.stop.prevent="isEditing = true">編輯個人資料</button>
      <ModalEditProfile v-show="isEditing" @save="handleModalSave" @close="handleModalClose" />
    </section>
    <TweetPopularUser />
  </div>
</template>

<style lang="scss" scoped>
.btn-edit {
  width: 128px;
  height: 40px;
  padding: 8px 16px;
  border: 1px solid var(--brand-color);
  border-radius: 50px;
  color: var(--brand-color);
}
</style>

<script>
import NavBar from '../components/NavBar.vue'
import TweetPopularUser from '../components/TweetPopularUser.vue'
import ModalEditProfile from '../components/ModalEditProfile.vue'

export default {
  data () {
    return {
      isEditing: false
    }
  },
  components: {
    NavBar,
    TweetPopularUser,
    ModalEditProfile
  },
  methods: {
    handleModalSave () {
      console.log('handleModalSave')
    },
    handleModalClose () {
      console.log('handleModalClose')
      this.isEditing = false
    }
  }
}
</script>
