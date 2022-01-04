import Form from './_form'

import { proofsOfConceptPagesPath } from '/routes'

export default function New(props) {
  const { page } = props

  return (
    <>
      <h1>New page</h1>

      <Form page={page} />

      <br />

      <div>
        <a href={proofsOfConceptPagesPath()}>Back to pages</a>
      </div>
    </>
  )
}
