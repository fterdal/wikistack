const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/:tag', (req, res, next) => {
  let tag = req.params.tag;
  models.Page.findByTags([tag])
  .then( (pages) => {
    res.render('tagpage', {tag, pages});
  })
  .catch(console.error.bind(console))
})

router.post('/search', (req, res, next) => {
  let tags = req.body.tags.split(' ');
  models.Pages.findByTags(tags)
  .then( (pages) => {
    res.render('tagpage', {tags: tags, pages});
  })
})

module.exports = router;
