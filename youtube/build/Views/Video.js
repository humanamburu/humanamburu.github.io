var $ = require('../lib/JQappend');

function Video(obj) {
    this.startTag = '<li class="video fade-in">';
    this.link = '<a href="' + obj.href + '" class="name">' + obj.hrefTag + '</a>';
    this.preview = '<div class="video-preview"><img src="' + obj.imgSrc + '" alt="videoPreview" ondrag="return false" ondragdrop="return false" ondragstart="return false"></div>';
    this.videoStatistic = '<div class="video-statistic"><ul class="video-statistic-list"><li><div class="person-icon">' + obj.person + '</div></li><li><div class="date"> ' + obj.date + '</div></li><li><div class="views">' + obj.views + '</div></li></ul></div>';
    this.mobileVideoStatistic = '<div class="mobile-video-statistic"><ul class="mobile-video-statistic-list"><li>' + obj.person + '</li><li>' + obj.date + '</li><li>' + obj.views + '</li></ul></div>';
    this.description = '<div class="video-description">' + obj.text + '</div>';
    this.endTag = '</li>';
}

Video.prototype.add = function () {
    var template = this.startTag + this.link + this.preview + this.videoStatistic + this.mobileVideoStatistic + this.description + this.endTag;
    $('.videos').append(template);
    setTimeout(function () {
        document.querySelector('.fade-in').classList.remove('fade-in');
    }, 1000);
};

module.exports = Video;