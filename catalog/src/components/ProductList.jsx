import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cartSlice'
import {
  Box,
  Button,
  Text,
  Image,
  Badge,
  Flex,
  VStack
} from '@chakra-ui/react'

export default function ProductList({ products }) {
  const dispatch = useDispatch()

  return (
    <Flex
      gap={4}
      overflowX="auto"
      p={2}
    >
      {products.map(p => (
        <Box
          key={p.id}
          minW="220px"
          borderWidth="1px"
          borderRadius="xl"
          p={4}
          boxShadow="md"
          _hover={{ transform: 'scale(1.03)' }}
          transition="0.2s"
        >
          <VStack align="start" spacing={3}>


            <Text fontWeight="bold">{p.name}</Text>

            <Badge colorScheme={p.category === 'tech' ? 'blue' : 'green'}>
              {p.category}
            </Badge>

            <Text fontWeight="bold">${p.price}</Text>

            <Button
              colorScheme="teal"
              width="100%"
              onClick={() => dispatch(addToCart(p))}
            >
              В корзину
            </Button>

          </VStack>
        </Box>
      ))}
    </Flex>
  )
}