import { useParams } from 'react-router-dom';
import Ratings from '../components/Ratings';
import { Link,useNavigate } from 'react-router-dom';
import { Form,Col, Row, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useGetProductDetails } from '../slices/productApiSlice';  // Correct hook import
import Loader from '../components/Loader';
import Message from '../components/Message';  // Correct import (capitalize M)
import { useState } from 'react';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';


const dispatch=useDispatch()
const navigate=useNavigate()
const ProductScreen = () => {
  const { id: productId } = useParams();  // Get the product ID from the route


  // Destructure `useGetProductDetails` correctly
  const { data: product, isLoading, error } = useGetProductDetails(productId);
  const addToCartHandler=()=>{
    dispatch(addToCart({...product,qty}))
    navigate('/cart')
  }

  const {qty,setQty}=useState(1)
  {[...Array (product.countInStock).keys()]}


  console.log(isLoading, product, error);  // Debugging

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        // Display error message properly using `Message` component
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Ratings value={product?.rating} text={`${product?.numReviews || 0} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                  Product Description: {product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>{product?.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock>0 && (<ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                      <Form.Control as='select' value={qty} onChange={(e)=>setQty(Number (e.target.value))}>
                        {[...Array (product.countInStock).keys()].map((x)=>(<option key={x+1} value={x+1}>{x+1}</option>))} 

                      </Form.Control>
                      
                      </Col>

                    </Row>
                    
                    </ListGroup.Item>
                    )}
                    



                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      type='button'
                      disabled={product?.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>


                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
