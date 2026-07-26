import { useEffect, useState } from 'react'
import type { User } from './types'
import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadUsers() {
      try {
        
    
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        if (!response.ok) {
          throw new Error('Request failed')
        }

        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError("Something went wrong")
      }  finally {
        setIsLoading(false)
        
      }

    
    }

    loadUsers()
    
  }, [])

  if (isLoading) {
    return (
      <main className="app">
        <h1>Team Directory</h1>
        <p>Loading...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="app">
        <h1>Team Directory</h1>
        <p>{error}</p>
      </main>
    )
  }
  
  if (users.length === 0) {
    return (
       <main className="app">
        <h1>Team Directory</h1>
        <p>No users found</p>
      </main>
    )
  }

  
  return (
    <main className="app">
      <h1>Team Directory</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email} — {user.company.name}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
