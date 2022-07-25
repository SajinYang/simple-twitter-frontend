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
              <IconIndexActive v-if="navStatus === 'admin-tweet'" />
              <IconIndex v-else />
            </div>
            <div>推文清單</div>
          </router-link>
        </div>

        <div @click.stop.prevent="toggleNavStatus('admin-users')">
          <router-link class="nav-item user-profile" to="/admin/users">
            <div class="icon">
              <UserProfileActive v-if="navStatus === 'admin-users'" />
              <UserProfile v-else />
            </div>
            <div>使用者列表</div>
          </router-link>
        </div>
      </nav>
    </div>

    <!-- 下半部 -->
    <div class="down">
      <div @click.stop.prevent="toggleNavStatus('logout')">
        <router-link class="logout" to="/404">
          <div class="icon">
            <LogoutA v-if="navStatus === 'logout'" />
            <Logout v-else />
          </div>
          <div>登出</div>
        </router-link>
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
import LogoutA from './icon/LogoutA.vue'

export default {
  components: {
    IconIndex,
    IconIndexActive,
    UserProfile,
    UserProfileActive,
    Logout,
    LogoutA
  },
  data () {
    return {
      navStatus: 'admin-tweet'
    }
  },
  methods: {
    toggleNavStatus (status) {
      this.navStatus = status
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
.router-link-active {
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
