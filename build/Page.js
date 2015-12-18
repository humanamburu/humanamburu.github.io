module.exports = function Page() {

    function createPage(number) {
        var template = '<a href="#" class="page" data-number="' + number + '"></a>';
        return template;
    }

    return {
        pageTemplate: createPage
    };
}