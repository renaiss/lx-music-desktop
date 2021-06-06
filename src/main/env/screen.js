const { app, screen } = require('electron')

/** 初始化工作区大小 */
const initScreenParams = () => {
  global.envParams.workAreaSize = screen.getPrimaryDisplay().workAreaSize
}

/** 初始化工作区大小 */
app.on('ready', () => {
  screen.on('display-metrics-changed', initScreenParams)
  initScreenParams()
})
