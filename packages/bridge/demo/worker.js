self.addEventListener('message', (e) => {
  if (e.data === 'start') {
    importScripts('../src/master.js')
    master.postMessage = (data) => self.postMessage(data)
    start()
  } else {
    master.onmessage(e.data)
  }
})

async function start() {
  const document = context.document
  const h1 = document.createElement('h1')
  h1.textContent = 'hello Voe!'
  h1.style.cssText = 'color:#009688'
  document.body.appendChild(h1)

  const p = document.createElement('p')
  p.textContent = 'all run in worker'
  document.body.appendChild(p)

  const button = document.createElement('button')
  button.textContent = 'click me'
  button.style.fontWeight = 'bold'
  button.addEventListener('click', click)
  document.body.appendChild(button)

  context.audioContext = new context.AudioContext()
  const response = await fetch('1.m4a')
  const arrayBuffer = await response.arrayBuffer()
  context.audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
    self.audioBuffer = audioBuffer
  })
}

async function click(e) {
  const source = context.audioContext.createBufferSource()
  source.buffer = self.audioBuffer
  source.connect(context.audioContext.destination)
  source.start(0)
}