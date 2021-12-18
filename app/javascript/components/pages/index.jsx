import { StrictMode } from 'react'

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
                <a href={`/pages/${page.id}`}>Show this page</a>
              </p>
            </div>
          )
        })}
      </div>

      <a href="/pages/new">New page</a>
    </StrictMode>
  )
}
