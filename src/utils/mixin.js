import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow (datatime) {
      moment.locale('zh-tw')
      const fromNowTime = moment(datatime).fromNow()
      const fromNowCurrent = fromNowTime.slice(0, fromNowTime.length - 1)
      return datatime ? fromNowCurrent : '-'
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage (src) {
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    }
  }
}
