module.exports = function Search(callback) {
    var search = document.querySelector('.search');
    search.addEventListener('keyup',
        function (event) {
            if (event.keyCode === 13) {
                clearLayout();
                callback.call(this, search.value);
            }
        });
    document.querySelector('.search-icon').addEventListener('click', function (event) {
        clearLayout();
        callback.call(this, event, search.value);
    });
}

function clearLayout(argument) {
    var main = document.querySelector('.videos'),
        footer = document.querySelector('.footer');
    main.innerHTML = "";
    footer.innerHTML = "";
}