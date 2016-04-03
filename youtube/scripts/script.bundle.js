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

	var Layout = __webpack_require__(1),
	    Search = __webpack_require__(3),
	    Loader = __webpack_require__(4),
	    Swipe = __webpack_require__(9),
	    ResizeCalculator = __webpack_require__(6);
	
	var loader = new Loader(),
	    layout = new Layout(),
	    resizer = new ResizeCalculator();
	
	layout.createLayout();
	resizer.listen();
	
	var swipe = new Swipe(loader.loadVideos),
	    search = new Search(loader.loadVideos);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2);
	
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

/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports) {

	function Search(callback) {
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
	
	function clearLayout() {
	    var main = document.querySelector('.videos'),
	        footer = document.querySelector('.footer');
	    main.innerHTML = "";
	    footer.innerHTML = "";
	}
	
	module.exports = Search;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Video = __webpack_require__(5),
	    ResizeCalculator = __webpack_require__(6);
	
	function Loader() {
	    var XHR = XMLHttpRequest,
	        nextpage = '',
	        saveQ = '',
	        calculator = new ResizeCalculator();
	
	    function loadVideos(query) {
	        if (query === '') {
	            query = saveQ;
	        } else {
	            saveQ = query;
	        }
	        var xhr = new XHR(),
	            mainURL = 'https://www.googleapis.com/youtube/v3/search?pageToken=' + nextpage + '&part=snippet&maxResults=15&q=' + query + '&key=AIzaSyAIQ2HLw1YvSQL7Equ4WPJpJskfbaEN_dg',
	            videos;
	
	        xhr.open('GET', mainURL, true);
	        xhr.send();
	
	        xhr.onload = function () {
	            nextpage = JSON.parse(this.responseText).nextPageToken;
	            videos = JSON.parse(this.responseText)['items'];
	
	            videos.forEach(function (element, i) {
	                var statURL = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + element.id.videoId + '&key=AIzaSyAIQ2HLw1YvSQL7Equ4WPJpJskfbaEN_dg';
	                var statisticXHR = new XHR();
	                statisticXHR.open('GET', statURL, true);
	                statisticXHR.send();
	
	                var video = {
	                    href: 'https://www.youtube.com/watch?v=' + element.id.videoId,
	                    hrefTag: element.snippet.title,
	                    imgSrc: element.snippet.thumbnails.medium.url,
	                    person: element.snippet.channelTitle,
	                    date: element.snippet.publishedAt.substring(0, 10),
	                    views: 0,
	                    text: element.snippet.description
	                };
	
	                (function (video, i) {
	                    statisticXHR.onload = function () {
	                        var statistic = JSON.parse(this.responseText)['items'];
	                        video.views = statistic[0].statistics.viewCount;
	
	                        var videoView = new Video(video);
	                        videoView.add();
	
	                        calculator.calculate(i);
	                    }
	                }(video, i));
	            });
	
	        };
	
	        xhr.onerror = function () {
	            console.log('Status ' + this.staus);
	        };
	    }
	
	    return {
	        loadVideos: loadVideos
	    };
	
	}
	
	module.exports = Loader;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2);
	
	function Video(obj) {
	    this.startTag = '<li class="video fade-in">';
	    this.link = '<a href="' + obj.href + '" class="name">' + obj.hrefTag + '</a>';
	    this.preview = '<div class="video-preview"><img src="' + obj.imgSrc + '" alt="videoPreview" ondrag="return false" ondragdrop="return false" ondragstart="return false"></div>';
	    this.videoStatistic = '<div class="video-statistic"><ul class="video-statistic-list"><li><div class="person-icon">' + obj.person + '</div></li><li><div class="date"> ' + obj.date + '</div></li><li><div class="views">' + obj.views + '</div></li></ul></div>';
	    this.mobileVideoStatistic = '<div class="mobile-video-statistic"><ul class="mobile-video-statistic-list"><li>' + obj.person + '</li><li>' + obj.date + '</li><li>' + obj.views + '</li></ul></div>';
	    this.description = '<div class="video-description">' + obj.text + '</div>';
	    this.endTag = '</li>';
	}
	
	Video.prototype.add = function () {
	    var template = this.startTag + this.link + this.preview + this.videoStatistic + this.mobileVideoStatistic + this.description + this.endTag;
	    $('.videos').append(template);
	    setTimeout(function () {
	        document.querySelector('.fade-in').classList.remove('fade-in');
	    }, 1000);
	};
	
	module.exports = Video;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var pagesController = __webpack_require__(7),
	    Swipe = __webpack_require__(9);
	
	function isInteger(num) {
	    return (num ^ 0) === num;
	}
	
	function pagesCalculate(pCount, length) {
	    var number = length / pCount;
	    if (isInteger(number)) {
	        return number;
	    } else {
	        return parseInt(number.toFixed(0));
	    }
	}
	
	function ResizeCalculator() {
	    this.pCounter = 0;
	}
	
	ResizeCalculator.prototype.calculate = function(i) {
	    var swipe = new Swipe();
	    var video = document.querySelectorAll('.video'),
	        length = video.length,
	        pages = document.querySelectorAll('.page'),
	        videos =  document.querySelector('.videos');
	
	    if (document.body.clientWidth < 700) {
	        videos.style.width = 'calc(100vw * ' + length + ')';
	        this.pCounter = pagesCalculate(1, length);
	    } else
	    if (document.body.clientWidth < 1050) {
	        videos.style.width = 'calc(50vw *' + length + ')';
	        this.pCounter = pagesCalculate(2, length);
	    } else
	
	    if (document.body.clientWidth < 1400) {
	        videos.style.width = 'calc(33.3vw *' + length + ')';
	        this.pCounter = pagesCalculate(3, length);
	    } else
	    if (document.body.clientWidth > 1500) {
	        videos.style.width = 'calc(25vw *' + length + ')';
	        this.pCounter = pagesCalculate(4, length);
	
	    }
	
	    pagesController(this.pCounter);
	
	    if (pages.length === 1) {
	        pages[0].classList.add('active');
	        swipe.swipe(0);
	    }
	};
	
	ResizeCalculator.prototype.listen = function () {
	    window.addEventListener('resize', this.calculate);
	};
	
	module.exports = ResizeCalculator;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2),
	    Page = __webpack_require__(8);
	
	function PageController(pCounter) {
	    var pages = document.querySelectorAll('.page'),
	        footer = document.querySelector('.footer'),
	        page;
	    if (pages.length < pCounter) {
	        while (pages.length < pCounter) {
	            var p = new Page(pages.length);
	            $('.footer').append(p.template);
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
	module.exports = PageController;

/***/ },
/* 8 */
/***/ function(module, exports) {

	function Page(number) {
	    this.template = '<a href="#" class="page" style="display: none;" data-number="' + number + '">' + (number + 1) + '</a>';
	}
	
	module.exports = Page;

/***/ },
/* 9 */
/***/ function(module, exports) {

	function Swipe(callback) {
	    this.callback = callback;
	    this.videos = document.querySelector('.videos');
	    if (callback != undefined) {
	        var active = document.querySelector('.active'),
	            pageNumber;
	        if (active === null) {
	            pageNumber = 0;
	        } else {
	            pageNumber = active.dataset.number;
	        }
	
	        this.activatePage(pageNumber);
	        this.videos.addEventListener("mousedown", this.clickHandler.bind(this), false);
	        this.videos.addEventListener("touchstart", this.clickHandler.bind(this), false);
	
	        document.querySelector('.footer').addEventListener('click', function (event) {
	            var pages = document.querySelectorAll('.page');
	            var number = event.target.dataset.number;
	            if (number != undefined) {
	                this.swipe(number);
	                if (parseInt(number) === (pages.length - 1) || parseInt(number) === (pages.length - 2)) {
	                    this.callback.call(this, '');
	                }
	            }
	        }.bind(this));
	
	        window.addEventListener('resize', function () {
	            var active = document.querySelector('.active'),
	                pageNumber;
	            if (active === null) {
	                pageNumber = 0;
	            } else {
	                pageNumber = active.dataset.number;
	            }
	            var pages = document.querySelectorAll('.page'),
	                videos = document.querySelector('.videos'),
	                trans = document.body.clientWidth * pageNumber;
	            videos.style.transition = "transform 0.0s";
	            videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";
	            if (active === null) {
	                this.swipe(pages.length - 1);
	            }
	
	        }.bind(this));
	    }
	
	}
	
	Swipe.prototype.activatePage = function (number) {
	    var pages = document.querySelectorAll('.page'),
	        left = number - 3,
	        right = number + 1;
	    for (var i = 0; i < pages.length; i++) {
	        if(i>=left && i<=right) {
	            pages[i].style.display = 'inline-block';
	        } else {
	            pages[i].style.display = 'none';
	        }
	        if (i == number) {
	            pages[i].classList.add('active');
	        } else {
	            pages[i].classList.remove('active');
	        }
	
	    }
	};
	
	Swipe.prototype.clickHandler = function (event) {
	    var active = document.querySelector('.active'),
	        pageNumber;
	    if (active === null) {
	        pageNumber = 0;
	    } else {
	        pageNumber = active.dataset.number;
	    }
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
	
	    var activatePage = this.activatePage,
	        callback = this.callback;
	
	    function endHandler(event) {
	        var active = document.querySelector('.active'),
	            pageNumber;
	        if (active === null) {
	            pageNumber = 0;
	        } else {
	            pageNumber = active.dataset.number;
	        }
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
	        if (pageX < shiftX && pageNumber != (pages.length - 3) && pageNumber != (pages.length - 1)) {
	            pageNumber++;
	        } else if (pageX > shiftX && pageNumber != '0') {
	            pageNumber--;
	
	        } else {
	            if (parseInt(pageNumber) === pages.length - 3) {
	                callback.call(this, '');
	                pageNumber++;
	            }
	
	        }
	        activatePage(pageNumber);
	        trans = document.body.clientWidth * pageNumber;
	        videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";
	
	        document.removeEventListener('mouseup', endHandler);
	        document.removeEventListener('touchend', endHandler);
	    }
	
	    document.addEventListener('mouseup', endHandler);
	    document.addEventListener('touchend', endHandler);
	
	};
	
	Swipe.prototype.swipe = function (number) {
	    var videos = document.querySelector('.videos'),
	        trans = 0;
	    this.activatePage(number);
	    videos.style.transition = "transform 0.8s";
	    trans = document.body.clientWidth * number;
	    videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";
	};
	
	module.exports = Swipe;

/***/ }
/******/ ]);
//# sourceMappingURL=script.bundle.js.map