import React from 'react';
import ReactDOM from 'react-dom';
import {
  Container, Row, Button, FormControl, Form,
} from 'react-bootstrap';
import {
  InvalidInputAlert,
  validateLatitude,
  validateLongitude,
} from '../utils.jsx';

function fetchData() {
  const latitude = document.querySelector('#latitude').value;
  const longitude = document.querySelector('#longitude').value;
  if (validateLatitude(latitude) && validateLongitude(longitude)) {
    const latlng = encodeURIComponent(`${latitude},${longitude}`);
    fetch(`/api/reverse-geocode/json?latlng=${latlng}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length === 0) {
          ReactDOM.render(
            <div><h4>No addresses found.</h4></div>,
            document.querySelector('#results'),
          );
        } else {
          ReactDOM.render(
            <div>
              <h4>Addresses:</h4>
              <ul>
                {data.results.map((res) => (
                  <div>
                    <li>{res.formatted_address}</li>
                    <hr />
                  </div>
                ))}
              </ul>
            </div>,
            document.querySelector('#results'),
          );
        }
      });
  } else {
    ReactDOM.render(
      <InvalidInputAlert />,
      document.querySelector('#results'),
    );
  }
}

export default function ReverseGeocode() {
  return (
    <Container>
      <Row className="my-4">
        <Form className="justify-content-center" inline>
          <FormControl
            id="latitude"
            size="lg"
            type="text"
            placeholder="Enter latitude"
          />
          <FormControl
            id="longitude"
            size="lg"
            type="text"
            placeholder="Enter longitude"
          />
          <Button size="lg" onClick={fetchData} variant="outline-success">
            Search Address
          </Button>
        </Form>
      </Row>
      <Row className="my-4">
        <div id="results" />
      </Row>
    </Container>
  );
}
