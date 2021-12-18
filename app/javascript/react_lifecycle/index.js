import ReactDOM from 'react-dom'

import lazedComponentHOF from './lazed_component_hof'

function componentMountElements() {
  return document.getElementsByClassName('react-component-mount')
}

function mountComponents() {
  Array.from(componentMountElements()).forEach((element) => {
    const { componentPath, containerElementId } = element.dataset
    const containerElement = document.getElementById(containerElementId)
    const props = JSON.parse(element.textContent)
    const componentsGlobImport = import.meta.glob('/components/**/*.jsx')
    const fullComponentPath = `/components/${componentPath}.jsx`
    const lazyImport = componentsGlobImport[fullComponentPath]

    if (!lazyImport) {
      throw new Error(
        `the file that should define the React component at path "${fullComponentPath}" was not found; perhaps you ` +
        'misspelled it?'
      )
    }

    const lazedComponent = lazedComponentHOF(lazyImport)

    ReactDOM.render(lazedComponent(props), containerElement)
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
