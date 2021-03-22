const dataMapper = require('../dataMapper');

const bookmarksController = {

  bookmarksPage: (request, response) => {
    response.render('favoris', {bookmarks:request.session.bookmarks});
  },

  addBookmark: (request, response) => {
    const id = Number(request.params.id);
    const checkFigurine = request.session.bookmarks.find(fig => fig.id === id);
    if(!checkFigurine) {
      dataMapper.getOneFigurine(id, (error, figurine) => {
        if(error) response.status(500).send("Erreur serveur !");
        else {
          request.session.bookmarks.push(figurine);
          response.redirect('/bookmarks');
        }
      })
    } else response.redirect('/bookmarks');
    
  },

  deleteBookmark: (request, response) => {
    const id = Number(request.params.id);

    request.session.bookmarks = request.session.bookmarks.filter(fig => fig.id !== id)
    response.redirect('/bookmarks');
  }

};

module.exports = bookmarksController;
