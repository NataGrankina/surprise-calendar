var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();

var eventModel = require("./model/event");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

router.route("/events")
    .get(function(req, res) {
        var response = {};
        eventModel.find({}, function(err, data) {
            if (err) {
                response = {
                	"error" : true, 
                	"message" : "Error fetching data"
                };
            } else {
                response = {
                	"error" : false, 
                	"data" : data
                };
            }
            res.json(response);
        });
    })
    .post(function(req, res) {
        var event = new eventModel();
        var response = {};

        event.description = req.body.description;
        event.start = req.body.start;
        event.end = req.body.end;
        event.budget = req.body.budget || 0;

        event.save(function(err) {
            if (err) {
                response = { 
                	"error" : true, 
                	"message" : "Error adding data" 
                };
            } else {
                response = { 
                	"error" : false, 
                	"data" : event 
                };
            }
            res.json(response);
        });
    });
    router.route("/events/:id")
    .delete(function(req, res) {
        var response = {};
        eventModel.findById(req.params.id, function(err, data) {
            if (err) {
                response = {
                	"error" : true,
                	"message" : "Error fetching data"
                };
            } else {
                eventModel.remove({ _id : req.params.id }, function(err) {
                    if(err) {
                        response = { 
                        	"error" : true, 
                        	"message" : "Error deleting data" 
                        };
                    } else {
                        response = {
                        	"error" : false, 
                        	"message" : "Data associated with "+ req.params.id + "is deleted"
                        };
                    }
                    res.json(response);
                });
            }
        });
    })


app.use('/', router);

app.listen(3000);
console.log("Listening to PORT 3000");