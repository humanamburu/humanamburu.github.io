var Swipe = require('./Swipe'),
    ResizeCalculator = require('./ResizeCalculator'),
    Video = require('./Video'),
    Layout = require('./Layout');

var swipe = new Swipe(),
    resizer = new ResizeCalculator(),
    video = new Video(),
    layout = new Layout();

$('body').append(layout.createTemplate());

for (var i = 0; i < 11; i++) {
    var href = 'http://vk.com/humanamburu',
        hrefTag = i + 'Крутой ролик на 5 миллиардов просомтров почти гангнамстайл',
        imgSrc = 'styles/test.png',
        person = 'Fdasd sadasdsa',
        date = '20.20.2015',
        views = 200255522,
        text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum consequatur vero iste, iusto fugit sapiente itaque molestias eos. Eius molestias consectetur assumenda, quibusdam, necessitatibus quisquam neque sunt. Veniam, pariatur, esse?';

    $('.videos').append(video.createTemplate(href, hrefTag, imgSrc, person, date, views, text));
}

resizer.set();
swipe.set();