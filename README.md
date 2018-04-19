# NY-Times-Scraper-with-React

## Project Overview
* Create a full-stack React-based web app that lets users search New York Times articles.
* Create React components, work with helper/util functions, and utilize the React mounting lifecycle to query and display articles based on user searches.
* Users have to be able to find articles, save and delete them from database.
* Use Mongoose for object-modeling.
* Follow the MVC design pattern.


## Link to Deployed App
* [New York Times Article Scraper](https://scrape-nyt-articles.herokuapp.com/articles/)

## Cloning instructions
1. Clone the repo.
2. Run `yarn install` to install back-end dependencies in the root app folder on the local machine.
3. `cd` to the `client` folder and run `yarn install` to install front-end dependencies on the local machine.
4. Use `mongod` and `mongo` commands to start the MongoDB server.
    * Collection and documents will be automatically created when you you save articles.
5. Use bash terminal to run command `yarn start` to initialize the server and render React components
    * A browser window will automatically open.
6. Start interacting with the application. 


## Technology Stack
* Create-React-App
* CSS3
* Bootstrap 4
* JavaScript 
* node.js
* npm packages
    * [`express`](https://www.npmjs.com/package/mysql) to handle routing.
    * [`body-parser`](https://www.npmjs.com/package/body-parser): body parsing middleware.
    * [`mongoose`l](https://www.npmjs.com/package/mongoose) for object modeling  in an asynchronous environment.
     * [`axios`](https://www.npmjs.com/package/axios) for making `http` requests from node.js
* [Heroku](https://www.heroku.com/) to deploy the app.
    * mLab MongoDB add-on to the Heroku app.
 