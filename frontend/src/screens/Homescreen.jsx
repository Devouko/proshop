import React from 'react';
import {useGetProductQuery} from '../slices/productApiSlice.js'
import Products from '../components/Products.jsx'
import { Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader.jsx'
import message from '../components/Message.jsx';

function Homescreen() {

 const {data: products,isLoading,error}=useGetProductQuery()
 console.log(products, isLoading, error);

 return (
  <>
    {isLoading ? (
      <Loader/>
    ) : error ? (
      <message variant="danger">{error?.data?.message || error.error}</message>
    ) : (
      <>
        <h1>Latest Products</h1>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Products product={product} />
            </Col>
          ))}
        </Row>
      </>
    )}
  </>
);
}


export default Homescreen;