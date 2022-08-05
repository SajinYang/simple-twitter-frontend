<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <form @submit.prevent.stop="handleSubmit">
            <div class="modal-header">
              <h5 name="modal-header" class="modal-header-title">編輯個人資料</h5>
              <button class="modal-close-button" @click.stop.prevent="handleCancel">
                <img class="btn-close" src="./../assets/icon/modal-cancel.svg" alt="" />
              </button>
              <button type="submit" class="btn-save" :disabled="isProcessing">
                {{ isProcessing ? '儲存中' : '儲存' }}
              </button>
            </div>

            <div class="modal-body">
              <div class="avatar-container">
                <div class="avatar-image-container">
                  <label for="avatar-image" class="avatar-image-label"></label>
                  <div class="avatar-thumbnail">
                    <img class="avatarImg" :src="user.avatar | emptyImage" alt="avatar-image">
                  </div>
                  <div class="bg-mask avatar-mask" v-if="!user.avatar"></div>
                </div>
                <input id="avatar-image" type="file" name="avatar" accept="image/*" class="form-control-file"
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
                    <img class="d-block banner-img-thumbnail" :src="user.cover | emptyCover" alt="banner-image">
                    <div class="bg-mask banner-mask" v-if="!user.cover"></div>
                  </div>
                  <input id="image" type="file" name="cover" accept="image/*" class="form-control-file"
                    @change="handleBannerFileChange">
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <div class="input-group">
                <input type="text" name="name" id="name" maxlength="100" v-model="user.name" required>
                <label for="name">名稱</label>

                <div class="input-hints">
                  <span class="error" :style="{ visibility: user.name.length > 50 ? 'visible' : 'hidden' }">
                    字數超出上限！
                  </span>
                  <span :class="{ error: user.name.length > 50 }" v-if="user.name.length">
                    {{ user.name.length }}/50</span>
                </div>
              </div>

              <div class="input-group">
                <textarea name="introduction" id="introduction" cols="30" rows="10" class="self-intro"
                  v-model="user.introduction" placeholder="讓社群更認識你"></textarea>
                <label for="introduction">自我介紹</label>

                <div class="input-hints">
                  <span class="error" :style="{ visibility: user.introduction.length > 160 ? 'visible' : 'hidden' }">
                    字數超出上限！
                  </span>
                  <span :class="{ error: user.introduction.length > 160 }" v-if="user.introduction.length">
                    {{ user.introduction.length }}/160
                  </span>
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
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
import { emptyImageFilter } from '../utils/mixin'

export default {
  mixins: [emptyImageFilter],
  props: {
    initialProfile: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      user: {
        id: -1,
        name: '',
        nameCached: '',
        introduction: '',
        introCached: '',
        avatar: null,
        avatarCached: '',
        cover: null,
        coverCached: ''
      },
      isProcessing: false
    }
  },
  methods: {
    fetchUserProfile (profile) {
      const { id, name, introduction, avatar, cover } = profile
      this.user = {
        ...this.user,
        id,
        name,
        nameCached: name,
        introduction,
        introCached: introduction,
        avatar,
        avatarCached: avatar,
        cover,
        coverCached: cover
      }
    },
    handleAvatarFileChange (e) {
      const { files } = e.target

      if (files.length === 0) {
        this.user.avatar = ''
      } else if (files[0].size > 8388608) {
        Toast.fire({
          icon: 'error',
          title: '超過檔案大小上限8MB，請重新上傳'
        })
        this.user.avatar = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.avatar = imageURL
      }
    },
    handleBannerFileChange (e) {
      const { files } = e.target

      if (files.length === 0) {
        this.user.cover = ''
      } else if (files[0].size > 8388608) {
        Toast.fire({
          icon: 'error',
          title: '超過檔案大小上限8MB，請重新上傳'
        })
        this.user.cover = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.cover = imageURL
      }
    },
    handleBannerFileCancel () {
      this.user = {
        ...this.user,
        cover: this.user.coverCached
      }
    },
    async handleSubmit (e) {
      try {
        if (!this.user.name) {
          Toast.fire({
            icon: 'error',
            title: '使用者名稱為必填，請確認已填寫'
          })
          return
        }
        if (this.user.name.trim().length > 50 ||
          this.user.introduction.trim().length > 160) {
          Toast.fire({
            icon: 'error',
            title: '超過字數上限，請重新修改'
          })
          return
        }
        if (this.user.name === this.user.nameCached &&
          this.user.introduction === this.user.introCached &&
          this.user.avatar === this.user.avatarCached &&
          this.user.cover === this.user.coverCached) {
          Toast.fire({
            icon: 'success',
            title: '成功更新使用者資料'
          })
          this.isProcessing = false
          this.$emit('close')
          return
        }
        this.isProcessing = true
        const form = e.target
        const formData = new FormData(form)
        const { data } = await usersAPI.updateProfile({
          userId: this.user.id,
          data: formData
        })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: '成功更新使用者資料'
        })
        this.isProcessing = false

        // current page reload
        this.$router.go(0)
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法編輯使用者資料，請稍後再試'
        })
      }
    },
    handleCancel () {
      this.user = {
        ...this.user,
        name: this.user.nameCached,
        introduction: this.user.introCached,
        avatar: this.user.avatarCached,
        cover: this.user.coverCached
      }
      this.$emit('close')
    }
  },
  created () {
    this.fetchUserProfile(this.initialProfile)
  },
  watch: {
    initialProfile (newValue) {
      this.fetchUserProfile(newValue)
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
  width: 600px;
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
  border-bottom: 1px solid var(--border);
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

  &:hover,
  &:disabled {
    opacity: 0.8;
  }
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

.avatar-thumbnail {
  width: 140px;
  height: 140px;
  border: 4px solid var(--dark-0);
  border-radius: 50%;
  background-color: #fff;
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
  height: 188px;
  object-fit: cover;
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
@media (max-width: 992px) {
  .modal-container {
    width: 100%;
    max-width: 600px;
  }
}
</style>
