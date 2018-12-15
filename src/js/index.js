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
        "type": "template",
        "altText": "This is a buttons template",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
            "imageAspectRatio": "rectangle",
            "imageSize": "cover",
            "imageBackgroundColor": "#FFFFFF",
            "title": "Menu",
            "text": "Please select<br>aaaaa\nbbbbbb",
            "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "http://example.com/page/123"
            },
            "actions": [
              {
                "type": "uri",
                "label": "View detail1",
                "uri": "http://example.com/page/123"
              },
              {
                "type": "uri",
                "label": "View detail2",
                "uri": "http://example.com/page/123"
              },
              {
                "type": "uri",
                "label": "View detail3",
                "uri": "line://msg/text/?hoge%0Afuga"
              }
            ]
        }
      }
    ])
  })
}

window.addEventListener('load', async () => {
  logger('liff initial start')
  const initialData = await initialize()
  logger(`uid: ${initialData.context.userId}`)
  logger('liff initial end')
  setLink()
  setProfile()
  setCloseEvent()
  setMessageEvent()
})

const REGEXP_PATTERN = {
  numericOnly: new RegExp('[^0-9]')
}

const isNumericOnly = s => s.match(REGEXP_PATTERN.numericOnly)
const deleteNonNumericCharacters = s => s.replace(REGEXP_PATTERN.numericOnly, '')

// const tel = document.getElementById('js-tel')
// tel.addEventListener('blur', (e) => {
//   const val = e.target.value
//   e.target.value = deleteNonNumericCharacters(val)
// })
