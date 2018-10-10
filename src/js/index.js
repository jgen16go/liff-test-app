const logs = []

const logger = v => {
  logs.push(v)
  document.getElementById('js-log').innerHTML = logs.join('<br>')
}

window.addEventListener('load', () => {
  liff.init(
    () => logger('init success'),
    () => logger('init error'),
  )
})
