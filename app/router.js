const express = require('express');

const mainController = require('./controllers/mainController');
const bookmarksController = require('./controllers/bookmarksController');

const router = express.Router();

router.get('/', mainController.getCategories, mainController.homePage);

router.get('/article/:id', mainController.getCategories, mainController.articlePage);

router.get('/bookmarks', bookmarksController.bookmarksPage );
router.get('/bookmarks/add/:id', bookmarksController.addBookmark);
router.get('/bookmarks/delete/:id', bookmarksController.deleteBookmark);

module.exports = router;