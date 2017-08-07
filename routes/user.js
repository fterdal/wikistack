const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res, next) => {
  models.User.findAll({
    order: [
      ['name','ASC']
    ]
  })
  .then( (users) => {
    res.render('userindex', {users});
  })
})

router.get('/:id', (req, res, next) => {
  models.User.findOne( {
    where: {
      id: req.params.id
    }
  })
  .then( (user) => {
    // console.log('user: ', user);
    models.Page.findAll( {
      where: {
        authorId: req.params.id
      }
    })
    .then( (pages) => {
      res.render('userpage', {user, pages});
    })
  })
  .catch(console.error.bind(console))

})

module.exports = router;
