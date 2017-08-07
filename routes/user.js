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
  console.log(req.params.id);
  models.User.findOne( {
    where: {
      id: req.params.id
    },
    include: [ models.Page ]
  })
  .then( (user) => {
    res.render('userpage', {user});
  })
  .catch(console.error.bind(console))

})

module.exports = router;
