const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res, next) => {
  res.render('searchtags');
})

router.post('/', (req, res, next) => {
  let tags = req.body.tags.split(' ');
  models.Pages.findByTags(tags)
  .then( (pages) => {
    res.render('tagpage', {tags: tags, pages});
  })
})

module.exports = router;
