var $ = require('../lib/JQappend'),
    Page = require('../Views/Page');

function PageController(pCounter) {
    var pages = document.querySelectorAll('.page'),
        footer = document.querySelector('.footer'),
        page;
    if (pages.length < pCounter) {
        while (pages.length < pCounter) {
            var p = new Page(pages.length);
            $('.footer').append(p.template);
            pages = document.querySelectorAll('.page');
        }
    } else if (pages.length > pCounter) {
        while (pages.length > pCounter) {
            page = document.querySelector('.page[data-number="' + (pages.length - 1) + '"]');
            footer.removeChild(page);
            pages = document.querySelectorAll('.page');
        }
    }

}
module.exports = PageController;