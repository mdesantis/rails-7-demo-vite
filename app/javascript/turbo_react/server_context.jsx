import { createContext, useState } from 'react'

const ServerContext = createContext(
  {
    'serverContext': {},
    'setServerContext': () => {
      // Placeholder function for value updating
    }
  }
)

ServerContext.displayName = 'ServerContext'

export function getServerContextData() {
  const element = document.getElementById('server-context')
  return JSON.parse(element.textContent)
}

export default ServerContext

export function ServerContextWrapper(props) {
  const [serverContext, setServerContext] = useState(getServerContextData())

  return (
    <ServerContext.Provider value={{ serverContext, setServerContext }}>
      {props.children}
    </ServerContext.Provider>
  )
}
