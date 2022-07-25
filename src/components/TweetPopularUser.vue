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

            <router-link class="popular-user-item" to="/tweets">
              <!-- 暫時連結 -->
              <div class="popular-user-info">
                <span class="popular-user-name">{{
                  user.name | filterName(user.name)
                }}</span>
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
const dummyUsers = {
  users: [
    {
      id: 1,
      name: 'Pizza Hut1 Pizza Hut1',
      account: 'Pizza Hut',
      isFollowing: true
    },
    {
      id: 2,
      name: 'Pizza Hut2',
      account: 'Pizza Hut',
      isFollowing: true
    },
    {
      id: 3,
      name: 'Pizza Hut3',
      account: 'Pizza Hut',
      isFollowing: false
    },
    {
      id: 4,
      name: 'Pizza Hut4',
      account: 'Pizza Hut',
      isFollowing: false
    },
    {
      id: 5,
      name: 'Pizza Hut5',
      account: 'Pizza Hut',
      isFollowing: false
    },
    {
      id: 6,
      name: 'Pizza Hut6',
      account: 'Pizza Hut',
      isFollowing: false
    },
    {
      id: 7,
      name: 'Pizza Hut7',
      account: 'Pizza Hut'
    },
    {
      id: 8,
      name: 'Pizza Hut8',
      account: 'Pizza Hut',
      isFollowing: false
    },
    {
      id: 9,
      name: 'Pizza Hut9',
      account: 'Pizza Hut',
      isFollowing: false
    },
    {
      id: 10,
      name: 'Pizza Hut10',
      account: 'Pizza Hut',
      isFollowing: false
    }
  ]
}

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
    fetchTopUsers () {
      this.users = dummyUsers.users
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
  padding: 5px;
}

.popular-users-title {
  margin: 15px 0;
  margin-left: 24px;
}

.popular-user-container {
  border-top: 1px solid #e6ecf0;
  padding: 15px 0 10px 0;
}
.popular-users {
  width: 100%;
}

.popular-user {
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 8px 5px;
}

.popular-user-item {
  margin: 5px;
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
