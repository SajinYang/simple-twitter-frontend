import { apiHelper } from './../utils/helpers'
const getToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY1ODk4MjM0NywiZXhwIjoxNjU5NTg3MTQ3fQ.NGSUSLXpuiR5Mq3dHoHLoOXghK-cxw3GE_A9ZLD5VoM'

export default {
  getTweets () {
    return apiHelper.get('/tweets', {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  },
  createTweet ({ description }) {
    return apiHelper.post('/tweets', { description }, {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  },
  addLike (tweetId) {
    return apiHelper.post(`/tweets/${tweetId}/like`, {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  }
}
