import type { User } from '../types'

export interface UserCardProps {
  user: User
}

function UserCard({ user }: UserCardProps) {
  return (
    <li>
      {user.name} — <a href={`mailto:${user.email}`}>{user.email}</a> — {user.company.name}
    </li>
  )
}

export default UserCard
