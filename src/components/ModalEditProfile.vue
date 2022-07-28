<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <form @submit.prevent.stop="handleSubmit">
            <div class="modal-header">
              <h5 name="modal-header" class="modal-header-title">編輯個人資料</h5>
              <button class="modal-close-button" @click.stop.prevent="$emit('close')">
                <img class="btn-close" src="./../assets/icon/modal-cancel.svg" alt="" />
              </button>
              <button type="submit" class="btn-save">儲存</button>
            </div>

            <div class="modal-body">
              <div class="avatar-container">
                <div class="avatar-image-container">
                  <label for="avatar-image" class="avatar-image-label"></label>
                  <img class="avatar-img-thumbnail" src="../assets/img/avatar.png" alt="avatar-image">
                  <div class="bg-mask avatar-mask"></div>
                </div>
                <input id="avatar-image" type="file" name="image" accept="image/*" class="form-control-file"
                  @change="handleAvatarFileChange">
              </div>
              <div class="banner">
                <div class="banner-container">
                  <div class="banner-image-container">
                    <div class="banner-btn-control">
                      <label for="image" class="banner-image-label pe-5"></label>
                      <button class="modal-close-button" @click.stop.prevent="handleBannerFileCancel">
                        <img class="btn-close banner-cancel" src="./../assets/icon/modal-cancel.svg"
                          alt="close-button" />
                      </button>
                    </div>
                    <img class="d-block img-thumbnail" src="../assets/icon/card-background.png" alt="banner-image">
                    <div class="bg-mask banner-mask"></div>
                  </div>
                  <input id="image" type="file" name="image" accept="image/*" class="form-control-file"
                    @change="handleBannerFileChange">
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <div class="input-group">
                <input type="text" name="name" id="name" maxlength="100" v-model="user.name" required>
                <label for="name">名稱</label>

                <div class="input-hints">
                  <span class="error"
                    :style="{ visibility: user.name.length > 50 ? 'visible' : 'hidden' }">字數超出上限</span>
                  <span :class="{ error: user.name.length > 50 }" v-if="user.name.length">{{ user.name.length
                  }}/50</span>
                </div>
              </div>

              <div class="input-group">
                <textarea name="introduction" id="introduction" cols="30" rows="10" class="self-intro"
                  v-model="user.introduction"></textarea>
                <label for="introduction">自我介紹</label>

                <div class="input-hints">
                  <span class="error"
                    :style="{ visibility: user.introduction.length > 160 ? 'visible' : 'hidden' }">字數超出上限</span>
                  <span :class="{ error: user.introduction.length > 160 }" v-if="user.introduction.length">{{
                      user.introduction.length
                  }}/160</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// AdminCategories toggleEdit

export default {
  data () {
    return {
      user: {
        name: '',
        password: '',
        isAdmin: false,
        introduction: ''
      },
      isAuthenticated: false,
      isProcessing: false
    }
  },
  methods: {
    handleAvatarFileChange () {
      console.log('handleAvatarChange')
    },
    handleBannerFileChange () {
      console.log('handleBannerChange')
    },
    handleBannerFileCancel () {
      console.log('handleBannerFileCancel')
    },
    handleSubmit (e) {
      console.log('handleSubmit')
      console.log(e.target)
    }
  }
}

</script>

<style lang="scss" scoped>
// modal
.modal-mask {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%, 0%);
}

.modal-container {
  min-width: 600px;
  // height: 610px;
  left: 334px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 14px;
  transition: all 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #E6ECF0;
}

.modal-header-title {
  position: absolute;
  left: 4rem;
}

.modal-body {
  position: relative;
}

.modal-footer {
  padding: 5rem 1rem 1rem 1rem;
}

// vue modal default
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

// avatar and banner
.btn-save {
  padding: 0.5rem 1rem;
  border-radius: 50px;
  background-color: var(--brand-color);
  color: var(--dark-0);
}

.btn-close {
  display: block;
  width: 100%;
  height: 100%;
}

.bg-mask {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.banner-cancel {
  filter: brightness(0) saturate(100%) invert(100%) sepia(99%) saturate(14%) hue-rotate(213deg) brightness(105%) contrast(100%);
}

.avatar-container {
  position: absolute;
  bottom: -70px;
  left: 1rem;
  z-index: 1;
}

.avatar-image-container {
  position: relative;
  width: 140px;
  height: 140px;
}

.avatar-image-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-image: url(../assets/icon/modal-changephoto.svg);
  background-repeat: no-repeat;
  z-index: 1;
}

.avatar-img-thumbnail {
  border: 4px solid steelblue;
  border-radius: 50%;
}

.avatar-mask {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}

.banner-image-container {
  position: relative;
  width: 100%;
  height: 188px;
}

.banner-btn-control {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  z-index: 1;
}

.banner-image-label {
  display: block;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-image: url(../assets/icon/modal-changephoto.svg);
  background-repeat: no-repeat;
}

.banner-img-thumbnail {
  border: 4px solid steelblue;
  border-radius: 50%;
  opacity: 0.8;
}

.banner-mask {
  background-color: rgba(0, 0, 0, 0.3);
}

.form-control-file {
  display: none;
}

// input start
.input-group {
  position: relative;
  width: 100%;

  &:first-child {
    margin-bottom: 2rem;
  }
}

input,
textarea {
  width: 100%;
  height: 54px;
  padding: 1.5rem 1rem 0 1rem;
  background-color: #F5F8FA;
  color: var(--dark-100);
  border: none;
  border-bottom: 2px solid var(--message-primary);
  font-size: 16px;

  &::placeholder {
    font-size: 1rem;
    color: var(--dark-60);
  }

  &:hover,
  &:focus {
    border-bottom: 2px solid var(--info);
  }

  &:disabled {
    border-bottom: 2px solid var(--dark-50);
  }

  &.error {
    border-bottom: 2px solid var(--error);
  }

  & ~ label {
    position: absolute;
    left: 1rem;
    color: var(--dark-80);
    font-size: 14px;
    line-height: 22px;
  }
}

.input-hints {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  font-size: 12px;

  & .error {
    color: var(--error);
  }
}

.self-intro {
  height: 150px;
}

// input end
</style>
