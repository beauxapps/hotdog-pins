
import React from 'react';
import { Button, Control, Container, Row, Col  } from 'react-bootstrap';
import '../App.css';
import HotDogPinAsset1 from '../assets/HotDogPinAsset 2.png';


const HotdogPinImageandTitle = ({ onSubtractPin, quantity, onAddPin }) => {
  return (
    <>
    <Container>
    <Col className="center">
    <img src={HotDogPinAsset1} className="hotdogPinImage" alt="hotdogPinImage" />
    <Row className="center">
      I'm a hotdog pin order form!
    </Row>
    </Col>
    </Container>
    </>
  );
};

export default HotdogPinImageandTitle;
