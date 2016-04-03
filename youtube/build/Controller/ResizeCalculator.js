var pagesController = require('./PageController'),
    Swipe = require('../Controller/Swipe');

function isInteger(num) {
    return (num ^ 0) === num;
}

function pagesCalculate(pCount, length) {
    var number = length / pCount;
    if (isInteger(number)) {
        return number;
    } else {
        return parseInt(number.toFixed(0));
    }
}

function ResizeCalculator() {
    this.pCounter = 0;
}

ResizeCalculator.prototype.calculate = function(i) {
    var swipe = new Swipe();
    var video = document.querySelectorAll('.video'),
        length = video.length,
        pages = document.querySelectorAll('.page'),
        videos =  document.querySelector('.videos');

    if (document.body.clientWidth < 700) {
        videos.style.width = 'calc(100vw * ' + length + ')';
        this.pCounter = pagesCalculate(1, length);
    } else
    if (document.body.clientWidth < 1050) {
        videos.style.width = 'calc(50vw *' + length + ')';
        this.pCounter = pagesCalculate(2, length);
    } else

    if (document.body.clientWidth < 1400) {
        videos.style.width = 'calc(33.3vw *' + length + ')';
        this.pCounter = pagesCalculate(3, length);
    } else
    if (document.body.clientWidth > 1500) {
        videos.style.width = 'calc(25vw *' + length + ')';
        this.pCounter = pagesCalculate(4, length);

    }

    pagesController(this.pCounter);

    if (pages.length === 1) {
        pages[0].classList.add('active');
        swipe.swipe(0);
    }
};

ResizeCalculator.prototype.listen = function () {
    window.addEventListener('resize', this.calculate);
};

module.exports = ResizeCalculator;