import { StrictMode } from 'react'

import { newPagePath } from '/routes'

import Page from './_page'

export default function Index(props) {
  return (
    <StrictMode>
      <h1>Pages</h1>

      <div>
        {props.pages.map((page, i) => {
          return <Page page={page} key={i} />
        })}
      </div>

      <a href={newPagePath()}>New page</a>
    </StrictMode>
  )
}
