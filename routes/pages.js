const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/club', (req, res) => {
  res.render('club');
});

router.get('/training', (req, res) => {
  res.render('training');
});

router.get('/team', (req, res) => {
  res.render('team');
});

router.get('/stadium', (req, res) => {
  res.render('stadium');
});

router.get('/schedule', (req, res) => {
  res.render('schedule');
});

router.get('/events', (req, res) => {
  res.render('events');
});

router.get('/gallery', (req, res) => {
  res.render('gallery');
});

module.exports = router;
