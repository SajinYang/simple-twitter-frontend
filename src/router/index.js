import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import SimpleTwitter from '../views/SimpleTwitter.vue'
import store from '../store'

Vue.use(VueRouter)

// avoid none user access
const authorizeIsUser = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.isAdmin) {
    next('/not-found')
    return
  }
  next()
}

// avoid none admin access
const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && !currentUser.isAdmin) {
    next('/not-found')
    return
  }
  next()
}

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/tweets',
    name: 'tweets',
    component: SimpleTwitter,
    beforeEnter: authorizeIsUser
  },
  {
    path: '/tweets/:id',
    name: 'tweet',
    component: () => import('../views/Tweet.vue'),
    beforeEnter: authorizeIsUser
  },
  {
    path: '/users/:id',
    component: () => import('../views/UserProfile.vue'),
    redirect: '/users/:id/tweets',
    beforeEnter: authorizeIsUser,
    // nested routes
    children: [
      {
        path: 'tweets',
        name: 'user',
        component: () => import('../views/UserTweets.vue')
      },
      {
        path: 'replies',
        name: 'user-replies',
        component: () => import('../views/UserReplies.vue')
      },
      {
        path: 'likes',
        name: 'user-likes',
        component: () => import('../views/UserLikes.vue')
      }
    ]
  },
  {
    path: '/users/:id/follow',
    name: 'user-follow',
    component: () => import('../views/UserFollowStatus.vue'),
    beforeEnter: authorizeIsUser
  },
  {
    path: '/users/:id/setting',
    name: 'user-setting',
    component: () => import('../views/AccountSetting.vue'),
    beforeEnter: authorizeIsUser
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/signin'
  },
  {
    path: '/admin/signin',
    name: 'admin-sign-in',
    component: () => import('../views/AdminSignin.vue')
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['sign-up', 'sign-in', 'admin-sign-in']

  // 如果 token 無效則轉址到登入頁: 加條件避免無窮迴圈
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }

  // 如果 token 有效則轉址到餐廳首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/tweets')
    return
  }

  next()
})

export default router
