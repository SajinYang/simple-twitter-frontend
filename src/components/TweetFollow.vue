<template>
  <section class="follow-section">
    <div v-if="followStatus === 'follower'" class="follow-container">
      <div
        v-for="follower of followers"
        :key="follower.followerId"
        class="follow"
      >
        <div class="avatar">
          <img :src="follower.userAvatarOfFollower | emptyImage" alt="" />
        </div>
        <div class="follow-info">
          <div class="follow-user">
            <span class="follow-user name">{{
              follower.userNameOfFollower
            }}</span>
          </div>
          <p class="follow-content">
            {{ follower.userInrtoductionOfFollower }}
          </p>
        </div>
        <div class="popular-user-btn">
          <!-- <button
            v-if="!isFollowing"
            class="btn toggle-follow"
            @click.stop.prevent="addFollowing(following.id)"
          >
            跟隨
          </button>

          <button
            v-else
            class="btn toggle-follow following"
            @click.stop.prevent="deleteFollowing(tweet.id)"
          >
            正在跟隨
          </button> -->
        </div>
      </div>
    </div>
    <div v-if="followStatus === 'following'" class="follow-container">
      <div
        v-for="following of followings"
        :key="following.followingId"
        class="follow"
      >
        <div class="avatar">
          <img :src="following.userAvatarOfFollowing | emptyImage" alt="" />
        </div>
        <div class="follow-info">
          <div class="follow-user">
            <span class="follow-user name">{{
              following.userNameOfFollowing
            }}</span>
          </div>
          <p class="follow-content">
            {{ following.userInrtoductionOfFollowing }}
          </p>
        </div>
        <div class="popular-user-btn">
          <!-- <button
            v-if="!isFollowing"
            class="btn toggle-follow"
            @click.stop.prevent="addFollowing(following.id)"
          >
            跟隨
          </button>

          <button
            v-else
            class="btn toggle-follow following"
            @click.stop.prevent="deleteFollowing(tweet.id)"
          >
            正在跟隨
          </button> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
import { emptyImageFilter } from '../utils/mixin'

export default {
  props: {
    followStatus: {
      type: String,
      default: 'follower'
    }
  },
  mixins: [emptyImageFilter],
  data () {
    return {
      followers: [],
      followings: []
    }
  },
  created () {
    this.fetchfollowings()
    this.fetchfollowers()
  },
  methods: {
    async fetchfollowings (userId) {
      try {
        const response = await usersAPI.getFollowings({ userId })
        const data = response.data
        this.followings = [...data]
      } catch (error) {
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
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得追蹤者資料，請稍後再試'
        })
      }
    }
    // addFollowing (tweetId) {
    //   this.tweets = this.tweets.map((tweet) => {
    //     if (tweet.id !== tweetId) {
    //       return tweet
    //     } else {
    //       return {
    //         ...this.tweet,
    //         isFollowing: true
    //       }
    //     }
    //   })
    // },
    // deleteFollowing (tweetId) {
    //   this.tweets = this.tweets.map((tweet) => {
    //     if (tweet.id !== tweetId) {
    //       return tweet
    //     } else {
    //       return {
    //         ...this.tweet,
    //         isFollowing: false
    //       }
    //     }
    //   })
    // }
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
  width: 100%;
}

.follow-user {
  height: 100%;
}

.follow-user.name {
  display: flex;
  align-items: center;
  font-weight: 700;
}

.follow-user.account {
  margin: 0 10px;
  font-size: 14px;
  color: var(--secondary);
}
</style>
