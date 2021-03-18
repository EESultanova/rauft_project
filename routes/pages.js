const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/training', (req, res) => {
  res.render('training');
});

module.exports = router;
