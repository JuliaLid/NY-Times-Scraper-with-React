import React from "react";
import { Col, Row, Container } from "../../components/Grid";

export const ListItem = props => (
  <li className="list-group-item">
  <Container>
      <Row>
      
        <Col size="xs-8 sm-9">
         
          {/* <p>Ingredients: {props.ingredients}</p> */}
          <a rel="noreferrer noopener" target="_blank" href={props.href}>
           <h3>{props.title}</h3>
          </a>
        </Col>
      </Row>
    </Container>
  </li>
);
