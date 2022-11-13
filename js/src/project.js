'use strict';

(function($) {
  $(document).ready(function(){
    var timeoutHolder;

    //wrapowanie treści
    $('div[itemprop=articleBody] > *').not('.projekt-naglowek').wrapAll('<div class="container"></div>');
    $('div[itemprop="articleBody"] > .container > *').wrapAll('<div class="col-right"></div>');
    $('.projekt-naglowek').each(function(){
      $(this).children().wrapAll('<div class="container"></div>');
    });

    $('div[itemprop="articleBody"] > .container .col-right').prepend($('.moduletable.breadcrumbs')); // ustawianie breadcrumbsów
    $('.zespol').addClass('card-wrapper'); // klasa do slidera z ludźmi w section.js

    $('div[itemprop=articleBody]>.container').after($('.custom.adresinfo'));

    $('.cp-tags .cp-tag').addClass('btn btn-tag');
    $('.ppl-card>div>a:not([href^="mailto"])').addClass('bio icon-user'); // ikonki na wizytówkach
    $('.ppl-card>div>a[href^="mailto"]').addClass('email icon-email'); // ikonki na wizytówkach

    // tworzenie lewej kolumny
    createLeftAside();

    $('[itemprop="articleBody"]').append($('#kontakt')); // ustawianie kontaktu

    $(window).on("scroll", function() {
      var s = $(window).scrollTop(),
        ph = $('.projekt-naglowek'),
        projektHeader = ph.height() + ph.offset().top;

      if(s >= projektHeader){
        $('.sidebar').addClass('shown');
      } else {
        $('.sidebar').removeClass('shown');
      }
    });

    $(window).on('resize', function(){
      clearTimeout(timeoutHolder);
      timeoutHolder = setTimeout(function(){
        if(window.innerWidth < 769){
          $('.zespol .item').each(function(){
            if(!$(this).children('.biogram-links').length){
              $(this).children().children('a.email, a.bio').wrapAll('<div class="biogram-links"></div>');
              $(this).append($(this).find('.biogram-links'));
            }
          });
        } else {
          $('.zespol .item').each(function(){
            $(this).children('.fields').prepend($(this).find('a.email, a.bio'));
            $(this).children('.biogram-links').remove();
          });
        }
      }, 200);
    });

    $(window).resize();

    if($('.publikacje').length) { // przygotowanie ppublikacji do wyświetlenia
      $('.publikacje .infoBox a').addClass('btn');

      var pub = $('.publikacje').clone();

      $('.col-right .publikacje').addClass('container').children().not('.infoBox').wrapAll('<div class="col-right"></div>');
      $('.col-right .publikacje').children('.infoBox').addClass('sidebar sticky-aside');
      $('.col-right .publikacje').nextAll().wrapAll('<div class="container next-container"><div class="col-right"></div></div>');
      $('.article-footer').before($('.next-container'));
      $('.next-container').before($('.col-right .publikacje'));
    }
  });

  function createLeftAside(){
    var stickyAside = $('.projekt-naglowek .container>div').clone().addClass('sidebar sticky-aside');
    var txt = stickyAside.find('h1').get(0).innerHTML;
    var h1Classes = stickyAside.find('h1').attr('class');

    stickyAside.find('.tags-wrapper').remove();
    stickyAside.find('.finance').remove();
    stickyAside.find('.other').remove();
    stickyAside.find('.imie-i-nazwisko, .project-role').addClass('p1');
    stickyAside.find('.bioinfo').before(stickyAside.find('.project-role'));
    stickyAside.find('h1').replaceWith('<h2 class="'+h1Classes+'">'+txt+'</h2>');
    $('.col-right').before(stickyAside);
  }
})(jQuery);
