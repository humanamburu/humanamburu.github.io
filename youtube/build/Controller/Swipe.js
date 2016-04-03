function Swipe(callback) {
    this.callback = callback;
    this.videos = document.querySelector('.videos');
    if (callback != undefined) {
        var active = document.querySelector('.active'),
            pageNumber;
        if (active === null) {
            pageNumber = 0;
        } else {
            pageNumber = active.dataset.number;
        }

        this.activatePage(pageNumber);
        this.videos.addEventListener("mousedown", this.clickHandler.bind(this), false);
        this.videos.addEventListener("touchstart", this.clickHandler.bind(this), false);

        document.querySelector('.footer').addEventListener('click', function (event) {
            var pages = document.querySelectorAll('.page');
            var number = event.target.dataset.number;
            if (number != undefined) {
                this.swipe(number);
                if (parseInt(number) === (pages.length - 1) || parseInt(number) === (pages.length - 2)) {
                    this.callback.call(this, '');
                }
            }
        }.bind(this));

        window.addEventListener('resize', function () {
            var active = document.querySelector('.active'),
                pageNumber;
            if (active === null) {
                pageNumber = 0;
            } else {
                pageNumber = active.dataset.number;
            }
            var pages = document.querySelectorAll('.page'),
                videos = document.querySelector('.videos'),
                trans = document.body.clientWidth * pageNumber;
            videos.style.transition = "transform 0.0s";
            videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";
            if (active === null) {
                this.swipe(pages.length - 1);
            }

        }.bind(this));
    }

}

Swipe.prototype.activatePage = function (number) {
    var pages = document.querySelectorAll('.page'),
        left = number - 3,
        right = number + 1;
    for (var i = 0; i < pages.length; i++) {
        if(i>=left && i<=right) {
            pages[i].style.display = 'inline-block';
        } else {
            pages[i].style.display = 'none';
        }
        if (i == number) {
            pages[i].classList.add('active');
        } else {
            pages[i].classList.remove('active');
        }

    }
};

Swipe.prototype.clickHandler = function (event) {
    var active = document.querySelector('.active'),
        pageNumber;
    if (active === null) {
        pageNumber = 0;
    } else {
        pageNumber = active.dataset.number;
    }
    var videos = document.querySelector('.videos'),
        trans = document.body.clientWidth * pageNumber,
        shiftX;
    if (event.changedTouches === undefined) {
        shiftX = event.pageX;
    } else {
        shiftX = event.changedTouches[0].pageX;
    }
    videos.style.transition = "transform 0s"

    function clickMoveAt(event) {
        var pageX;
        if (event.changedTouches === undefined) {
            pageX = event.pageX;
        } else {
            pageX = event.changedTouches[0].pageX;
        }
        videos.style.transform = "translate3D(" + (-trans + pageX - shiftX) + "px, 0px, 0px)";
    }

    document.addEventListener('mousemove', clickMoveAt);
    document.addEventListener('touchmove', clickMoveAt);

    var activatePage = this.activatePage,
        callback = this.callback;

    function endHandler(event) {
        var active = document.querySelector('.active'),
            pageNumber;
        if (active === null) {
            pageNumber = 0;
        } else {
            pageNumber = active.dataset.number;
        }
        var videos = document.querySelector('.videos'),
            pages = document.querySelectorAll('.page'),
            pageX;
        if (event.changedTouches === undefined) {
            pageX = event.pageX;
        } else {
            pageX = event.changedTouches[0].pageX;
        }
        document.removeEventListener('mousemove', clickMoveAt);
        document.removeEventListener('touchmove', clickMoveAt);
        videos.style.transition = "transform 0.5s";
        if (pageX < shiftX && pageNumber != (pages.length - 3) && pageNumber != (pages.length - 1)) {
            pageNumber++;
        } else if (pageX > shiftX && pageNumber != '0') {
            pageNumber--;

        } else {
            if (parseInt(pageNumber) === pages.length - 3) {
                callback.call(this, '');
                pageNumber++;
            }

        }
        activatePage(pageNumber);
        trans = document.body.clientWidth * pageNumber;
        videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";

        document.removeEventListener('mouseup', endHandler);
        document.removeEventListener('touchend', endHandler);
    }

    document.addEventListener('mouseup', endHandler);
    document.addEventListener('touchend', endHandler);

};

Swipe.prototype.swipe = function (number) {
    var videos = document.querySelector('.videos'),
        trans = 0;
    this.activatePage(number);
    videos.style.transition = "transform 0.8s";
    trans = document.body.clientWidth * number;
    videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";
};

module.exports = Swipe;