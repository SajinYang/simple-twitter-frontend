<template>
  <section class="navbar">
    <!-- 上半部 -->
    <div class="top">
      <!-- logo -->
      <div class="logo">
        <router-link to="/tweets">
          <img src="./../assets/icon/navbar-logo.svg" alt="" />
        </router-link>
      </div>

      <!-- nav -->
      <nav class="navigation">
        <div class="nav-item-container">
          <router-link class="nav-item index" to="/tweets">
            <div class="icon">
              <IconIndexActive v-if="NavbarStatus === 'tweets'" />
              <IconIndex v-if="NavbarStatus !== 'tweets'" />
            </div>
            <h5 class="nav-item-text" :class="{ active: NavbarStatus === 'tweets' }">首頁</h5>
          </router-link>
        </div>

        <div class="nav-item-container">
          <router-link
            class="nav-item user-profile"
            :to="{ name: 'user', params: { id: currentUser.id } }"
          >
            <div class="icon">
              <UserProfileActive
                v-if="
                  NavbarStatus !== 'tweets' && NavbarStatus !== 'user-setting'
                "
              />
              <UserProfile v-if="NavbarStatus !== 'user'" />
            </div>
            <h5 class="nav-item-text" :class="{ active: NavbarStatus !== 'tweets' && NavbarStatus !== 'user-setting'}">個人資料</h5>
          </router-link>
        </div>

        <div class="nav-item-container">
          <router-link
            class="nav-item setting"
            :to="{ name: 'user-setting', params: { id: currentUser.id } }"
          >
            <div class="icon">
              <SettingActive v-if="NavbarStatus === 'user-setting'" />
              <Setting v-if="NavbarStatus !== 'user-setting'" />
            </div>
            <h5 class="nav-item-text" :class="{ active: NavbarStatus === 'user-setting' }">設定</h5>
          </router-link>
        </div>

        <!-- 推文按鈕 -->
        <ModalTweetNew />
      </nav>
    </div>

    <!-- 下半部 -->
    <div class="down">
      <button class="logout" @click.stop.prevent="logout">
        <div class="icon">
          <Logout />
        </div>
        <h5>登出</h5>
      </button>
    </div>
  </section>
</template>

<script>
import IconIndex from '../components/icon/IconIndex.vue'
import UserProfile from '../components/icon/UserProfile.vue'
import Setting from '../components/icon/Setting.vue'
import Logout from '../components/icon/Logout.vue'
import IconIndexActive from '../components/icon/IconIndexActive.vue'
import UserProfileActive from '../components/icon/UserProfileActive.vue'
import SettingActive from '../components/icon/SettingActive.vue'
import ModalTweetNew from './ModalTweetNew.vue'
import { mapState } from 'vuex'

export default {
  components: {
    IconIndex,
    UserProfile,
    Setting,
    Logout,
    ModalTweetNew,
    IconIndexActive,
    UserProfileActive,
    SettingActive
  },
  data () {
    return {
      NavbarStatus: this.$router.currentRoute.name
    }
  },
  methods: {
    logout () {
      this.$store.commit('revokeAuthentication')
      this.$router.push('/signin')
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    console.log(this.$router.currentRoute.name)
  }
}
</script>

<style scoped>
.navbar {
  height: 100vh;
  width: 178px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nav-item,
.logout {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 15px;
  margin-bottom: 30px;
  color: var(--dark-90);
}

.nav-item:hover,
.icon:hover,
.logout:hover {
  color: var(--brand-color);
  fill: var(--brand-color);
}

.nav-item-text.active {
  color: var(--brand-color);
  fill: var(--brand-color);
}

.logo {
  height: 40px;
  width: 40px;
  margin: 10px 0px 20px 10px;
}

.icon {
  height: 24px;
  width: 24px;
  margin-right: 15px;
}

@media (max-width: 992px) {
  .navbar {
    width: 100%;
  }

  .top {
    justify-content: center;
  }

  .logo {
    margin: 20px 6px 40px 6px;
  }

  .nav-item h5,
  .logout h5 {
    display: none;
  }
}
</style>
