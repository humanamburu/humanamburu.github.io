var $ = require('../lib/JQappend'),
    Video = require('../Views/Video'),
    ResizeCalculator = require('../Controller/ResizeCalculator');

module.exports = function Loader() {
    var XHR = XMLHttpRequest,
        resizer = new ResizeCalculator();

    function loadVideos(query) {
        var xhr = new XHR(),
            mainURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=' + query + '&key=AIzaSyAIQ2HLw1YvSQL7Equ4WPJpJskfbaEN_dg',
            videos,
            calculator = new ResizeCalculator();

        xhr.open('GET', mainURL, true);
        xhr.send();

        xhr.onload = function () {
            var statURL;
            videos = JSON.parse(this.responseText)['items'];
            videos.forEach(function (element, i) {
                statURL = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + element.id.videoId + '&key=AIzaSyAIQ2HLw1YvSQL7Equ4WPJpJskfbaEN_dg';
                var video = {
                    href: 'https://www.youtube.com/watch?v=' + element.id.videoId,
                    hrefTag: element.snippet.title,
                    imgSrc: element.snippet.thumbnails.medium.url,
                    person: element.snippet.channelTitle,
                    date: element.snippet.publishedAt.substring(0, 10),
                    views: 0,
                    text: element.snippet.description
                };

                var statisticXHR = new XHR();
                statisticXHR.open('GET', statURL, true)
                statisticXHR.send();

                (function (video, i) {
                    statisticXHR.onload = function () {
                        var statistic = JSON.parse(this.responseText)['items'];
                        video.views = statistic[0].statistics.viewCount;
                        $('.videos').append(Video(video));
                        calculator.calculate(i);
                    }
                }(video, i));
            });

        }

        xhr.onerror = function () {
            console.log('Status ' + this.status);
        }
        resizer.set();
    }

    return {
        loadVideos: loadVideos
    };


}