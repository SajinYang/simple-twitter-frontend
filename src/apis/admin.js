import { apiHelper } from './../utils/helpers'
const getToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjU5MjY4MjY4LCJleHAiOjE2NTk4NzMwNjh9.PkmQNAJikImjJxPmW_aAan8IXfqhOVSbJgPUOJ2u4ko'

export default {
  getAdminUsers () {
    return apiHelper.get('/admin/users', {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  },
  getAdmintweets () {
    return apiHelper.get('/admin/tweets', {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  },
  deleteAdminTweet ({ tweetId }) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  }
}
