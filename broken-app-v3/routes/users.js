const User = require('../user');
const express = require('express');
let axios = require('axios');

const router = express.Router();

router.post('', (req, res, next) => {
  out = [];
  (async () => {
    for (let i=0; i<req.body.developers.length; i++) {
      value = req.body.developers[i]

      try {
        r =  await axios.get(`https://api.github.com/users/${value}`);
        out.push( new User(value, r.data.bio) );
      } catch ( error ){
        console.log(error.message);
      }
    }
     return res.json(out);
  })()
  
});


module.exports = router;