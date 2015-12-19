var main =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Swipe = __webpack_require__(1),
	    ResizeCalculator = __webpack_require__(2),
	    Layout = __webpack_require__(7),
	    Search = __webpack_require__(8),
	    $ = __webpack_require__(5),
	    load = __webpack_require__(9);
	
	
	$('body').append(Layout());
	
	var swipe = new Swipe(),
	    resizer = new ResizeCalculator();
	
	swipe.set();
	resizer.set();
	
	var search = new Search();
	search.init(function (event, value) {
	    load(value);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function Swipe() {
	    var active = '#CB3131',
	        pageNumber = 0;
	
	    function activatePadge(number) {
	        var videos = document.querySelector('.videos'),
	            pages = document.querySelectorAll('.page');
	        for (var i = 0; i < pages.length; i++) {
	            if (i == number) {
	                pages[i].style.background = active;
	            } else {
	                pages[i].style.background = 'white';
	            }
	
	        }
	    }
	
	    function clickHandler(event) {
	        var videos = document.querySelector('.videos'),
	            trans = document.body.clientWidth * pageNumber,
	            shiftX;
	        if (event.changedTouches === undefined) {
	            shiftX = event.pageX;
	        } else {
	            shiftX = event.changedTouches[0].pageX;
	        }
	
	        videos.style.transition = "transform 0s"
	
	        function clickMoveAt(event) {
	            var pageX;
	            if (event.changedTouches === undefined) {
	                pageX = event.pageX;
	            } else {
	                pageX = event.changedTouches[0].pageX;
	            }
	            videos.style.transform = "translate3D(" + (-trans + pageX - shiftX) + "px, 0px, 0px)";
	        }
	
	        document.addEventListener('mousemove', clickMoveAt);
	        document.addEventListener('touchmove', clickMoveAt);
	
	        function endHandler(event) {
	            var videos = document.querySelector('.videos'),
	                pages = document.querySelectorAll('.page'),
	                pageX;
	            if (event.changedTouches === undefined) {
	                pageX = event.pageX;
	            } else {
	                pageX = event.changedTouches[0].pageX;
	            }
	            document.removeEventListener('mousemove', clickMoveAt);
	            document.removeEventListener('touchmove', clickMoveAt);
	            videos.style.transition = "transform 0.5s";
	            if (pageX < shiftX && pageNumber != (pages.length - 1)) {
	                pageNumber++;
	            }
	            if (pageX > shiftX && pageNumber) {
	                pageNumber--;
	            }
	            activatePadge(pageNumber);
	            trans = document.body.clientWidth * pageNumber;
	            videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";
	
	            document.removeEventListener('mouseup', endHandler);
	            document.removeEventListener('touchend', endHandler);
	        }
	
	        document.addEventListener('mouseup', endHandler);
	        document.addEventListener('touchend', endHandler);
	
	    }
	
	    function swipe(number) {
	        var videos = document.querySelector('.videos');
	        pageNumber = number;
	        activatePadge(number);
	        videos.style.transition = "transform 0.8s";
	        trans = document.body.clientWidth * number;
	        videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";
	    }
	
	    return {
	        set: function () {
	            var videos = document.querySelector('.videos');
	            activatePadge(pageNumber);
	            videos.addEventListener("mousedown", clickHandler, false);
	            videos.addEventListener("touchstart", clickHandler, false);
	            document.querySelector('.footer').addEventListener('click', function (event) {
	                number = event.target.dataset.number;
	                if (number != undefined) {
	                    swipe(number)
	                }
	            });
	            window.addEventListener('resize', function () {
	                var pages = document.querySelectorAll('.page'),
	                    videos = document.querySelector('.videos');
	                trans = document.body.clientWidth * pageNumber;
	                videos.style.transition = "transform 0.0s";
	                videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";
	                if (pageNumber > pages.length - 1) {
	                    swipe(pages.length - 1);
	                }
	
	            });
	
	        }
	    };
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Page = __webpack_require__(3),
	    pagesController = __webpack_require__(4);
	
	function isInteger(num) {
	    return (num ^ 0) === num;
	}
	
	
	module.exports = function ResizeCalculator() {
	
	    var pCounter = 0;
	
	    function pagesCalculate(pCount, length) {
	        number = length / pCount;
	        if (isInteger(number)) {
	            return number;
	        } else {
	            return parseInt(number.toFixed(0));
	        }
	    }
	
	    function calculate() {
	        debugger;
	        var video = document.querySelectorAll('.video'),
	            length = video.length,
	            videos = document.querySelector('.videos'),
	            pages = document.querySelectorAll('.page'),
	            page = new Page();
	
	
	        if (document.body.clientWidth < 700) {
	            videos.style.width = 'calc(100vw * ' + length + ')';
	            pCounter = pagesCalculate(1, length);
	        } else
	        if (document.body.clientWidth < 1050) {
	            videos.style.width = 'calc(50vw *' + length + ')';
	            pCounter = pagesCalculate(2, length);
	        } else
	
	        if (document.body.clientWidth < 1400) {
	            videos.style.width = 'calc(33.3vw *' + length + ')';
	            pCounter = pagesCalculate(3, length);
	        } else
	        if (document.body.clientWidth > 1500) {
	            videos.style.width = 'calc(25vw *' + length + ')';
	            pCounter = pagesCalculate(4, length);
	
	        }
	        pagesController(page.pageTemplate, pCounter);
	    }
	
	
	
	    return {
	        set: function () {
	            window.addEventListener('resize', calculate);
	        },
	        calculate: calculate
	    };
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function Page() {
	
	    function createPage(number) {
	        var template = '<a href="#" class="page" data-number="' + number + '">' + (number + 1) + '</a>';
	        return template;
	    }
	
	    return {
	        pageTemplate: createPage
	    };
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	     var $ = __webpack_require__(5);
	     module.exports = function pagesControler(template, pCounter) {
	         var pages = document.querySelectorAll('.page'),
	             footer = document.querySelector('.footer'),
	             page;
	         if (pages.length < pCounter) {
	             while (pages.length < pCounter) {
	                 $('.footer').append(template(pages.length));
	                 pages = document.querySelectorAll('.page');
	             }
	         } else if (pages.length > pCounter) {
	             while (pages.length > pCounter) {
	                 page = document.querySelector('.page[data-number="' + (pages.length - 1) + '"]');
	                 footer.removeChild(page);
	                 pages = document.querySelectorAll('.page');
	             }
	         }
	
	     }

/***/ },
/* 5 */
/***/ function(module, exports) {

	function JQ(selector) {
	    this.selector = selector;
	    if (this instanceof JQ) {
	        return this.set(selector);
	    } else {
	        return new JQ(selector);
	    }
	};
	
	JQ.prototype.elements = [];
	JQ.prototype.selector;
	
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

/***/ },
/* 6 */
/***/ function(module, exports) {

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

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function Layout() {
	    var header = '<header class="header"><div class="header-search"><img class="search-icon" src="styles/search.png" alt="search"><input class="search" type="search"></div></header>',
	        main = '<main class="main"><ul class="videos"></ul></main>',
	        footer = '<footer class="footer"></footer>';
	    return header + main + footer;
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5),
	    Video = __webpack_require__(6),
	    ResizeCalculator = __webpack_require__(2);
	
	module.exports = function load(query) {
	    var XHR = XMLHttpRequest;
	    var xhr = new XHR(),
	        mainURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=' + query + '&key=AIzaSyAIQ2HLw1YvSQL7Equ4WPJpJskfbaEN_dg',
	        videos,
	        calculator = new ResizeCalculator();
	
	    xhr.open('GET', mainURL, true);
	    xhr.send();
	
	    xhr.onload = function () {
	        var statURL;
	        videos = JSON.parse(this.responseText)['items'];
	        for (var i = 0; i < 15; i++) {
	            statURL = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + videos[i].id.videoId + '&key=AIzaSyAIQ2HLw1YvSQL7Equ4WPJpJskfbaEN_dg';
	
	            var video = {
	                href: 'https://www.youtube.com/watch?v=' + videos[i].id.videoId,
	                hrefTag: videos[i].snippet.title,
	                imgSrc: videos[i].snippet.thumbnails.medium.url,
	                person: videos[i].snippet.channelTitle,
	                date: videos[i].snippet.publishedAt.substring(0, 10),
	                views: 0,
	                text: videos[i].snippet.description
	            };
	
	            var statisticXHR = new XHR();
	            statisticXHR.open('GET', statURL, true)
	            statisticXHR.send();
	
	            (function (video) {
	                statisticXHR.onload = function () {
	                    var statistic = JSON.parse(this.responseText)['items'];
	                    video.views = statistic[0].statistics.viewCount;
	                    $('.videos').append(Video(video));
	                    calculator.calculate();
	                }
	            }(video));
	
	        }
	
	    }
	    xhr.onerror = function () {
	        console.log('Status ' + this.status);
	    }
	
	}

/***/ }
/******/ ]);
//# sourceMappingURL=script.bundle.js.map