import ReactDOM from 'react-dom'

function componentMountElements() {
  return document.getElementsByClassName('react-component-mount')
}

const componentsEagerGlobImport = import.meta.globEager('/components/**/*.jsx')

function mountComponents() {
  Array.from(componentMountElements()).forEach((element) => {
    const { componentPath, containerElementId } = element.dataset
    const containerElement = document.getElementById(containerElementId)
    const props = JSON.parse(element.textContent)
    const fullComponentPath = `/components/${componentPath}.jsx`
    const component = componentsEagerGlobImport[fullComponentPath].default

    ReactDOM.render(component(props), containerElement)
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
