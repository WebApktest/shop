import React, { useState, useEffect } from 'react'
import { Container, ListGroup, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

export default function CartPage () {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    setCartItems(savedCartItems)
  }, [])

  const removeFromCart = index => {
    const updatedCart = cartItems.filter((_, i) => i !== index)
    setCartItems(updatedCart)
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
    toast.info('Item removed from cart')
  }

  const clearCart = () => {
    setCartItems([])
      localStorage.removeItem('cartItems')
       toast.warn('Cart cleared!')
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0)

  return (
    <Container className='mt-4'>
      <h3>Shopping Cart</h3>
      <ListGroup>
        {cartItems.map((item, index) => (
          <ListGroup.Item key={index}>
            <div className='d-flex justify-content-between'>
              <div>
                <h5>{item.title}</h5>
                <p>Price: ${item.price}</p>
              </div>
              <Button variant='danger' onClick={() => removeFromCart(index)}>
                Remove
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className='mt-4'>
        <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
        <Button variant='danger' onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
    </Container>
  )
}
