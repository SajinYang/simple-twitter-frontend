<template>
  <div class="container-twitter">
    <NavBar />
    <section class="center-section">
      <header class="follow-header">
        <div class="header-top">
          <img
            @click="$router.back()"
            class="icon-back"
            src="../assets/icon/tweet-back.svg"
            alt=""
          />
          <div class="title-container">
            <h5 class="title">{{ profile.name }}</h5>
            <span class="subtitle">{{ profile.tweetsCounts }} 推文</span>
          </div>
        </div>
        <div class="navtabs">
          <button
            class="button-navtabs"
            :class="{ active: followStatus === 'follower' }"
            @click.stop.prevent="toggleFollowStatus('follower')"
          >
            <span
              class="subtitle"
              :class="{ active: followStatus === 'follower' }"
              >追隨者</span
            >
          </button>
          <button
            class="button-navtabs"
            :class="{ active: followStatus === 'following' }"
            @click.stop.prevent="toggleFollowStatus('following')"
          >
            <span
              class="subtitle"
              :class="{ active: followStatus === 'following' }"
              >正在追隨</span
            >
          </button>
        </div>
      </header>
      <Spinner v-if="isLoading" />
      <div v-else class="follow-center-container scrollbar">
        <TweetFollow
          :followStatus="followStatus"
          :followers="followers"
          :followings="followings"
        />
      </div>
    </section>
    <TweetPopularUser />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import TweetPopularUser from '../components/TweetPopularUser.vue'
import TweetFollow from '../components/TweetFollow.vue'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
import Spinner from '../components/Spinner1.vue'

export default {
  components: {
    NavBar,
    TweetPopularUser,
    TweetFollow,
    Spinner
  },
  data () {
    return {
      followStatus: 'follower',
      followers: [],
      followings: [],
      profile: {
        id: -1,
        account: '',
        name: '',
        tweetsCounts: 0
      },
      isLoading: true
    }
  },
  created () {
    const { id: userId } = this.$route.params
    this.fetchfollowings(userId)
    this.fetchfollowers(userId)
    this.fetchUserProfile(userId)
  },
  beforeRouteUpdate (to, from, next) {
    const { id: userId } = to.params
    this.fetchfollowings(userId)
    this.fetchfollowers(userId)
    this.fetchUserProfile(userId)
    next()
  },
  methods: {
    toggleFollowStatus (status) {
      this.followStatus = status
    },
    async fetchfollowings (userId) {
      try {
        const response = await usersAPI.getFollowings({ userId })
        const data = response.data
        this.followings = [...data]
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得追蹤者資料，請稍後再試'
        })
      }
    },
    async fetchfollowers (userId) {
      try {
        const response = await usersAPI.getFollowers({ userId })
        const data = response.data
        this.followers = [...data]
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得追蹤者資料，請稍後再試'
        })
      }
    },
    async fetchUserProfile (userId) {
      const { data } = await usersAPI.getProfile({ userId })
      console.log(data)
      if (data.status !== 'success') {
        throw new Error(data.message)
      }
      const { id, account, name, tweetsCounts } = data
      this.profile = {
        id, account, name, tweetsCounts
      }
    }
  }
}
</script>

<style scoped>
.center-section {
  position: relative;
}
.follow-center-container {
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  width: 100%;
  height: calc(100vh - 127px);
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 127px;
  position: relative;
  z-index: 50;
}
.follow-header {
  position: absolute;
  width: 100%;
  height: 127px;
  border-bottom: 1px solid var(--border);
  z-index: 50;
  background-color: var(--dark-0);
  display: grid;
  grid-template-rows: 60% 40%;
  align-items: flex-start;
  top: 0;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
}

.header-top {
  margin-left: 15px;
}

.header-top,
.navtabs {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
  border-top: 1px solid var(--border);
}

.button-navtabs {
  height: 100%;
  width: 100%;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  width: 130px;
  border-bottom: 2px solid #fff;
}

.icon-back {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.title-container {
  margin-left: 15px;
}

.subtitle {
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: var(--secondary);
}

.button-navtabs.active {
  border-bottom: 2px solid var(--brand-color);
}

.subtitle.active {
  color: var(--brand-color);
}
</style>
