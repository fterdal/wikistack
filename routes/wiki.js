const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect('/');
})

router.get('/add', (req, res, next) => {
  res.render('addpage');
})

router.post('/', (req, res, next) => {
  console.log(req.body);
  res.json(req.body);
})

module.exports = router;
