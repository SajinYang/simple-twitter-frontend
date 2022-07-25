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
        <div
          class="nav-item-container"
          @click.stop.prevent="toggleNavStatus('index')"
        >
          <router-link class="nav-item index" to="/tweets">
            <div class="icon">
              <IconIndexActive v-if="navStatus === 'index'" />
              <IconIndex v-else />
            </div>
            <div>首頁</div>
          </router-link>
        </div>

        <div
          class="nav-item-container"
          @click.stop.prevent="toggleNavStatus('user-profile')"
        >
          <router-link class="nav-item user-profile" to="/tweets/1">
            <div class="icon">
              <UserProfileActive v-if="navStatus === 'user-profile'" />
              <UserProfile v-else />
            </div>
            <div>個人資料</div>
          </router-link>
        </div>

        <div
          class="nav-item-container"
          @click.stop.prevent="toggleNavStatus('setting')"
        >
          <router-link class="nav-item setting" to="/user/1/setting">
            <div class="icon">
              <SettingActive v-if="navStatus === 'setting'" />
              <Setting v-else />
            </div>
            <div>設定</div>
          </router-link>
        </div>

        <!-- 推文按鈕 -->
        <ModalTweetNew />
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
import IconIndex from "../components/icon/IconIndex.vue";
import IconIndexActive from "../components/icon/IconIndexActive.vue";
import UserProfile from "../components/icon/UserProfile.vue";
import UserProfileActive from "../components/icon/UserProfileActive.vue";
import Setting from "../components/icon/Setting.vue";
import SettingActive from "../components/icon/SettingActive.vue";
import Logout from "../components/icon/Logout.vue";
import LogoutA from "../components/icon/LogoutA.vue";
import ModalTweetNew from "./ModalTweetNew.vue";

export default {
  components: {
    IconIndex,
    IconIndexActive,
    UserProfile,
    UserProfileActive,
    Setting,
    SettingActive,
    Logout,
    LogoutA,
    ModalTweetNew,
  },
  data() {
    return {
      navStatus: "index",
    };
  },
  methods: {
    toggleNavStatus(e) {
      console.log(e.target);
      this.navStatus = status;
    },
  },
};
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
