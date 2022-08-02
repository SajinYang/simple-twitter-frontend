import { apiHelper } from './../utils/helpers'

export default {
  getCurrentUser () {
    return apiHelper.get('/users/current_user')
  },
  getTopUsers () {
    return apiHelper.get('/users/top10')
  },
  getFollowings ({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getFollowers ({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  updateAccount ({ userId, ...data }) {
    console.log(userId)
    console.log({ ...data })
    return apiHelper.put(`/users/${userId}/setting`, { ...data })
  },
  signUp (data) {
    return apiHelper.post('/users', { ...data })
  }
}
