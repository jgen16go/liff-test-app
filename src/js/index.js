window.addEventListener('load', () => {
  liff.init(
    () => console.log('init success'),
    () => console.log('init error'),
  )
})
