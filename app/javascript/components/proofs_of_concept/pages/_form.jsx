import { useState } from 'react'

import AuthenticityTokenField from '/components/application/_authenticity_token_field'
import Errors from './form/_errors'

import { proofsOfConceptPagePath, proofsOfConceptPagesPath } from '/routes'

export default function Form(props) {
  const { page } = props
  const newRecord = !page.id
  const formAction = newRecord ? proofsOfConceptPagesPath() : proofsOfConceptPagePath(page)

  const [author, setAuthor] = useState(page.author ?? '')
  const [content, setContent] = useState(page.content ?? '')

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  return (
    <form action={formAction} acceptCharset="utf-8" method="post" data-remote="true">
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
        <input type="submit" name="commit" value={newRecord ? 'Create Page' : 'Update Page'} />
      </div>
    </form>
  )
}
