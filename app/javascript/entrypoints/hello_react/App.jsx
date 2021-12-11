import { useState } from 'react'
import logoSeagull from './logoSeagull.svg'
import logoEnergyYellow from './logoEnergyYellow.svg'
import './App.css'

function App({ logoColor }) {
  const [count, setCount] = useState(0)

  const logo = logoColor === 'energyYellow' ? logoEnergyYellow : logoSeagull

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
            data-turbo="false"
          >
            Logo Seagull
          </a>
          {' | '}
          <a
            className="App-link energyYellow"
            href="/hello_react_2"
            data-turbo="false"
          >
            Logo Energy Yellow
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
