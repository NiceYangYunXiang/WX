const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatTimeTwo = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatTimeThree = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [hour, minute].map(formatNumber).join(':')
}

const formatTimeFour = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate() + 15
  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatDistance(num) {
  if (num < 1000) {
    return num.toFixed(0) + 'm';
  } else if (num > 1000) {
    return (num / 1000).toFixed(1) + 'km';
  }
}

function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  formatTime: formatTime,
  formatTimeTwo: formatTimeTwo,
  formatTimeThree: formatTimeThree,
  formatTimeFour: formatTimeFour,
  formatDistance: formatDistance,
}
