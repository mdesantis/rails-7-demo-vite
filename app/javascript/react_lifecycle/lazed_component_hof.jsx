import { Suspense, lazy } from 'react'

export default function LazedComponentHOF(lazyImport) {
  const LazyComponent = lazy(lazyImport)

  return function LazedComponent(props) {
    return <Suspense fallback={null}><LazyComponent {...props} /></Suspense>
  }
}
