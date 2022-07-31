import { apiHelper } from './../utils/helpers'
const getToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY1ODk4OTM2OSwiZXhwIjoxNjU5NTk0MTY5fQ.7-T3dB3H8Zc9LqQN9VaJo0IiAfv_hlN7clvFnuHDqMg'

export default {
  getTweets () {
    return apiHelper.get('/tweets', {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  },
  getTweet ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  },
  getReply ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/replies`, {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  },
  createTweet ({ description }) {
    return apiHelper.post('/tweets', { description }, {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  },
  addLike ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`, { tweetId }, {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  },
  deleteLike ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`, { tweetId }, {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  }
}
