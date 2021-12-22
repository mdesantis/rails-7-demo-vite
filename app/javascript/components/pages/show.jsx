import AuthenticityTokenField from '/components/application/_authenticity_token_field'
import Page from './_page'

import { editPagePath, pagePath, pagesPath } from '/routes'

export default function Show(props) {
  const page = props

  return (
    <>
      <Page page={page} />

      <div>
        <a href={editPagePath(page)}>Edit this page</a> | <a href={pagesPath()}>Back to pages</a>

        <form className="button_to" method="post" action={pagePath(page)}>
          <input type="hidden" name="_method" value="delete" autoComplete="off" />
          <button type="submit">Destroy this page</button>
          <AuthenticityTokenField />
        </form>
      </div>
    </>
  )
}
