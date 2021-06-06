const names = {
  init: '',
  request: '',
  response: '',
  openDevTools: '',
}


for (const key of Object.keys(names)) {
  names[key] = `userApi_${key}`
}

/** @type { LxMusic.UserApiEvent.ParseNames } */
const parseNames = names

module.exports = parseNames
