import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'

function Footer() {
  const currentyear=new Date().getFullYear()
  return (
    <footer>
      <Container><Row>
        <Col className="text-centre py-3">Copyright &copy; {currentyear} Proshop</Col>
      </Row></Container>
    </footer>
  )
}

export default Footer
