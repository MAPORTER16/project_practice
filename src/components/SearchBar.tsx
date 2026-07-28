export interface SearchBarProps {
  query: string
  onQueryChange: (query: string) => void
}

function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div>
      <label htmlFor="search">Search by name or email</label>
      <input
        id="search"
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
