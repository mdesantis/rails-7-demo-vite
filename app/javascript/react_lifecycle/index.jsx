import ReactDOM from 'react-dom'

import { StrictMode } from 'react'

import { ServerContextWrapper } from './server_context'

import { session } from '@hotwired/turbo'

export default class ReactLifecycle {
  constructor(options) {
    this.includeServerContext = options.includeServerContext
    this.strictMode = options.strictMode

    this.componentsEagerGlobImport = import.meta.globEager('/components/**/*.jsx')
  }

  componentMountElements() {
    return document.getElementsByClassName('react-component-mount')
  }

  fetchActionElements(newBodyElement) {
    return newBodyElement.getElementsByClassName('react-action')
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

      this.render(Component, props, containerElement)
    })
  }

  render(Component, props, containerElement) {
    if (this.strictMode && this.includeServerContext) {
      ReactDOM.render(
        <StrictMode><ServerContextWrapper><Component {...props} /></ServerContextWrapper></StrictMode>, containerElement
      )
    } else if (this.strictMode) {
      ReactDOM.render(<StrictMode><Component {...props} /></StrictMode>, containerElement)
    } else if (this.includeServerContext) {
      ReactDOM.render(<ServerContextWrapper><Component {...props} /></ServerContextWrapper>, containerElement)
    } else {
      ReactDOM.render(<Component {...props} />, containerElement)
    }
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

  fetchServerContext() {
    if (!this.includeServerContext) return

    const element = document.getElementById('server-context')
    this.serverContext = JSON.parse(element.textContent)
  }

  mount() {
    this.fetchServerContext()
    this.mountComponents()
  }

  unmount() {
    this.unmountComponents()
  }

  dispatchActions(elements) {
    Array.from(elements).forEach((element) => {
      const updatedData = JSON.parse(element.textContent)
      const event = new CustomEvent('reactAction', { 'detail': updatedData })

      document.dispatchEvent(event)
      element.remove()
    })
  }

  setActionElements(newBodyElement) {
    this.actionElements = this.fetchActionElements(newBodyElement)
  }

  cancelCurrentTurboRender() {
    const { view } = session

    // Implementation copied from: https://github.com/hotwired/turbo/blob/201f8b3260bfbc15635d24c9961ff027747fb046/src/core/view.ts#L88-L90
    delete view.renderer
    // eslint-disable-next-line no-undefined
    view.resolveRenderPromise(undefined)
    delete view.renderPromise
  }

  start() {
    document.addEventListener('turbo:render', () => {
      this.mount()
    })
    document.addEventListener('turbo:before-render', (event) => {
      event.preventDefault()

      const actionElements = this.fetchActionElements(event.detail.newBody)

      if (actionElements.length === 0) {
        event.detail.resume()
        this.unmount()
      } else {
        // Turbo doesn't support officially render canceling, but we need it because otherwise the current rendering
        // remains as stale and its dirty state creates issues on next renderings.
        this.cancelCurrentTurboRender()
        this.dispatchActions(actionElements)
      }
    })
    // Reset React components after Turbo cache restoring in order to prevent issues with dirty cache
    window.addEventListener('popstate', (event) => {
      this.resetComponentsAfterTurboPageCacheRestoring(event)
    })
    this.mount()
  }

  initialize() {
    document.addEventListener('DOMContentLoaded', () => {
      this.start()
    })
  }
}
