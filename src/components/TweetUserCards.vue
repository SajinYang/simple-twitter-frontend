<template>
  <section class="admin-section">
    <header class="admin-header">
      <h4>使用者列表</h4>
    </header>
    <div class="admin-user-container scrollbar">
      <div v-for="user in users" :key="user.id" class="admin-user">
        <div class="cover">
          <img class="coverImg" :src="user.cover | emptyCover" alt="" />
        </div>
        <div class="user-avatar">
          <img class="avatarImg" :src="user.avatar | emptyImage" alt="" />
        </div>
        <div class="info-container">
          <div class="info">
            <div class="info-item name">{{ user.name }}</div>
            <div class="info-item account">@{{ user.account }}</div>
          </div>
          <div class="tweet-status">
            <div class="tweet">
              <div class="tweet-item icon">
                <img
                  class="tweet-item-img"
                  src="../assets/icon/tweet-create1.svg"
                  alt=""
                />
              </div>
              <div class="tweet-item count black">{{ user.tweetsCounts }}</div>
            </div>
            <div class="like">
              <div class="tweet-item icon">
                <img
                  class="tweet-item-img"
                  src="../assets/icon/tweet-unlike.svg"
                  alt=""
                />
              </div>
              <div class="tweet-item count black">{{ user.likedTweetsCounts }}</div>
            </div>
          </div>
          <div class="follow-status">
            <div class="follow-item following">
              <span class="black">{{ user.followingsCounts }} 個</span><span class="gray">跟隨中</span>
            </div>
            <div class="follow-item follower">
              <span class="black">{{ user.followersCounts }} 位</span><span class="gray">跟隨者</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'
import { emptyImageFilter, fromNowFilter } from '../utils/mixin'

export default {
  mixins: [emptyImageFilter, fromNowFilter],
  data () {
    return {
      users: {}
    }
  },
  created () {
    this.fetchAdminUsers()
  },
  methods: {
    async fetchAdminUsers () {
      try {
        const response = await adminAPI.getAdminUsers()
        this.users = [...response.data]
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '無法取得使用者管理清單，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
.admin-section {
  height: 100vh;
  width: 100%;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  position: relative;
}

.admin-header {
  height: 75px;
  width: 100%;
  border-bottom: 1px solid var(--border);
  position: absolute;
  z-index: 50;
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.admin-user-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 75px;
  padding: 8px 0;
  width: 100%;
  height: calc(100vh - 75px);
  overflow-y: scroll;
  overflow-x: hidden;
}

.admin-user {
  width: 235px;
  height: 314px;
  border-radius: 10px;
  background-color: #f6f7f8;
  position: relative;
  margin: 8px;
}

.cover {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.coverImg {
  border-radius: 10px 10px 0 0;
}

.user-avatar {
  position: absolute;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  top: 64px;
  left: calc(50% - 50px);
  background-color: #ffffff;
  border: 4px solid #ffffff;
}

.info-container {
  width: 100%;
  height: 174px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 0px;
}

.name {
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;
}

.account {
  margin: 3px 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #6c757d;
}

.tweet-status {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.tweet,
.like {
  display: flex;
  flex-direction: row;
  margin: 0 10px;
}

.tweet-item,
.follow-item {
  margin: 0 4px;
}

.icon {
  height: 20px;
  width: 20px;
}

.follow-status {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.black {
  color: #171725;
}

.gray {
  color: #6C757D;
}
</style>
