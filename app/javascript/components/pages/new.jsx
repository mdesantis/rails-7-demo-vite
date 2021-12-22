import Form from './_form'

import { pagesPath } from '/routes'

export default function New(props) {
  const { page } = props

  return (
    <>
      <h1>New page</h1>

      <Form page={page} />

      <br />

      <div>
        <a href={pagesPath()}>Back to pages</a>
      </div>
    </>
  )
}
