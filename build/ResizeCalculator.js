var Page = require('./Page');

function isInteger(num) {
    return (num ^ 0) === num;
}


module.exports = function ResizeCalculator() {

    var pCounter = 0;

    function pagesCalculate(pCount, length) {
        number = length / pCount;
        if (isInteger(number)) {
            return number;
        } else {
            return parseInt(number.toFixed(0));
        }
    }

    function pagesControler(template) {
        var pages = document.querySelectorAll('.page'),
            footer = document.querySelector('.footer'),
            page;
        if (pages.length < pCounter) {
            while (pages.length < pCounter) {
                $('.footer').append(template(pages.length));
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

    function calculate() {
        var video = document.querySelectorAll('.video'),
            length = video.length,
            videos = document.querySelector('.videos'),
            pages = document.querySelectorAll('.page'),
            page = new Page();


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

        pagesControler(page.pageTemplate);
    }



    return {
        set: function () {
            calculate();
            window.addEventListener('resize', calculate);
        }
    };
}