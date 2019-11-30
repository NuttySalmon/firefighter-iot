var express = require('express'),
    router = express.Router();

router.get('/:id', (req, res) => {
    var fighterName = req.params.id;
    res.render('firefighter', {
        title: fighterName + 'stats',
        id: fighterName
    });
});

module.exports = router;