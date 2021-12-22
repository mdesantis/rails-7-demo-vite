import Page from './_page'

import { newPagePath } from '/routes'

export default function Index(props) {
  return (
    <>
      <h1>Pages</h1>

      <div>
        {props.pages.map((page, i) => {
          return <Page page={page} key={i} />
        })}
      </div>

      <a href={newPagePath()}>New page</a>
    </>
  )
}
