export interface Names {
  init: '';
  request: '';
  response: '';
  openDevTools: '';
}

export type ParseNames = { [key in keyof Names]: `userApi_${key}`; }
