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

document.addEventListener('DOMContentLoaded', mountReactComponents)
document.addEventListener('turbo:render', mountReactComponents)

document.addEventListener('turbo:before-render', unmountReactComponents)
