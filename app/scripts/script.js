var swipe=new Swipe,resizer=new ResizeCalculator;swipe.set(),resizer.set();
function ResizeCalculator(){function t(){var t=document.querySelectorAll(".video").length;document.body.clientWidth>1500&&(e.style.width="calc(25vw *"+t+")"),document.body.clientWidth>1800&&(e.style.width="calc(20vw *"+t+")"),document.body.clientWidth<1400&&(e.style.width="calc(33.3vw *"+t+")"),document.body.clientWidth<1050&&(e.style.width="calc(50vw *"+t+")"),document.body.clientWidth<700&&(e.style.width="calc(100vw * "+t+")")}var e=document.querySelector(".videos"),c=c=document.querySelectorAll(".page");return{set:function(){t(),window.onresize=t}}}
function Swipe(){function t(t){for(var e=0;e<r.length;e++)e==t?(r[e].style.background=s,r[e].style.border="2px solid white"):(r[e].style.background="white",r[e].style.border="none")}function e(e){function n(t){var e=t.pageX||t.changedTouches[0].pageX;o.style.transform="translate3D("+(-u+e-d)+"px, 0px, 0px)"}function s(e){var n=e.pageX||e.changedTouches[0].pageX;document.onmousemove=null,document.ontouchend=null,o.style.transition="transform 0.5s",d>n&&a!=r.length-1&&a++,n>d&&a&&a--,t(a),u=document.body.clientWidth*a,o.style.transform="translate3D(-"+u+"px, 0px, 0px)"}var u=document.body.clientWidth*a,d=e.pageX||e.changedTouches[0].pageX;o.style.transition="transform 0s",document.onmousemove=n,document.ontouchmove=n,o.onmouseup=s,o.ontouchend-s}function n(e){a=e,t(e),o.style.transition="transform 0.8s",trans=document.body.clientWidth*e,o.style.transform="translate3D(-"+trans+"px, 0px, 0px)"}var o=document.querySelector(".videos"),r=document.querySelectorAll(".page"),s="#CB3131",a=0;return{set:function(){t(a),o.addEventListener("mousedown",e,!1),o.addEventListener("touchstart",e,!1),document.querySelector(".footer").addEventListener("click",function(t){number=t.target.dataset.number,void 0!=number&&n(number)}),window.addEventListener("resize",function(){trans=document.body.clientWidth*a,o.style.transition="transform 0.0s",o.style.transform="translate3D(-"+trans+"px, 0px, 0px)"})},activatePadge:t}}