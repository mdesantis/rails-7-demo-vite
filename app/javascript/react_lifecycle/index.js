import ReactDOM from 'react-dom'

import LazedComponent from './lazed_component'

function componentMountElements() {
  return document.getElementsByClassName('react-component-mount')
}

function mountComponents() {
  Array.from(componentMountElements()).forEach((element) => {
    const { componentName, containerElementId } = element.dataset
    const containerElement = document.getElementById(containerElementId)
    const props = JSON.parse(element.textContent)
    const componentsGlobImport = import.meta.glob('/components/**/*.jsx')
    const lazyImport = componentsGlobImport[`/components/${componentName}.jsx`]

    ReactDOM.render(LazedComponent(lazyImport)(props), containerElement)
  })
}

function unmountComponents() {
  Array.from(componentMountElements()).forEach((element) => {
    const { containerElementId } = element.dataset
    const containerElement = document.getElementById(containerElementId)

    ReactDOM.unmountComponentAtNode(containerElement)
  })
}

function resetComponentsAfterTurboPageCacheRestoring(event) {
  if (!event.state.turbo) {
    return
  }

  unmountComponents()
  mountComponents()
}

function start() {
  document.addEventListener('turbo:render', mountComponents)
  document.addEventListener('turbo:before-render', unmountComponents)
  // Reset React components after Turbo cache restoring in order to prevent issues with dirty cache
  window.addEventListener('popstate', resetComponentsAfterTurboPageCacheRestoring)
  mountComponents()
}

export function initialize() {
  document.addEventListener('DOMContentLoaded', start)
}
