import ReactDOM from 'react-dom'

import { StrictMode } from 'react'

export default class ReactLifecycle {
  constructor(options) {
    this.strictMode = options.strictMode

    this.componentsEagerGlobImport = import.meta.globEager('/components/**/*.jsx')
  }

  componentMountElements() {
    return document.getElementsByClassName('react-component-mount')
  }

  mountComponents() {
    Array.from(this.componentMountElements()).forEach((element) => {
      const { componentPath, containerElementId } = element.dataset
      const containerElement = document.getElementById(containerElementId)
      const props = JSON.parse(element.textContent)
      const fullComponentPath = `/components/${componentPath}.jsx`
      const eagerImport = this.componentsEagerGlobImport[fullComponentPath]

      if (!eagerImport) {
        throw new Error(
          `the file that should define the React component at path "${fullComponentPath}" was not found; perhaps you ` +
          'misspelled it?'
        )
      }

      const Component = eagerImport.default

      if (this.strictMode) {
        ReactDOM.render(<StrictMode><Component {...props} /></StrictMode>, containerElement)
      } else {
        ReactDOM.render(<Component {...props} />, containerElement)
      }
    })
  }

  unmountComponents() {
    Array.from(this.componentMountElements()).forEach((element) => {
      const { containerElementId } = element.dataset
      const containerElement = document.getElementById(containerElementId)

      ReactDOM.unmountComponentAtNode(containerElement)
    })
  }

  resetComponentsAfterTurboPageCacheRestoring(event) {
    if (!event.state.turbo) return

    this.unmountComponents()
    this.mountComponents()
  }

  start() {
    document.addEventListener('turbo:render', () => {
      this.mountComponents()
    })
    document.addEventListener('turbo:before-render', () => {
      this.unmountComponents()
    })
    // Reset React components after Turbo cache restoring in order to prevent issues with dirty cache
    window.addEventListener('popstate', (e) => {
      this.resetComponentsAfterTurboPageCacheRestoring(e)
    })
    this.mountComponents()
  }

  initialize() {
    document.addEventListener('DOMContentLoaded', () => {
      this.start()
    })
  }
}
