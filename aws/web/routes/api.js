var express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
   var payload = {
        status : "success",
        data : { message : "Test"}
    }
   res.json(payload);   
});

module.exports = router;