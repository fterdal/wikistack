const express = require('express');
const models = require('../models')
const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect('/');
})

router.get('/add', (req, res, next) => {
  res.render('addpage');
})

router.post('/', (req, res, next) => {
  return models.User.findOrCreate({
    where: {
      email: req.body['author-email'],
      name: req.body['author-name']
    }
  })
  .then((userArray) => {
    return models.Page.create({
      title: req.body.title,
      content: req.body['page-content'],
      authorId: userArray[0].id,
      // userId: userArray[0].id,
      tags: req.body.tags.split(" "),
      status: req.body['page-status']
    });
  })
  .then((row) => {
    res.redirect(row.route)
  })
  .catch( (err) => {
    console.error(err);
    res.sendStatus(400);
  });

})

router.get('/:urltitle', function(req, res, next) {
  return models.Page.findOne({
    where: {
      urlTitle: req.params.urltitle,
    },
    include: [
      {model: models.User, as: 'author'}
    ]
  })
  .then( (page) => {
    res.render('wikipage', {page: page});
  })
  .catch( (err) => {
    console.log(err)
  })
});

module.exports = router;
