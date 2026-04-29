import { Select } from '@chakra-ui/react'

export default function Filter({ category, setCategory }) {
  return (
    <Select
      placeholder="Все категории"
      onChange={(e) => setCategory(e.target.value)}
      maxW="200px"
    >
      <option value="tech">Техника</option>
      <option value="clothes">Одежда</option> 
    </Select>
  )
}