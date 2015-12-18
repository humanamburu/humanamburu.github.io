module.exports = function Page() {

    function createPage(number) {
        var template = '<a href="#" class="page" data-number="' + number + '">' + (number + 1) + '</a>';
        return template;
    }

    return {
        pageTemplate: createPage
    };
}