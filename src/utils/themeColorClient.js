import client from 'webpack-theme-color-replacer/client'
import forElementUI from 'webpack-theme-color-replacer/forElementUI'
import storage from '@/utils/storage'
const config = require('@/config')
// import appConfig from '../../config/app-config'

export let curColor = config.theme.color

/* 动态切换主题色 */
export function changeThemeColor(newColor) {
  const options = {
    newColors: [...forElementUI.getElementUISeries(newColor)]
  }

  return client.changer.changeColor(options, Promise).then(() => {
    curColor = newColor
    storage.set('theme_color', curColor)
  })
}

export function initThemeColor() {
  const savedColor = storage.get('theme_color')
  if (savedColor) {
    curColor = savedColor
    changeThemeColor(savedColor)
  }
}

export function rgbToHex(rgb) {
  if (rgb.indexOf('rgb') > -1) {
    // rgb(x, y, z)
    const color = rgb.replace(/(?:\(|\)|rgba|RGBA)*/g, '').split(',') // 把 x,y,z 推送到 color 数组里
    let hex = '#'
    for (let i = 0; i < 3; i++) {
    // 'Number.toString(16)' 是JS默认能实现转换成16进制数的方法.
    // 'color[i]' 是数组，要转换成字符串.
    // 如果结果是一位数，就在前面补零。例如： A变成0A
      hex += ('0' + Number(color[i]).toString(16)).slice(-2)
    }
    return hex
  } else {
    return rgb
  }
}

