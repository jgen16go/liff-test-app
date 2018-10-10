import '@babel/polyfill'

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

window.addEventListener('load', async () => {
  logger('liff initial start')
  await initialize()
  logger('liff initial end')
})
