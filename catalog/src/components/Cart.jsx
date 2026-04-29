import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, clearCart } from '../features/cartSlice'
import { Box, Button, Text, VStack } from '@chakra-ui/react'

export default function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.items)

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <Box borderWidth="1px" p={4} borderRadius="lg" minW="250px">
      <Text fontSize="xl" mb={3}>
        Корзина ({totalCount})
      </Text>

      <VStack align="stretch">
        {items.map(i => (
          <Box key={i.id}>
            {i.name} x {i.quantity}
            <Button
              size="xs"
              ml={2}
              colorScheme="red"
              onClick={() => dispatch(removeFromCart(i.id))}
            >
              удалить
            </Button>
          </Box>
        ))}
      </VStack>

      <Button
        mt={4}
        colorScheme="red"
        onClick={() => dispatch(clearCart())}
      >
        Очистить
      </Button>
    </Box>
  )
}