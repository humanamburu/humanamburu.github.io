     var $ = require('../lib/JQappend');
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