/** 初始化日期 FullDate YY-MM-DD **/
function getFullDate(dateVal){
  let currentDate = dateVal || new Date();
  const YY = currentDate.getFullYear();
  const MM = (currentDate.getMonth() + 1) < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)
  const DD = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()

  return `${YY}-${MM}-${DD}`
}

/** 取当前时间7天前日期 oneWeakAgo YY-MM-DD**/
function getOneWeakAgo() {
  let currentDate = new Date();
  const oneWeakAgo = new Date(currentDate - 7 * 24 * 3600 * 1000);
  return getFullDate(oneWeakAgo);
}

function getFullTime(dateVal){
  let time = new Date(dateVal);
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let date = time.getDate();
  let hours = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();

  if (month < 10) { month = '0' + month };
  if (date < 10) { date = '0' + date };
  if (hours < 10) { hours = '0' + hours };
  if (minute < 10) { minute = '0' + minute };
  if (second < 10) { second = '0' + second };
  return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second;
}

function getTime(dateVal){
  let second = parseInt(dateVal);
  let minute = 0
  let hour = 0
  if (second > 60) {
    minute = parseInt(second / 60)
    second = parseInt(second % 60)
    if (minute > 60) {
      hour = parseInt(minute / 60)
      minute = parseInt(minute % 60)
    }
  }

  let result = '' + parseInt(second) + '秒'
  if (minute > 0) {
    result = '' + parseInt(minute) + '分' + result
  }
  if (hour > 0) {
    result = '' + parseInt(hour) + '小时' + result
  }
  return result
}

export default {
  getFullDate,
  getOneWeakAgo,
  getFullTime,
  getTime
}
