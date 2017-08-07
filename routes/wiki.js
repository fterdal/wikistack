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
      userId: userArray[0].id,
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
  models.Page.findOne({
    where: {
      urlTitle: req.params.urltitle
    }
  })
  .then( (page) => {
     page.getAuthor().then( (author) => {
       res.render('wikipage', {page: page, author: author});
    })
  })
  .catch( (err) => {
    console.log(err)
  })
});

module.exports = router;
