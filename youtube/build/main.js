var Layout = require('./Views/Layout'),
    Search = require('./Controller/Search'),
    Loader = require('./Controller/Loader'),
    Swipe = require('./Controller/Swipe'),
    ResizeCalculator = require('./Controller/ResizeCalculator');

var loader = new Loader(),
    layout = new Layout(),
    resizer = new ResizeCalculator();

layout.createLayout();
resizer.listen();

var swipe = new Swipe(loader.loadVideos),
    search = new Search(loader.loadVideos);