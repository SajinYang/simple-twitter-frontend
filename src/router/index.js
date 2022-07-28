import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SimpleTwitter from '../views/SimpleTwitter.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: 'signin'
  },
  {
    path: '/tweets',
    name: 'tweets',
    component: SimpleTwitter
  },
  {
    path: '/tweets/:id',
    name: 'tweet',
    component: () => import('../views/Tweet.vue')
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/user/:id/follow',
    name: 'user-follow',
    component: () => import('../views/UserFollowStatus.vue')
  },
  {
    path: '/user/:id/setting',
    name: 'user-setting',
    component: () => import('../views/AccountSetting.vue')
  },
  {
    path: '/admin',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue')
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

export default router
