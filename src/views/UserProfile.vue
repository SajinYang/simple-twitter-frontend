<template>
  <div class="container-twitter">
    <NavBar />
    <section class="center-section">
      <!-- header -->
      <header class="mt-3 mb-4 title">
        <img
          class="icon-back"
          src="../assets/icon/tweet-back.svg"
          alt=""
          @click="$router.back()"
        />
        <div class="user-title">
          <h5 class="">{{ profile.name }}</h5>
          <p class="text-muted">{{ profile.tweetsCounts }} 推文</p>
        </div>
      </header>

      <Spinner v-if="isLoading"/>
      <main v-else>
        <div class="profile-img">
          <!-- avatar -->
          <img
            class="avatar-img-thumbnail"
            :src="profile.avatar | emptyImage"
            alt="avatar-image"
          />
          <!-- banner -->
          <img
            class="d-block banner-img-thumbnail"
            :src="profile.cover | emptyCover"
            alt="banner-image"
          />
        </div>
        <div class="profile-detail px-4">
          <!-- button -->
          <div class="button-group my-3">
            <button
              class="btn-edit"
              v-if="currentUser.id === profile.id"
              @click.stop.prevent="isEditing = true"
            >
              編輯個人資料
            </button>
            <div class="btn-follow" v-else>
              <button class="btn-direct-message me-3 p-2">
                <img
                  src="../assets/icon/direct-message.svg"
                  alt="direct-message"
                />
              </button>
              <button class="btn-notification me-3">
                <img src="../assets/icon/add-notify.svg" alt="get-notify" />
              </button>
              <button
                class="btn toggle-follow"
                v-if="!profile.isFollowing"
                @click.stop.prevent="addFollowing(profile.id)"
              >
                跟隨
              </button>
              <button
                class="btn toggle-follow following"
                v-else
                @click.stop.prevent="deleteFollowing(profile.id)"
              >
                正在跟隨
              </button>
            </div>
          </div>
          <!-- user info -->
          <h5>{{ profile.name }}</h5>
          <span class="text-muted mb-1">@{{ profile.account }}</span>
          <p>{{ profile.introduction }}</p>
          <div class="follow-status">
            <span class="following-text"
              >{{ profile.followingsCounts }}個
              <router-link
                :to="{ name: 'user-following', params: { id: profile.id } }"
              >
                <span class="text-light">跟隨中</span>
              </router-link>
            </span>
            <span class="follower"
              >{{ profile.followersCounts }}位
              <router-link
                :to="{ name: 'user-follower', params: { id: profile.id } }"
              >
                <span class="text-light">跟隨者</span>
              </router-link>
            </span>
          </div>
        </div>
        <!-- nested routes -->
        <router-view />
      </main>
      <ModalEditProfile
        v-show="isEditing"
        :initial-profile="profile"
        @close="handleModalClose"
      />
    </section>
    <TweetPopularUser />
  </div>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
}

.icon-back {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin: 0 19px 0 28px;
}

.btn-edit {
  width: 128px;
  height: 40px;
  padding: 8px 16px;
  border: 1px solid var(--brand-color);
  border-radius: 50px;
  color: var(--brand-color);

  &:hover {
    color: var(--dark-0);
    background-color: var(--brand-color);
  }
}

.btn-follow {
  display: flex;
  align-content: center;
}

.btn-direct-message,
.btn-notification {
  width: 40px;
  height: 40px;
  border: 1px solid var(--brand-color);
  border-radius: 50%;
}

.text-muted {
  font-size: 14px;
  color: var(--secondary);
}

.text-light {
  font-size: 16px;
  color: var(--secondary);
}

.profile-img {
  position: relative;
}

.avatar-img-thumbnail {
  position: absolute;
  left: 1rem;
  bottom: -70px;
  width: 140px;
  height: 140px;
  border: 4px solid #fff;
  border-radius: 50%;
  object-fit: cover;
}

.banner-img-thumbnail {
  max-height: 200px;
  object-fit: cover;
  object-position: center center;
}

.profile-detail {
  display: flex;
  flex-direction: column;
}

.button-group {
  align-self: end;
  display: flex;
}

.follow-status {
  margin: 0.5rem 0 30px 0;
}

.following-text {
  margin-right: 1.25rem;
}

@media (max-width: 992px) {
  .avatar-img-thumbnail {
    left: 1.5rem;
    width: 80px;
    height: 80px;
    bottom: -40px;
  }

  .btn-direct-message,
  .btn-notification {
    width: 2rem;
    height: 2px;
  }
}
</style>

<script>
import NavBar from '../components/NavBar.vue'
import TweetPopularUser from '../components/TweetPopularUser.vue'
import ModalEditProfile from '../components/ModalEditProfile.vue'
import usersAPI from '../apis/users'
import followshipAPI from '../apis/followship'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'
import { emptyImageFilter } from '../utils/mixin'
import Spinner from '../components/Spinner1.vue'

export default {
  name: 'UserProfile',
  mixins: [emptyImageFilter],
  data () {
    return {
      profile: {
        id: -1,
        account: '',
        name: '',
        email: '',
        introduction: '',
        avatar: null,
        cover: null,
        tweetsCounts: 0,
        followingsCounts: 0,
        followersCounts: 0,
        isFollowing: false
      },
      isEditing: false,
      tabs: [],
      isLoading: true
    }
  },
  components: {
    NavBar,
    TweetPopularUser,
    ModalEditProfile,
    Spinner
  },
  methods: {
    async fetchUserProfile (userId) {
      try {
        // get profile
        const { data } = await usersAPI.getProfile({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.profile = data
        delete this.profile.status
        delete this.profile.message

        // if introduction is null
        this.profile = {
          ...this.profile,
          introduction: this.profile.introduction
            ? this.profile.introduction
            : ''
        }
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    },
    async addFollowing (userId) {
      try {
        const { data } = await followshipAPI.addFollow({ id: userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.profile.isFollowing = true
        this.profile.followersCounts += 1
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '追蹤失敗，請稍後再試'
        })
      }
    },
    async deleteFollowing (userId) {
      try {
        const { data } = await followshipAPI.deleteFollow({ id: userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.profile.isFollowing = false
        this.profile.followersCounts -= 1
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤，請稍後再試'
        })
      }
    },
    handleModalClose () {
      this.isEditing = false
    }
  },
  created () {
    const { id: userId } = this.$route.params
    this.fetchUserProfile(userId)
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUserProfile(id)
    next()
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>
