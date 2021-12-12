import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

function mountReactComponents() {
  const element = document.getElementById('root')

  let { reactComponentProps } = element.dataset

  if (!reactComponentProps) {
    reactComponentProps = {}
  } else {
    reactComponentProps = JSON.parse(reactComponentProps)
  }

  ReactDOM.render(
    <React.StrictMode>
      <App {...reactComponentProps} />
    </React.StrictMode>,
    element
  )
}

function unmountReactComponents() {
  const element = document.getElementById('root')

  ReactDOM.unmountComponentAtNode(element)
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
