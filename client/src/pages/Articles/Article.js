import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import axios from 'axios';
const APIKEY = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  APIKEY + "&q=";

class Article extends Component {
  state = {
    articles:[],
    result:{},
    topic: "",
    startYear: "",
    endYear: "",
    title:"",
    date: "",
    url:""
  };

  // componentDidMount() {
  //   this.loadArticles();
  // };

  findArticles = query => {
    const queryURL = BASEURL + query;
    console.log(queryURL);
    return axios.get(queryURL)
    //  console.log(queryURL)
    
  
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", date: "", url: "" })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.Article(id)
      .then(res => this.deleteArticle())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
     event.preventDefault();
    this.findArticles(this.state.topic)
      .then(res => {
        console.log(res.data);
        this.setState({ articles: res.data })
        console.log(this.state.articles); 
      })  
      .catch(err => console.log(err));
 
       
    // if (this.state.topic )
    //   // && this.state.startYear && this.state.endYear)
    //    {
    //   API.findArticles({
    //     topic: this.state.title
    //     // ,
    //     // date: this.state.date,
    //     // url: this.state.url
    //   })
    //     .then(res => 
    //       this.loadArticles())
    //     .catch(err => console.log(err));
    // }
  };
  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.topic )
  //     // && this.state.startYear && this.state.endYear)
  //      {
  //     API.saveArticle({
  //       title: this.state.title,
  //       date: this.state.date,
  //       url: this.state.url
  //     })
  //       .then(res => this.loadArticles())
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>New York Times Article Scrubber</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start Year (required)"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="End Year (required)"
              />
              
              <FormBtn
                disabled={!(this.state.topic)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                     
                        {article.title} , {article.date} , {article.url}
                      
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Article;
