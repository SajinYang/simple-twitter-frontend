import { apiHelper } from './../utils/helpers'
const getToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY1ODk4OTM2OSwiZXhwIjoxNjU5NTk0MTY5fQ.7-T3dB3H8Zc9LqQN9VaJo0IiAfv_hlN7clvFnuHDqMg'

export default {
  addFollow ({ id }) {
    return apiHelper.post('/followships', { id }, {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  },
  deleteFollow ({ id }) {
    return apiHelper.delete(`/followships/${id}`, {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  }
}
