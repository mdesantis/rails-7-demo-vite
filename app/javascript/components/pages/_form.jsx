import { useState } from 'react'

import AuthenticityTokenField from '/components/application/_authenticity_token_field'
import Errors from './form/_errors'

import { pagePath, pagesPath } from '/routes'

export default function Form(props) {
  const { page } = props

  const newRecord = !page.id

  const [author, setAuthor] = useState(page.author ?? '')
  const [content, setContent] = useState(page.content ?? '')

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  const submitValue = newRecord ? 'Create Page' : 'Update Page'

  return (
    <form action={newRecord ? pagesPath() : pagePath(page)} acceptCharset="UTF-8" method="post" data-remote="true">
      {newRecord || <input type="hidden" name="_method" value="patch" autoComplete="off" />}
      <AuthenticityTokenField />

      <Errors errors={page.errors} />

      <div>
        <label style={{ 'display': 'block' }} htmlFor="page_author">Author</label>
        <input type="text" name="page[author]" id="page_author" value={author} onChange={handleAuthorChange} />
      </div>

      <div>
        <label style={{ 'display': 'block' }} htmlFor="page_content">Content</label>
        <textarea name="page[content]" id="page_content" value={content} onChange={handleContentChange} ></textarea>
      </div>

      <div>
        <input type="submit" name="commit" value={submitValue} data-disable-with={submitValue} />
      </div>
    </form>
  )
}