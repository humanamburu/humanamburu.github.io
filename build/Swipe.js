module.exports = function Swipe() {
    var active = '#CB3131',
        pageNumber = 0;

    function activatePadge(number) {
        var videos = document.querySelector('.videos'),
            pages = document.querySelectorAll('.page');
        for (var i = 0; i < pages.length; i++) {
            if (i == number) {
                pages[i].style.background = active;
                pages[i].style.border = '2px solid white';
            } else {
                pages[i].style.background = 'white';
                pages[i].style.border = 'none';
            }

        }
    }

    function clickHandler(event) {
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

        function endHandler(event) {
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
            if (pageX < shiftX && pageNumber != (pages.length - 1)) {
                pageNumber++;
            }
            if (pageX > shiftX && pageNumber) {
                pageNumber--;
            }
            activatePadge(pageNumber);
            trans = document.body.clientWidth * pageNumber;
            videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";

            document.removeEventListener('mouseup', endHandler);
            document.removeEventListener('touchend', endHandler);
        }

        document.addEventListener('mouseup', endHandler);
        document.addEventListener('touchend', endHandler);

    }

    function swipe(number) {
        var videos = document.querySelector('.videos');
        pageNumber = number;
        activatePadge(number);
        videos.style.transition = "transform 0.8s";
        trans = document.body.clientWidth * number;
        videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";
    }

    return {
        set: function () {
            var videos = document.querySelector('.videos');
            activatePadge(pageNumber);
            videos.addEventListener("mousedown", clickHandler, false);
            videos.addEventListener("touchstart", clickHandler, false);
            document.querySelector('.footer').addEventListener('click', function (event) {
                number = event.target.dataset.number;
                if (number != undefined) {
                    swipe(number)
                }
            });
            window.addEventListener('resize', function () {
                var pages = document.querySelectorAll('.page');
                trans = document.body.clientWidth * pageNumber;
                videos.style.transition = "transform 0.0s";
                videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";
                if (pageNumber > pages.length - 1) {
                    swipe(pages.length - 1);
                }

            });

        }
    };
}