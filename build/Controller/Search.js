module.exports = function Search() {
    var search = document.querySelector('.search');

    function init(callback) {
        search.addEventListener('keyup',
            function (event) {
                if (event.keyCode === 13) {
                    callback.call(this, event, search.value);
                }
            });
    }

    return {
        init: init
    };
}