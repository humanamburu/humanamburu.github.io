var Swipe = require('./Controller/Swipe'),
    ResizeCalculator = require('./Controller/ResizeCalculator'),
    Layout = require('./Views/Layout'),
    Search = require('./Controller/Search'),
    $ = require('./lib/JQappend'),
    load = require('./Controller/LoadVideos');


$('body').append(Layout());

var swipe = new Swipe(),
    resizer = new ResizeCalculator();

swipe.set();
resizer.set();

var search = new Search();
search.init(function (event, value) {
    load(value);
});