import Tips from './Tips.vue'
import Vue from 'vue'

const TipsConstructor = Vue.extend(Tips)

/**
 * @param { LxMusic.Renderer.TipsVue } instance
 * @param { number } time
 */
const addAutoCloseTimer = (instance, time) => {
  if (!time) return
  if (instance.autoCloseTimer) clearTimeout(instance.autoCloseTimer)
  instance.autoCloseTimer = setTimeout(() => {
    instance.cancel()
  }, time)
}
/** @param { LxMusic.Renderer.TipsVue } instance */
const clearAutoCloseTimer = instance => {
  if (!instance.autoCloseTimer) return
  clearTimeout(instance.autoCloseTimer)
  instance.autoCloseTimer = null
}

/** @param { LxMusic.Renderer.TipsVue } param1 */
export default ({ position, message, autoCloseTimer } = {}) => {
  if (!position) return
  /** @type { LxMusic.Renderer.TipsVue } */
  let instance = new TipsConstructor().$mount(document.createElement('div'))

  // Tips实例挂载到刚创建的div
  // 属性设置
  instance.visible = true
  instance.message = message
  instance.position.top = position.top
  instance.position.left = position.left

  // 将Tips的DOM挂载到body上
  document.body.appendChild(instance.$el)

  instance.cancel = () => {
    instance.$emit('beforeClose', instance)
    clearAutoCloseTimer(instance)
    instance.visible = false
    instance = null
  }

  instance.setTips = tips => {
    addAutoCloseTimer(instance, autoCloseTimer)
    instance.message = tips
  }

  addAutoCloseTimer(instance, autoCloseTimer)

  return instance
}

