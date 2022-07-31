<template>
  <section class="navbar">
    <!-- 上半部 -->
    <div class="top">
      <!-- logo -->
      <div class="logo">
        <router-link to="">
          <img src="./../assets/icon/navbar-logo.svg" alt="" />
        </router-link>
      </div>

      <!-- nav -->
      <nav class="navigation">
        <div @click.stop.prevent="toggleNavStatus('admin-tweet')">
          <router-link class="nav-item index" to="/admin">
            <div class="icon">
              <IconIndexActive v-if="NavbarStatus === 'admin-tweets'" />
              <IconIndex v-if="NavbarStatus !== 'admin-tweets'" />
            </div>
            <h5>推文清單</h5>
          </router-link>
        </div>

        <div @click.stop.prevent="toggleNavStatus('admin-users')">
          <router-link class="nav-item user-profile" to="/admin/users">
            <div class="icon">
              <UserProfileActive v-if="NavbarStatus === 'admin-users'" />
              <UserProfile v-if="NavbarStatus !== 'admin-users'" />
            </div>
            <h5>使用者列表</h5>
          </router-link>
        </div>
      </nav>
    </div>

    <!-- 下半部 -->
    <div class="down">
      <div @click.stop.prevent="toggleNavStatus('logout')">
        <button class="logout" @click.stop.prevent="logout">
          <div class="icon">
            <Logout />
          </div>
          <h5>登出</h5>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import IconIndex from './icon/IconIndex.vue'
import IconIndexActive from './icon/IconIndexActive.vue'
import UserProfile from './icon/UserProfile.vue'
import UserProfileActive from './icon/UserProfileActive.vue'
import Logout from './icon/Logout.vue'

export default {
  components: {
    IconIndex,
    IconIndexActive,
    UserProfile,
    UserProfileActive,
    Logout
  },
  data () {
    return {
      NavbarStatus: this.$router.currentRoute.name
    }
  },
  methods: {
    logout () {
      this.$store.commit('revokeAuthentication')
      this.$router.push('/admin/signin')
    }
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
.logout:hover,
.nav-item.active,
.logout.active {
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
</style>
