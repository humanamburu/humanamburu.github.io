module.exports = function Layout() {
    var header = '<header class="header"><div class="header-search"><img class="search-icon" src="styles/search.png" alt="search"><input class="search" type="search"></div></header>',
        main = '<main class="main"><ul class="videos"></ul></main>',
        footer = '<footer class="footer"></footer>';
    return header + main + footer;
}