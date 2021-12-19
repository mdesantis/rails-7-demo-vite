import { StrictMode } from 'react'

import { newPagePath, pagePath } from '/routes'

export default function Index(props) {
  return (
    <StrictMode>
      <h1>Pages</h1>

      <div>
        {props.pages.map((page, i) => {
          return (
            <div key={i}>
              <p>
                <strong>Author:</strong>{' '}
                {page.author}
              </p>

              <p>
                <strong>Content:</strong>{' '}
                {page.content}
              </p>

              <p>
                <a href={pagePath(page)}>Show this page</a>
              </p>
            </div>
          )
        })}
      </div>

      <a href={newPagePath()}>New page</a>
    </StrictMode>
  )
}
