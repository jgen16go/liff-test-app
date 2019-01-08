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
    const txt = '◆お申込み内容\n[店名]\nああああああ\n[日付]\nmm月dd日（$曜日）\n[時間]\nhh:mm\n[人数]\n$人数 人\n[地図]\nhttps://www.google.com/maps?q=35.6694219,139.4612045'
    liff.sendMessages([
      {
        "type": "flex",
        "altText": "this is a flex message",
        "contents": {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "wrap": true,
                "text": "※別途送信のメール本文に記載されたリンクをクリックした後、予約が確定します。\n\n◆お申込み内容\n[店名]\nああああああ\n[日付]\nmm月dd日（$曜日）\n[時間]\nhh:mm\n[人数]\n$人数 人"
              },
              {
                "type": "button",
                "style": "link",
                "height": "sm",
                "action": {
                  "type": "uri",
                  "label": "ご予約内容詳細",
                  "uri": "https://example.com"
                }
              },
              {
                "type": "button",
                "style": "link",
                "height": "sm",
                "action": {
                  "type": "uri",
                  "label": "地図を開く",
                  "uri": "https://www.google.com/maps?q=35.6694219,139.4612045"
                }
              },
              {
                "type": "button",
                "style": "link",
                "height": "sm",
                "action": {
                  "type": "uri",
                  "label": "友だちとシェアする",
                  "uri": "line://msg/text/?"
                }
              }
            ]
          }
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
