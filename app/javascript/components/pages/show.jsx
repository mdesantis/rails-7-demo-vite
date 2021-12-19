import { StrictMode } from 'react'

import { editPagePath, pagePath, pagesPath } from '/routes'

import Page from './_page'

export default function Show(props) {
  const page = props

  const authenticityToken = document.querySelector('meta[name="csrf-token"]').content

  return (
    <StrictMode>
      <Page page={page} />

      <div>
        <a href={editPagePath(page)}>Edit this page</a> | <a href={pagesPath()}>Back to pages</a>

        <form className="button_to" method="post" action={pagePath(page)}>
          <input type="hidden" name="_method" value="delete" autoComplete="off" />
          <button type="submit">Destroy this page</button>
          <input type="hidden" name="authenticity_token" value={authenticityToken} autoComplete="off" />
        </form>
      </div>
    </StrictMode>
  )
}
