var express = require('express'),
    router = express.Router();

router.get('/:name', (req, res) => {
    var fighterName = req.params.name;
    res.render('firefighter', {
        title: fighterName + 'stats',
        name: fighterName
    });
});

module.exports = router;