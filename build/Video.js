module.exports = function Video() {

    function createVideoTemplate(href, hrefTag, imgSrc, person, date, views, text) {
        var startTag = '<li class="video">',
            link = '<a href="' + href + '" class="name">' + hrefTag + '</a>',
            preview = '<div class="video-preview"><img src="' + imgSrc + '" alt="videoPreview" ondrag="return false" ondragdrop="return false" ondragstart="return false"></div>',
            videoStatistic = '<div class="video-statistic"><ul class="video-statistic-list"><li><div class="person-icon">' + person + '</div></li><li><div class="date"> ' + date + '</div></li><li><div class="views">' + views + '</div></li></ul></div>',
            mobileVideoStatistic = '<div class="mobile-video-statistic"><ul class="mobile-video-statistic-list"><li>' + person + '</li><li>' + date + '</li><li>' + views + '</li></ul></div>',
            description = '<div class="video-description">' + text + '</div>',
            endTag = '</li>';

        return startTag + link + preview + videoStatistic + mobileVideoStatistic + description + endTag;
    }

    return {
        createTemplate: createVideoTemplate
    };

}