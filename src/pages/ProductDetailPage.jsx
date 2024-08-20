import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Container, Card } from 'react-bootstrap'
import { toast } from 'react-toastify'

export default function ProductDetailPage () {
  let { state } = useLocation()
  const [product, setProduct] = useState(null)
  const navigate = useNavigate()
  const id = state?.id
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setProduct(response.data)
      })
      .catch(error => {
        console.error('Error fetching product details:', error)
      })
  }, [id])

  const addToCart = product => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    const updatedCart = [...cartItems, product]
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
    toast.success('Product added to cart!')

    navigate('/cart')
  }

  return (
    <Container className='mt-4'>
      <Card>
        <Card.Img variant='top' src={product?.image} height={600} />
        <Card.Body>
          <Card.Title>{product?.title}</Card.Title>
          <Card.Text>{product?.description}</Card.Text>
          <Card.Text>
            <strong>Price:</strong> ${product?.price}
          </Card.Text>
          <Card.Text>
            <strong>category:</strong> {product?.category}
          </Card.Text>
          <Card.Text>
            <strong>rating Count:</strong> {product?.rating?.count} {'  '}
            <strong>rating :</strong> {product?.rating?.rate}
          </Card.Text>
          <Button variant='primary' onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </Container>
  )
}
