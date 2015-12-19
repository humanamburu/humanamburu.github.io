module.exports = function Video(obj) {
    var startTag = '<li class="video">',
        link = '<a href="' + obj.href + '" class="name">' + obj.hrefTag + '</a>',
        preview = '<div class="video-preview"><img src="' + obj.imgSrc + '" alt="videoPreview" ondrag="return false" ondragdrop="return false" ondragstart="return false"></div>',
        videoStatistic = '<div class="video-statistic"><ul class="video-statistic-list"><li><div class="person-icon">' + obj.person + '</div></li><li><div class="date"> ' + obj.date + '</div></li><li><div class="views">' + obj.views + '</div></li></ul></div>',
        mobileVideoStatistic = '<div class="mobile-video-statistic"><ul class="mobile-video-statistic-list"><li>' + obj.person + '</li><li>' + obj.date + '</li><li>' + obj.views + '</li></ul></div>',
        description = '<div class="video-description">' + obj.text + '</div>',
        endTag = '</li>';

    return startTag + link + preview + videoStatistic + mobileVideoStatistic + description + endTag;

}