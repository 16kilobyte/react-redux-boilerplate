var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.json([
    {
      id: '1',
      name: 'A'
    },
    {
      id: '2',
      name: 'B'
    },
    {
      id: '3',
      name: 'C'
    }
  ])
})

router.get('/1', function (req, res) {
  res.json([
    {
      id: '1',
      name: 'A'
    }
  ])
})

module.exports = router
