var express = require('express'),
    router = express.Router();

router.get('/:id', (req, res) => {
    var fighterName = req.params.id;
    res.render('firefighter', {
        title: fighterName + 'stats',
        id: fighterName,
        fields: [
            {name: 'Temperature', tag:'temp'},
            {name: 'Humidity', tag:'hum'},
            {name: 'Pressure', tag:'pres'},
            {name: 'O2 Level', tag:'o2'},
            {name: 'CO concentration', tag:'co'},
            {name: 'HCN concentration', tag:'hcn'},
            {name: 'Heart rate', tag:'heart'},
            {name: 'Movement', tag:'mov'}
        ]
    });
});

module.exports = router;