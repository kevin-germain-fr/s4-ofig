const dataMapper = require('../dataMapper');

const mainController = {

  homePage: (request, response) => {
    if(!request.query.category) {
      dataMapper.getAllFigurines((error, figurines) => { 
        if(error) response.status(500).send("Erreur serveur !");
        else response.render('accueil', {figurines});
      });
    } else {
      dataMapper.getFigurinesByCat(request.query.category, (error, figurines) => {
        if(error) response.status(500).send("Erreur serveur !");
        else response.render('accueil', {figurines});
      })
    }
    
  },


  articlePage: (request, response) => {
    dataMapper.getOneFigurine(request.params.id, (error, figurine) => {
      if(error) response.status(500).send("Erreur serveur !");
      else {
        dataMapper.getReviews(request.params.id, (error2, reviews) => {
          if(error2) response.status(500).send("Erreur serveur !");
          else response.render('article', {figurine, reviews});
        })
      }
    });
  },


  getCategories: (request, response, next) => {
    dataMapper.getCategories((error, categories) => {
        if(error) response.status(500).send("Erreur serveur !");
        else {
          response.locals.categories = categories;
          next();
        }
    });
  }
};

module.exports = mainController;
