import type { User } from '../types'
import UserCard from './UserCard'

export interface UserListProps {
  users: User[]
}

function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return <p>No matches found</p>
  }

  return (
    <ul>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </ul>
  )
}

export default UserList
