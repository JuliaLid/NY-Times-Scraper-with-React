import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import SaveBtn from "../../components/SaveBtn";
// import Jumbotron from "../../components/Jumbotron";
import { List, ListItem } from "../../components/List";
import API from "../../utils/API";

class Saved extends Component {
  state = {
    articles: []
  };

  //Load saved articles on load
  componentDidMount() {
    this.loadArticles()
  }
  
  //Load articles from database
  loadArticles = () => {
    console.log("I'm triggered")
    API.getArticles()
   .then(res => this.setState({ articles: res.data}))
   .catch(err => console.log(err));
  };

  //Delete an article from DB using MongoDB Object ID
  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };
  //Render 
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
          {!this.state.articles.length ? (
                   <h3>No Results to Display</h3>
                ) :(          
               <List>
                 {this.state.articles.map(article =>( 
                  
                  <ListItem 
                      key={article._id} 
                      href= {article.url}
                      title = {article.title}  
                      date={article.date}                  
                      >
                      
                    <SaveBtn 
                    buttonstyle={"btn btn-primary float-right"}
                    buttontext={"Delete"}
                    id = {article._id}
                    onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                 ))}
              </List>
            )} 
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Articles</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
