<template>
  <section class="popular-users-section">
    <div class="popular-users-container">
      <h4 class="popular-users-title">推薦跟隨</h4>
      <div class="popular-user-container">
        <ul v-for="user in users" :key="user.id" class="popular-users">
          <li class="popular-user">
            <router-link class="popular-user-item" :to="{ name: 'user', params: { id: user.id } }">
              <div class="avatar">
                <img class="avatarImg" :src="user.avatar | emptyImage" alt="" />
              </div>
            </router-link>

            <router-link class="popular-user-item name" :to="{ name: 'user', params: { id: user.id } }">
              <div class="popular-user-info">
                <p class="popular-user-name">
                  {{ user.name | filterName(user.name) }}
                </p>
                <span class="popular-user-account">@{{ user.account }}</span>
              </div>
            </router-link>

            <div v-if="currentUser.id !== user.id" class="popular-user-btn">
              <button v-if="!user.isFollowing" class="btn toggle-follow" @click.stop.prevent="addFollowing(user.id)">
                跟隨
              </button>

              <button v-else class="btn toggle-follow following" @click.stop.prevent="deleteFollowing(user.id)">
                正在跟隨
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import usersAPI from '../apis/users'
import followshipAPI from '../apis/followship'
import { Toast } from './../utils/helpers'
import { emptyImageFilter } from './../utils/mixin'
import { mapState } from 'vuex'

export default {
  mixins: [emptyImageFilter],
  computed: {
    ...mapState(['currentUser'])
  },
  data () {
    return {
      users: []
    }
  },
  created () {
    this.fetchTopUsers()
  },
  methods: {
    async fetchTopUsers () {
      try {
        const response = await usersAPI.getTopUsers()
        const data = response.data.top10Users
        this.users = [...data]
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法更新前Top10 user，請稍後再試'
        })
      }
    },
    async addFollowing (userId) {
      try {
        const { data } = await followshipAPI.addFollow({ id: userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.users = this.users.map((user) => {
          if (user.id !== userId) {
            return user
          } else {
            return {
              ...user,
              isFollowing: true
            }
          }
        })
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
    async deleteFollowing (userId) {
      try {
        const { data } = await followshipAPI.deleteFollow({ id: userId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.users = this.users.map((user) => {
          if (user.id !== userId) {
            return user
          } else {
            return {
              ...user,
              isFollowing: false
            }
          }
        })
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
  filters: {
    filterName (userName) {
      if (userName.length > 10) {
        const cutName = userName.slice(0, 7) + '...'
        return cutName
      }
      return userName
    }
  }
}
</script>

<style scoped>
.popular-users-section {
  height: 100vh;
}

.popular-users-container {
  display: flex;
  flex-direction: column;
  width: 273px;
  background: var(--dark-20);
  border-radius: 16px;
  margin-top: 10px;
  padding: 5px;
}

.popular-users-title {
  margin: 15px 0;
  margin-left: 24px;
}

.popular-user-container {
  width: 97%;
  border-top: 1px solid var(--border);
  margin: 0 auto;
  padding: 15px 0 10px 0;
}

.popular-users {
  width: 100%;
}

.popular-user {
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  margin: 8px 5px;
}

.popular-user-item {
  width: 100%;
  margin: 5px;
}

.popular-user-item:nth-of-type(1) {
  width: 50px;
}

.popular-user-name {
  max-width: 93px;
  font-weight: 700;
  color: var(--dark-100);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.popular-user-account {
  margin-top: 5px;
  font-weight: 500;
  font-size: 14px;
  color: var(--dark-70);
}

.popular-user-btn {
  width: 96px;
  display: flex;
  justify-content: flex-end;
}

.popular-user-info {
  display: flex;
  flex-direction: column;
}

@media (max-width: 576px) {
  .popular-users-section {
    display: none;
  }
}
</style>
