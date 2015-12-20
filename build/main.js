var Layout = require('./Views/Layout'),
    Search = require('./Controller/Search'),
    $ = require('./lib/JQappend'),
    Loader = require('./Controller/Loader'),
    Swipe = require('./Controller/Swipe');

var loader = new Loader(),
    swipe = new Swipe(loader.loadVideos);

$('body').append(Layout());
swipe.set();
var search = new Search(loader.loadVideos);