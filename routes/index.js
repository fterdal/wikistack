const express = require('express');
const router = express.Router();
const wiki = require('./wiki');
const user = require('./user');

router.get('/', (req, res, next) => {
  res.render('index');
})

router.use('/wiki', wiki);
router.use('/users', user);

module.exports = router;
