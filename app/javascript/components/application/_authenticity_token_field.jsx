export default function AuthenticityTokenField() {
  const authenticityToken = document.querySelector('meta[name="csrf-token"]').content

  return (
    <input type="hidden" name="authenticity_token" value={authenticityToken} autoComplete="off" />
  )
}
