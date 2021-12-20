export default function Errors(props) {
  const { errors } = props

  if (errors.length < 1) {
    return null
  }

  return (
    <div style={{ 'color': 'red' }}>
      <h2>{errors.length} {errors.length === 1 ? 'error' : 'errors'} prohibited this page from being saved:</h2>

      <ul>
        {errors.map((error, i) => <li key={i}>{error.fullMessage}</li>)}
      </ul>
    </div>
  )
}
