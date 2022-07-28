import { apiHelper } from './../utils/helpers'
const getToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY1ODc2NDA1NywiZXhwIjoxNjU5MzY4ODU3fQ.6Sd477J8sayfb540xVyqIHTgShmdFOOT4Evq7rB6GfE'

export default {
  getTopUsers () {
    return apiHelper.get('/users/top10', {
      headers: { Authorization: `Bearer ${getToken}` }
    })
  }
}
