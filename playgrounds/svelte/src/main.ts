import App from './App.svelte'
import './app.css'

const app = new App({
  target: document.getElementById('app'),
  context: new Map([['1', 2]]),
})

export default app
