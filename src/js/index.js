const logs = []

const logger = v => {
  logs.push(v)
  document.getElementById('js-log').innerHTML = logs.join('<br>')
}

const initialize = () => {
  return new Promise((resolve, reject) => {
    liff.init(
      resolve,
      reject
    )
  })
}

window.addEventListener('load', () => {
  initialize().then(res => {
    logger('init success')
  })
})
