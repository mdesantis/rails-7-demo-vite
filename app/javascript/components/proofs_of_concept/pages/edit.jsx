import Form from './_form'

import { proofsOfConceptPagePath, proofsOfConceptPagesPath } from '/routes'

export default function Edit(props) {
  const { page } = props

  return (
    <>
      <h1>Editing page</h1>

      <Form page={page} />

      <br />

      <div>
        <a href={proofsOfConceptPagePath(page)}>Show this page</a>
        {' | '}
        <a href={proofsOfConceptPagesPath()}>Back to pages</a>
      </div>
    </>
  )
}
