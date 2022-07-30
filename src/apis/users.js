import { apiHelper } from './../utils/helpers'

export default {
  getCurrentUser () {
    return apiHelper.get('/users/current_user')
  },
  getTopUsers () {
    return apiHelper.get('/users/top10')
  },
  getFollowings () {
    return apiHelper.get('/users/14/followings')
  }
}
