var swipe=new Swipe,resizer=new ResizeCalculator;swipe.set(),resizer.set();
function isInteger(e){return(0^e)===e}function pagesCalculate(e,t){return number=t/e,isInteger(number)?number:parseInt(number.toFixed(0))}function ResizeCalculator(){function e(){var e,l=c.length;document.body.clientWidth<700?(t.style.width="calc(100vw * "+l+")",e=pagesCalculate(1,l)):document.body.clientWidth<1050?(t.style.width="calc(50vw *"+l+")",e=pagesCalculate(2,l)):document.body.clientWidth<1400?(t.style.width="calc(33.3vw *"+l+")",e=pagesCalculate(3,l)):document.body.clientWidth>1800?(t.style.width="calc(20vw *"+l+")",e=pagesCalculate(5,l)):document.body.clientWidth>1500&&(t.style.width="calc(25vw *"+l+")",e=pagesCalculate(4,l))}var t=document.querySelector(".videos"),c=(document.querySelectorAll(".page"),document.querySelectorAll(".video"));return{set:function(){e(),window.onresize=e}}}
function Swipe(){function t(t){for(var e=0;e<r.length;e++)e==t?(r[e].style.background=s,r[e].style.border="2px solid white"):(r[e].style.background="white",r[e].style.border="none")}function e(e){function n(t){var e=t.pageX||t.changedTouches[0].pageX;o.style.transform="translate3D("+(-u+e-d)+"px, 0px, 0px)"}function s(e){var n=e.pageX||e.changedTouches[0].pageX;document.onmousemove=null,document.ontouchend=null,o.style.transition="transform 0.5s",d>n&&a!=r.length-1&&a++,n>d&&a&&a--,t(a),u=document.body.clientWidth*a,o.style.transform="translate3D(-"+u+"px, 0px, 0px)"}var u=document.body.clientWidth*a,d=e.pageX||e.changedTouches[0].pageX;o.style.transition="transform 0s",document.onmousemove=n,document.ontouchmove=n,o.onmouseup=s,o.ontouchend-s}function n(e){a=e,t(e),o.style.transition="transform 0.8s",trans=document.body.clientWidth*e,o.style.transform="translate3D(-"+trans+"px, 0px, 0px)"}var o=document.querySelector(".videos"),r=document.querySelectorAll(".page"),s="#CB3131",a=0;return{set:function(){t(a),o.addEventListener("mousedown",e,!1),o.addEventListener("touchstart",e,!1),document.querySelector(".footer").addEventListener("click",function(t){number=t.target.dataset.number,void 0!=number&&n(number)}),window.addEventListener("resize",function(){trans=document.body.clientWidth*a,o.style.transition="transform 0.0s",o.style.transform="translate3D(-"+trans+"px, 0px, 0px)"})}}}