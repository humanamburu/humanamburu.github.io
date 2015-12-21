var Video = require('../Views/Video'),
    ResizeCalculator = require('../Controller/ResizeCalculator');

function Loader() {
    var XHR = XMLHttpRequest,
        nextpage = '',
        saveQ = '',
        calculator = new ResizeCalculator();

    function loadVideos(query) {
        if (query === '') {
            query = saveQ;
        } else {
            saveQ = query;
        }
        var xhr = new XHR(),
            mainURL = 'https://www.googleapis.com/youtube/v3/search?pageToken=' + nextpage + '&part=snippet&maxResults=15&q=' + query + '&key=AIzaSyAIQ2HLw1YvSQL7Equ4WPJpJskfbaEN_dg',
            videos;

        xhr.open('GET', mainURL, true);
        xhr.send();

        xhr.onload = function () {
            nextpage = JSON.parse(this.responseText).nextPageToken;
            videos = JSON.parse(this.responseText)['items'];

            videos.forEach(function (element, i) {
                var statURL = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + element.id.videoId + '&key=AIzaSyAIQ2HLw1YvSQL7Equ4WPJpJskfbaEN_dg';
                var statisticXHR = new XHR();
                statisticXHR.open('GET', statURL, true);
                statisticXHR.send();

                var video = {
                    href: 'https://www.youtube.com/watch?v=' + element.id.videoId,
                    hrefTag: element.snippet.title,
                    imgSrc: element.snippet.thumbnails.medium.url,
                    person: element.snippet.channelTitle,
                    date: element.snippet.publishedAt.substring(0, 10),
                    views: 0,
                    text: element.snippet.description
                };

                (function (video, i) {
                    statisticXHR.onload = function () {
                        var statistic = JSON.parse(this.responseText)['items'],
                            videoView = new Video(video);
                        video.views = statistic[0].statistics.viewCount;
                        videoView.add();
                        calculator.calculate(i);
                    }
                }(video, i));
            });

        };

        xhr.onerror = function () {
            console.log('Status ' + this.staus);
        };
    }

    return {
        loadVideos: loadVideos
    };

}

module.exports = Loader;