var $ = require('../lib/JQappend');

function Layout() {
    this.header = '<header class="header"><div class="header-search"><img class="search-icon" src="styles/search.png" alt="search"><input class="search" type="search"></div></header>';
    this.main = '<main class="main"><ul class="videos"></ul></main>';
    this.footer = '<footer class="footer"></footer>';
}

Layout.prototype.createLayout = function() {
    var layout = this.header + this.main + this.footer;
    $('body').append(layout);
};

module.exports = Layout;