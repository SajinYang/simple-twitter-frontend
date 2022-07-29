import { apiHelper } from './../utils/helpers'
const getToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY1ODk4MzI4NiwiZXhwIjoxNjU5NTg4MDg2fQ.IhuhWJAKBMnkyhMZgEZyaRbrSti_LUAVYzT8H0BJfhY'

export default {
  getTopUsers () {
    return apiHelper.get('/users/top10', {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  },
  getFollowings () {
    return apiHelper.get('/users/14/followings', {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  }
}
