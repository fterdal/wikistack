const express = require('express');
const router = express.Router();
const wiki = require('./wiki');
const user = require('./user');
const tags = require('./tags');
const models = require('../models');

router.get('/', (req, res, next) => {
  models.Page.findAll()
  .then((pages) => {
    res.render('index', {pages});
  })
})

router.use('/wiki', wiki);
router.use('/users', user);
router.use('/search', tags);

module.exports = router;
