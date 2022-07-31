import { apiHelper } from './../utils/helpers'

export default {
  getTweets () {
    return apiHelper.get('/tweets')
  },
  getTweet ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  getReply ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/replies`)
  },
  createTweet ({ description }) {
    return apiHelper.post('/tweets', { description })
  },
  addLike ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`, { tweetId })
  },
  deleteLike ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`, { tweetId })
  }
}
