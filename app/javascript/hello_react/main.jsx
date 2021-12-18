import './index.css'

import ReactDOM from 'react-dom'
import { StrictMode } from 'react'

import App from './App'

function mountReactComponents() {
  const [mountElement] = document.getElementsByClassName('react-component-mount')
  const { containerElementId } = mountElement.dataset
  const containerElement = document.getElementById(containerElementId)
  const props = JSON.parse(mountElement.textContent)

  ReactDOM.render(
    <StrictMode><App {...props} /></StrictMode>,
    containerElement
  )
}

function unmountReactComponents() {
  const [mountElement] = document.getElementsByClassName('react-component-mount')
  const { containerElementId } = mountElement.dataset
  const containerElement = document.getElementById(containerElementId)

  ReactDOM.unmountComponentAtNode(containerElement)
}

function resetReactComponentsAfterTurboPageCacheRestoring(event) {
  if (!event.state.turbo) {
    return
  }

  unmountReactComponents()
  mountReactComponents()
}

document.addEventListener('DOMContentLoaded', mountReactComponents)
document.addEventListener('turbo:render', mountReactComponents)

document.addEventListener('turbo:before-render', unmountReactComponents)

// Reset React components after Turbo cache restoring in order to prevent issues with dirty cache
window.addEventListener('popstate', resetReactComponentsAfterTurboPageCacheRestoring)
