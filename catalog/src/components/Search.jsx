import { Input } from '@chakra-ui/react'

export default function Search({ search, setSearch }) {
  return (
    <Input
      placeholder="Поиск..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      maxW="300px"
    />
  )
}