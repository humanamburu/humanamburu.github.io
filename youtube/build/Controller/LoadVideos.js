var $ = require('../lib/JQappend'),
    Video = require('../Views/Video'),
    ResizeCalculator = require('../Controller/ResizeCalculator');

module.exports = function load(query) {
    var XHR = XMLHttpRequest;
    var xhr = new XHR(),
        mainURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=' + query + '&key=AIzaSyAIQ2HLw1YvSQL7Equ4WPJpJskfbaEN_dg',
        videos,
        calculator = new ResizeCalculator();

    xhr.open('GET', mainURL, true);
    xhr.send();

    xhr.onload = function () {
        var statURL;
        videos = JSON.parse(this.responseText)['items'];
        for (var i = 0; i < 15; i++) {
            statURL = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + videos[i].id.videoId + '&key=AIzaSyAIQ2HLw1YvSQL7Equ4WPJpJskfbaEN_dg';

            var video = {
                href: 'https://www.youtube.com/watch?v=' + videos[i].id.videoId,
                hrefTag: videos[i].snippet.title,
                imgSrc: videos[i].snippet.thumbnails.medium.url,
                person: videos[i].snippet.channelTitle,
                date: videos[i].snippet.publishedAt.substring(0, 10),
                views: 0,
                text: videos[i].snippet.description
            };

            var statisticXHR = new XHR();
            statisticXHR.open('GET', statURL, true)
            statisticXHR.send();

            (function (video) {
                statisticXHR.onload = function () {
                    var statistic = JSON.parse(this.responseText)['items'];
                    video.views = statistic[0].statistics.viewCount;
                    $('.videos').append(Video(video));
                    calculator.calculate();
                }
            }(video));

        }

    }
    xhr.onerror = function () {
        console.log('Status ' + this.status);
    }

}