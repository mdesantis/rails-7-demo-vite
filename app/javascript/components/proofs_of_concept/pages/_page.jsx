import { proofsOfConceptPagePath } from '/routes'

export default function Page(props) {
  const { page } = props

  return (
    <div>
      <p>
        <strong>Author:</strong> {page.author}
      </p>

      <p>
        <strong>Content:</strong> {page.content}
      </p>

      <p>
        <a href={proofsOfConceptPagePath(page)}>Show this page</a>
      </p>
    </div>
  )
}
