import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import SimpleTwitter from '../views/SimpleTwitter.vue'

Vue.use(VueRouter)

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
    component: () => import('../views/UserProfile.vue')
  },
  {
    path: '/users/:id/follow',
    name: 'user-follow',
    component: () => import('../views/UserFollowStatus.vue')
  },
  {
    path: '/users/:id/setting',
    name: 'user-setting',
    component: () => import('../views/AccountSetting.vue')
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
