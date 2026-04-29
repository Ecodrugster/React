import { Box, Heading, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { products as data } from './data/products'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Search from './components/Search'
import Filter from './components/Filter'

export default function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const filtered = data
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => category ? p.category === category : true)

  return (
    <Box p={5}>
      <Heading mb={5}>Каталог товаров</Heading>

      <Flex gap={3} mb={5}>
        <Search search={search} setSearch={setSearch} />
        <Filter category={category} setCategory={setCategory} />
      </Flex>

      <Flex gap={10} align="flex-start">
        <ProductList products={filtered} />
        <Cart />
      </Flex>
    </Box>
  )
}