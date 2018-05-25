var express = require('express');
var router = express.Router();
var iftttKey = require('./config').iftttKey;



const data = require('../data.json');

var request = require('request');


function triggerAlert(data) {
    request({
        headers: {
            'IFTTT-Service-Key': iftttKey,
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
            'X-Request-ID': '{{random_uuid}}'
        },
        uri: 'https://realtime.ifttt.com/v1/notifications',
        body: formData,
        method: 'POST'
    }, function (err, res, body) {
        //it works!
    });
}

request.post(
    '',
    {json: {key: 'value'}},
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);


router.get('/', function (req, res, next) {
    const models = data.models;
    res.status(200).json({models});
});

router.post('/', function (req, res, next) {
    console.log("setup - body", req.body);
    const cars = data.cars;
    var limit = (req.body.limit !== undefined && req.body.limit !== null && req.body.limit !== '')
        ? req.body.limit : 50; // IF limit is present, just send that much
    var myData = [];
    // Add extra fields
    for (var i = 0; i < Math.min(limit, 3); i++) {
        var myObj = cars[i];
        var timestamp = Math.round(Date.now() / 1000); // To get seconds
        var meta = {
            "id": cars[i].id,
            "key": cars[i].id,
            "timestamp": timestamp
        };
        var created_at = new Date();
        myObj['meta'] = meta;
        myObj['created_at'] = created_at.toISOString();
        myData.push(myObj);
    }
    // reverse to send data ordered by timestamp descending
    res.status(200).json({"data": myData.reverse()});
});
Å
module.exports = router;