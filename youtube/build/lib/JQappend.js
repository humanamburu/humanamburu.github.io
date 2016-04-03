function JQ(selector) {
    this.selector = selector;
    if (this instanceof JQ) {
        return this.set(selector);
    } else {
        return new JQ(selector);
    }
};

JQ.prototype.elements = [];

JQ.prototype.set = function (selector) {
    if (typeof selector === 'string') {
        this.elements = document.querySelectorAll(selector);
    } else if (selector instanceof JQ) {
        this.elements = this.elements.concat(selector.elements);
    }
    return this;
};

JQ.prototype.append = function (content) {
    if (content instanceof JQ) {
        [].forEach.call(this.elements, function (argument) {
            for (var i = 0; i < content.elements.length; i++) {
                argument.appendChild(content.elements[i]);
            }
        });
    }
    if (content instanceof Node) {
        [].forEach.call(this.elements, function (argument) {
            argument.appendChild(content.cloneNode(true));
        });
    }
    if (typeof (content) === "function") {
        for (var i = 0; i < this.elements.length; i++) {
            JQ(this.selector).elements[i].innerHTML += content(i);
        };
    }
    if (typeof content === 'string') {
        for (var i = 0; i < this.elements.length; i++) {
            JQ(this.selector).elements[i].innerHTML += content;
        };
    }
    return this;
};

module.exports = JQ;