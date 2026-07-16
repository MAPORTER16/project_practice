import { useEffect, useState } from 'react'
import type { User } from './types'
import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function loadUsers() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      setUsers(data)
    }

    loadUsers()
  }, [])

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
