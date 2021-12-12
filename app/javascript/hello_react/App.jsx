import { useState } from 'react'
import logoSeagull from './logoSeagull.svg'
import logoEnergyYellow from './logoEnergyYellow.svg'
import { navigator } from '@hotwired/turbo'
import './App.css'

function App(props) {
  const [count, setCount] = useState(0)
  const [logoColor, setLogoColor] = useState(props.logoColor)

  const handleChangeLogoLinks = (event, logoColor) => {
    event.preventDefault()
    setLogoColor(logoColor)
    navigator.history.push(new URL(event.target.href))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logoColor === 'energyYellow' ? logoEnergyYellow : logoSeagull} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link seagull"
            href="/hello_react"
            onClick={(e) => handleChangeLogoLinks(e, 'seagull')}
          >
            Logo Seagull
          </a>
          {' | '}
          <a
            className="App-link energyYellow"
            href="/hello_react_2"
            onClick={(e) => handleChangeLogoLinks(e, 'energyYellow')}
          >
            Logo Energy Yellow
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
