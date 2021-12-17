import { lazy, Suspense } from 'react'

export default function LazedComponent(lazyImport) {
  const LazyComponent = lazy(lazyImport)

  return function LazedComponent(props) {
    return <Suspense fallback={null}><LazyComponent {...props} /></Suspense>
  }
}
