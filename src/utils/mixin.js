import moment from 'moment'
import emptyImg from './../assets/img/tweet-nophoto.png'
import emptyCoverImg from './../assets/img/card-background.png'

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

export const dateFilter = {
  filters: {
    date (dateTime) {
      moment.locale('zh-tw')
      return dateTime ? moment(dateTime).format('a hh:mm ⋅ YYYY年M月D日') : '-'
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage (src) {
      return src || emptyImg
    },
    emptyCover (src) {
      return src || emptyCoverImg
    }
  }
}
