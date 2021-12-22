import Form from './_form'

import { pagePath, pagesPath } from '/routes'

export default function Edit(props) {
  const { page } = props

  return (
    <>
      <h1>Editing page</h1>

      <Form page={page} />

      <br />

      <div>
        <a href={pagePath(page)}>Show this page</a> | <a href={pagesPath()}>Back to pages</a>
      </div>
    </>
  )
}
