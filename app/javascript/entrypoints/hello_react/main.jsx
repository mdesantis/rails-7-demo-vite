import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

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
