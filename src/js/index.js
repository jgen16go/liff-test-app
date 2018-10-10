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
  getProfile().then(res => {
    const { userId, displayName, pictureUrl, statusMessage } = res
    document.getElementById('js-p-id').innerHTML = userId
    document.getElementById('js-p-dispname').innerHTML = displayName
    document.getElementById('js-p-pictureUrl').innerHTML = pictureUrl
    document.getElementById('js-p-statusMsg').innerHTML = statusMessage
  })
}

window.addEventListener('load', async () => {
  logger('liff initial start')
  await initialize()
  logger('liff initial end')
  setLink()
  setProfile()
})
