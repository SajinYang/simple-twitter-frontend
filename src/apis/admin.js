import { apiHelper } from './../utils/helpers'

export default {
  signIn ({ account, password }) {
    return apiHelper.post('/admin/signin', {
      account, password
    })
  },
  getAdminUsers () {
    return apiHelper.get('/admin/users')
  },
  getAdmintweets () {
    return apiHelper.get('/admin/tweets')
  },
  deleteAdminTweet ({ tweetId }) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`)
  }
}
