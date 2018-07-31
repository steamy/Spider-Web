const fs = require('fs')

var log = fs.readFileSync('/Users/fanyu/douban-user/web-nuxt/tool-script/watcher.log')

var logLineArray = log.toString().split('\n')

var fetchedUsersCounts = []
var wantedUsersCounts = []
var times = []

function countsUser (isFetched = true) {
  var i = 1
  if (!isFetched) {
    i = 2
  }
  for (; i < logLineArray.length - 1; i = i + 3) {
    let splitSpaceArray = logLineArray[i].split(' ')
    let time = splitSpaceArray[0] + splitSpaceArray[1].split(',')[0]
    let num = parseInt(splitSpaceArray[5].replace(/[^0-9]/ig, ''))
    if (isFetched) {
      fetchedUsersCounts.push(num)
      times.push(time)
    } else {
      wantedUsersCounts.push(num)
    }
  }
}

module.exports = function fetchSpiderStatistics (){
  countsUser()
  countsUser(false)
  return {
    'fetchedUsersCounts': fetchedUsersCounts,
    'wantedUsersCounts': wantedUsersCounts,
    'times': times
  }
}
