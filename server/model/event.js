var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/surprise-calendar');
var eventSchema = new mongoose.Schema({
    id: Number,
    description: String,
    budget: Number,
    start: Object,
    end: Object
});

module.exports = mongoose.model('CalendarEvent', eventSchema);
