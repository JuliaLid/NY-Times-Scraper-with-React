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
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?max=5&api-key=" +
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
    url:"",
    id:""
  };

  // componentDidMount() {
  //   this.loadArticles();
  // };

  populateDatabase = (newArticle) => {
    console.log("Saving Article");  
    API.saveArticle (newArticle)
    // .then(res => this.loadArticles())
    // .then(res => console.log("Success!"))
    


  //     {
  //   API.saveBook({
  //   })
  //     .then(res => this.loadArticles())
  //     .catch(err => console.log(err));
   };

  // console.log(this.state.articles); 
       
  setArticleState = (articlesArray) => {
    
    for (let i = 0; i<articlesArray.length; i ++){

      //  console.log(articlesArray[i].headline.main); 
      //   console.log(articlesArray[i].pub_date); 
      //   console.log(articlesArray[0].web_url); 
      //   console.log(this.state.articles[0]._id); 
       let newArticle = {
          title:articlesArray[i].headline.main,
          date: articlesArray[i].pub_date,
          url:articlesArray[i].web_url,
          id:articlesArray[i]._id
       }
       console.log(newArticle);
       this.populateDatabase(newArticle);
    }
  }

  findArticles = query => {
    const queryURL = BASEURL + query;
    // console.log(query);
    // console.log(queryURL);
    return axios.get(queryURL)
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
     const fullQuery = this.state.topic + "&begin_date=" + this.state.startYear + "0101&end_date="+ this.state.endYear + "0101";
    this.findArticles(fullQuery)
      .then(res => {
        // console.log(res.data.response.docs);
        this.setState({ articles: res.data.response.docs })
        // console.log("line 104 ", this.state.articles);
        this.setArticleState(this.state.articles);
        // console.log(this.state.articles); 
        // console.log(this.state.articles[0].headline.main); 
        // console.log(this.state.articles[0].pub_date); 
        // console.log(this.state.articles[0].web_url); 
        // console.log(this.state.articles[0]._id); 
        // this.populateDatabase();
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
            {!this.state.articles.length ? (
                   <h3>No Results to Display</h3>
                ) :(          
               <List>
                 {this.state.articles.map(article => 
                  
                  <ListItem 
                      key={article._id}
                      title = {article.headline.main}
                      date = {article.pub_date}
                      href = {article.web_url}
                    >

                    <Link to={"/articles/" + article._id}/>
                  
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                 )}
              </List>
            )} 
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Article;
