import axios from "axios";
const APIKEY = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  APIKEY + "&q=";

export default {
  
  // Gets all books
  getArticles: function() {
    console.log("line 20 - getting articles")
    return axios.get("/api/articles");
  },

  findArticles: function(query){
    console.log(BASEURL+query);
    return axios.get("/api/articles/", {params: {q:query}})
    // return axios.get(BASEURL,query);
  },
   // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves an article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
