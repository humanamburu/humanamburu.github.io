var Page = require('../Views/Page'),
    pagesController = require('./PageController'),
    Swipe = require('../Controller/Swipe');

function isInteger(num) {
    return (num ^ 0) === num;
}


module.exports = function ResizeCalculator() {

    var pCounter = 0,
        swipe = new Swipe();

    function pagesCalculate(pCount, length) {
        number = length / pCount;
        if (isInteger(number)) {
            return number;
        } else {
            return parseInt(number.toFixed(0));
        }
    }

    function calculate(i) {
        var video = document.querySelectorAll('.video'),
            length = video.length,
            videos = document.querySelector('.videos'),
            pages = document.querySelectorAll('.page'),
            page = new Page();
        var active = document.querySelector('.active'),
            pageNumber;
        if (active === null) {
            pageNumber = 0;
        } else {
            pageNumber = active.dataset.number;
        }


        if (document.body.clientWidth < 700) {
            videos.style.width = 'calc(100vw * ' + length + ')';
            pCounter = pagesCalculate(1, length);
        } else
        if (document.body.clientWidth < 1050) {
            videos.style.width = 'calc(50vw *' + length + ')';
            pCounter = pagesCalculate(2, length);
        } else

        if (document.body.clientWidth < 1400) {
            videos.style.width = 'calc(33.3vw *' + length + ')';
            pCounter = pagesCalculate(3, length);
        } else
        if (document.body.clientWidth > 1500) {
            videos.style.width = 'calc(25vw *' + length + ')';
            pCounter = pagesCalculate(4, length);

        }
        pagesController(page.pageTemplate, pCounter);
        if (pages.length === 1) {
            pages[0].classList.add('active');
            swipe.swipe(0);
        }
    }



    return {
        set: function () {
            window.addEventListener('resize', calculate);
        },
        calculate: calculate
    };
}