//定义一个时间，返回早上下午晚上
export default () => {
  const hours = new Date().getHours()
  let message = ''
  if (hours < 6) {
    message = '凌晨'
  } else if (hours < 12) {
    message = '早上'
  } else if (hours < 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}