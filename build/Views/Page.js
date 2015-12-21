function Page(number) {
    this.template = '<a href="#" class="page" style="display: none;" data-number="' + number + '">' + (number + 1) + '</a>';
}

module.exports = Page;