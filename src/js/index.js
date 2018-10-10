import '@babel/polyfill'
import forEach from 'lodash/forEach'

const logs = []

const logger = v => {
  logs.push(v)
  document.getElementById('js-log').innerHTML = logs.join('<br>')
}

async function initialize() {
  return new Promise((resolve, reject) => {
    liff.init(
      resolve,
      reject
    )
  })
}

const setLink = () => {
  const triggers = document.querySelectorAll('.js-link')
  forEach(triggers, elm => {
    elm.addEventListener('click', () => {
      liff.openWindow({
        url: elm.getAttribute('data-url'),
        external: elm.getAttribute('data-window') === 'out',
      })
    })
  })
}

const setProfile = () => {
  liff.getProfile().then(res => {
    const { userId, displayName, pictureUrl, statusMessage } = res
    document.getElementById('js-p-id').innerHTML = userId
    document.getElementById('js-p-dispname').innerHTML = displayName
    document.getElementById('js-p-pictureUrl').innerHTML = pictureUrl
    document.getElementById('js-p-statusMsg').innerHTML = statusMessage
  })
}

const setCloseEvent = () => {
  document.getElementById('js-close').addEventListener('click', () => {
    liff.closeWindow()
  })
}

const setMessageEvent = () => {
  document.getElementById('js-message1').addEventListener('click', () => {
    liff.sendMessages([
      {
        type: 'text',
        text: 'hoge'
      }
    ])
  })
  document.getElementById('js-message2').addEventListener('click', () => {
    liff.sendMessages([
      {
        type: 'text',
        text: 'fuga'
      },
      {
        type: 'text',
        text: 'piyo'
      }
    ])
  })
}

window.addEventListener('load', async () => {
  logger('liff initial start')
  await initialize()
  logger('liff initial end')
  setLink()
  setProfile()
  setCloseEvent()
  setMessageEvent()
})
