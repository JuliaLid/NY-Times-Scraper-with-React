import React from "react";
// import { Col, Row, Container } from "../../components/Grid";
// import { SaveBtn} from "../../components/SaveBtn";

export const ListItem = props => (
  
  <li className="list-group-item">
    {props.children}
    <a rel="noreferrer noopener" target="_blank" href={props.href}>
           <h4>{props.title}</h4>
          </a>
    <p>{props.date}</p>
  </li>
);
