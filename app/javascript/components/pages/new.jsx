import { StrictMode } from 'react'

import AuthenticityTokenField from '/components/application/_authenticity_token_field'

import { pagesPath } from '/routes'

export default function New(props) {
  const page = props

  return (
    <StrictMode>
      <h1>New page</h1>

      <form action={pagesPath()} acceptCharset="UTF-8" method="post">
        <AuthenticityTokenField />

        <div>
          <label style={{ 'display': 'block' }} htmlFor="page_author">Author</label>
          <input type="text" name="page[author]" id="page_author" value={page.author} />
        </div>

        <div>
          <label style={{ 'display': 'block' }} htmlFor="page_content">Content</label>
          <textarea name="page[content]" id="page_content" value={page.content}></textarea>
        </div>

        <div>
          <input type="submit" name="commit" value="Create Page" data-disable-with="Create Page" />
        </div>
      </form>

      <br />

      <div>
        <a href={pagesPath()}>Back to pages</a>
      </div>
    </StrictMode>
  )
}
