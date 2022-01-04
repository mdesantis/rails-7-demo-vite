import './App.css'

import { useState } from 'react'

import logoEnergyYellow from './logoEnergyYellow.svg'
import logoSeagull from './logoSeagull.svg'

import { proofsOfConceptHelloReact1Path, proofsOfConceptHelloReact2Path } from '/routes'
import { navigator } from '@hotwired/turbo'

function App(props) {
  const [count, setCount] = useState(0)
  const [logoColor, setLogoColor] = useState(props.logoColor)

  const handleChangeLogoLinks = (event, newLogoColor) => {
    event.preventDefault()
    setLogoColor(newLogoColor)
    navigator.history.push(new URL(event.target.href))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logoColor === 'energyYellow' ? logoEnergyYellow : logoSeagull} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((oldCount) => oldCount + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link seagull"
            href={proofsOfConceptHelloReact1Path()}
            onClick={(e) => handleChangeLogoLinks(e, 'seagull')}
          >
            Logo Seagull
          </a>
          {' | '}
          <a
            className="App-link energyYellow"
            href={proofsOfConceptHelloReact2Path()}
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
