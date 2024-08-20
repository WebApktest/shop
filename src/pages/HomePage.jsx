import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function HomePage () {
  const [productData, setProductData] = useState([])
  const navigation = useNavigate()
  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        setProductData(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error)
      })
  }, [])

  const detailsPage = product => {
    navigation('product', { state: { id: product.id } })
  }
  return (
    <Container className='mt-4'>
      <Row>
        {productData && productData.map(product => (
          <Col key={product.id} sm={12} md={6} lg={4} className='mb-4'>
            <div onClick={() => detailsPage(product)}>
              <Card>
                <Card.Img variant='top' src={product?.image} height={400} />
                <Card.Body>
                  <Card.Title>{product?.title}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ${product?.price}
                  </Card.Text>
                  <Card.Text>
                    <strong>category:</strong> {product?.category}
                  </Card.Text>
                  <Card.Text>
                    <strong>rating Count:</strong> {product?.rating?.count}{' '}
                    {'  '}
                    <strong>rating :</strong> {product?.rating?.rate}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
