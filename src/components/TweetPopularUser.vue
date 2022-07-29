<template>
  <section class="popular-users-section">
    <div class="popular-users-container">
      <h4 class="popular-users-title">推薦跟隨</h4>
      <div class="popular-user-container">
        <ul v-for="user in users" :key="user.id" class="popular-users">
          <li class="popular-user">
            <router-link class="popular-user-item" to="/tweets">
              <!-- 暫時連結 -->
              <div class="avatar">
                <img src="./../assets/img/tweet-nophoto.png" alt="" />
              </div>
            </router-link>

            <router-link class="popular-user-item name" to="/tweets">
              <!-- 暫時連結 -->
              <div class="popular-user-info">
                <p class="popular-user-name">
                  {{ user.name | filterName(user.name) }}
                </p>
                <span class="popular-user-account">@{{ user.account }}</span>
              </div>
            </router-link>

            <div class="popular-user-btn">
              <button
                v-if="!user.isFollowing"
                class="btn toggle-follow"
                @click.stop.prevent="addFollowing(user.id)"
              >
                跟隨
              </button>

              <button
                v-else
                class="btn toggle-follow following"
                @click.stop.prevent="deleteFollowing(user.id)"
              >
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
import { Toast } from './../utils/helpers'

export default {
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
    addFollowing (userId) {
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
    },
    deleteFollowing (userId) {
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
  font-weight: 700;
  color: var(--dark-100);
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
</style>
