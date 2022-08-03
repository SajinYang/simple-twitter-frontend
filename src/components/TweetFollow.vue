<template>
  <section class="follow-section">
    <div v-if="followStatus === 'follower'" class="follow-container">
      <div
        v-for="follower of followers"
        :key="follower.followerId"
        class="follow"
      >
        <router-link class="avatar" :to="{ name: 'user', params: { id: follower.followerId } }">
          <img :src="follower.userAvatarOfFollower | emptyImage" alt="" />
        </router-link>
        <div class="follow-info">
          <router-link class="follow-user" :to="{ name: 'user', params: { id: follower.followerId } }">
            <span class="follow-user name">{{
              follower.userNameOfFollower
            }}</span>
          </router-link>
          <p class="follow-content">
            {{ follower.userInrtoductionOfFollower }}
          </p>
        </div>
        <div class="popular-user-btn">
          <button
            v-if="!follower.isFollowing"
            class="btn toggle-follow"
            @click.stop.prevent="addFollowing(follower.followerId)"
          >
            跟隨
          </button>

          <button
            v-else
            class="btn toggle-follow following"
            @click.stop.prevent="deleteFollowing(follower.followerId)"
          >
            正在跟隨
          </button>
        </div>
      </div>
    </div>
    <div v-if="followStatus === 'following'" class="follow-container">
      <div
        v-for="following of followings"
        :key="following.followingId"
        class="follow"
      >
        <router-link class="avatar" :to="{ name: 'user', params: { id: following.followingId } }">
          <img :src="following.userAvatarOfFollowing | emptyImage" alt="" />
        </router-link>
        <div class="follow-info">
          <div class="follow-user">
            <router-link class="follow-user name" :to="{ name: 'user', params: { id: following.followingId } }">{{
              following.userNameOfFollowing
            }}</router-link>
          </div>
          <p class="follow-content">
            {{ following.userInrtoductionOfFollowing }}
          </p>
        </div>
        <div class="popular-user-btn">
          <button
            v-if="!following.isFollowing"
            class="btn toggle-follow"
            @click.stop.prevent="addFollowing(following.followingId)"
          >
            跟隨
          </button>

          <button
            v-else
            class="btn toggle-follow following"
            @click.stop.prevent="deleteFollowing(following.followingId)"
          >
            正在跟隨
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import followshipAPI from '../apis/followship'
import { emptyImageFilter } from '../utils/mixin'
import { mapState } from 'vuex'
import { Toast } from '../utils/helpers'

export default {
  props: {
    followStatus: {
      type: String,
      default: 'follower',
      required: true
    },
    followers: {
      type: Array,
      require: true
    },
    followings: {
      type: Array,
      require: true
    }
  },
  mixins: [emptyImageFilter],
  methods: {
    async addFollowing (id) {
      try {
        const { data } = await followshipAPI.addFollow({ id })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        if (this.followStatus === 'following') {
          this.followings = this.followings.map((following) => {
            if (following.followingId !== id) {
              return following
            } else {
              return {
                ...following,
                isFollowing: true
              }
            }
          })
        }
        if (this.followStatus === 'follower') {
          this.followers = this.followers.map((follower) => {
            if (follower.followerId !== id) {
              return follower
            } else {
              return {
                ...follower,
                isFollowing: true
              }
            }
          })
        }
        Toast.fire({
          icon: 'success',
          title: '追蹤成功'
        })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法追蹤成功，請稍後再試'
        })
      }
    },
    async deleteFollowing (id) {
      try {
        const { data } = await followshipAPI.deleteFollow({ id })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        if (this.followStatus === 'following') {
          this.followings = this.followings.map((following) => {
            if (following.followingId !== id) {
              return following
            } else {
              return {
                ...following,
                isFollowing: false
              }
            }
          })
        }
        if (this.followStatus === 'follower') {
          this.followers = this.followers.map((follower) => {
            if (follower.followerId !== id) {
              return follower
            } else {
              return {
                ...follower,
                isFollowing: false
              }
            }
          })
        }
        Toast.fire({
          icon: 'success',
          title: '已取消追蹤'
        })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法追蹤成功，請稍後再試'
        })
      }
    }
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>

<style scoped>
.follow-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.follow-container {
  width: 100%;
}

.follow {
  display: grid;
  grid-template-columns: 50px auto;
  grid-gap: 15px;
  width: 100%;
  min-height: 100px;
  padding: 10px 20px;
  border-bottom: 1px solid var(--border);
  position: relative;
}

.toggle-follow {
  position: absolute;
  top: 20px;
  right: 0;
}

.follow-content {
  line-height: 24px;
  color: var(--dark-100);
  font-weight: 400;
}

.avatar {
  border-radius: 50%;
}

.follow-info {
  display: grid;
  grid-template-rows: 50px auto;
  width: 85%;
}

.follow-user {
  height: 100%;
}

.follow-user.name {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: var(--dark-100);
}

.follow-user.account {
  margin: 0 10px;
  font-size: 14px;
  color: var(--secondary);
}
</style>
