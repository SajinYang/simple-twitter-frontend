import { apiHelper } from './../utils/helpers'

export default {
  addFollow ({ id }) {
    return apiHelper.post('/followships', { id })
  },
  deleteFollow ({ id }) {
    return apiHelper.delete(`/followships/${id}`)
  }
}
