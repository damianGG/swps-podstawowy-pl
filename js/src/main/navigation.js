'use strict';

(function($){
	$(document).ready(function(){
    var scrollSpy, timeoutHolder,
      windowContainerRatio = $('.submenu-wrapper').innerWidth() / $(window).innerWidth(),
      scale = $('html').css('font-size').replace('px', '') / 16;
    // if($('.secondary-nav.sticky-nav').length) {
    //   $('.secondary-nav.sticky-nav a').addClass('nav-link');
    //
    //   scrollSpy = new bootstrap.ScrollSpy(document.body, {
    //     target: '.secondary-nav.sticky-nav',
    //     // method: "offset",
    //     offset: 140
    //   });
    // } #F1F1F1

    // animacja menu
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type == "attributes") {
          var parent = $(mutation.target).parent(),
            submenuWrapper = $(mutation.target).next(),
            submenu = submenuWrapper.children('ul');

          if($(mutation.target).attr('aria-expanded') == "true"){
            var calcHeight = 0;
            $('.appla').addClass('on');
            $('html').addClass('block-scrolling');
            $('.effect').css('margin-left', ($(mutation.target).offset().left - (50 * scale))+"px");
            $('.effect span').css('width', ($(mutation.target).innerWidth())+"px");

            submenuWrapper.children().each(function(){
              if(!$(this).is(':hidden')) calcHeight += $(this).innerHeight();
            });

            if(!submenu.children('.small-news-slider').is(':hidden') && submenu.children('.small-news-slider').length && submenu.children('.small-news-slider').children('.slider-wrapper').length){
              submenu.children('.small-news-slider').children('.slider-wrapper').slick('setPosition');
            }

            submenuWrapper.height(calcHeight);
          } else {
            submenuWrapper.height(0);

            if(!timeoutHolder) {
              $('.appla').addClass("close-menu").removeClass('on');
              $('html').removeClass('block-scrolling');
              setTimeout(function(){
                $('.appla').removeClass("close-menu");
              }, 20);
            }
          }
        }
      });
    });
    // animacja menu cd - 2
    $('#menu a[aria-expanded]').each(function() {
      observer.observe($(this).get(0), {
        attributes: true
      });
    });

    // otwieranie menu na mobile
    $('.js-toggle-menu').click(function(e){
      e.preventDefault();

      $('#menu').toggleClass('active');
      $(this).toggleClass('active');
      $('.appla').toggleClass('on');
      $('html').toggleClass('block-scrolling');

      if($('.appla').hasClass('on')){
        $('.appla').addClass('mobile-menu');
      }
    });

    // otwieranie submenu
    $('[role="menubar"]>li>a:not(.language)').click(function(e){
      e.preventDefault();
      var parent = $(this).parent(),
        submenu = $(this).next(),
        subLI = submenu.children(),
        _this = this;

      $('[role="menubar"]>li>a').not(this).parent().removeClass('active');

      if($('[role="menubar"] [aria-expanded="true"]').not(this).length){
        $('[role="menubar"] [aria-expanded]').not(this).attr('aria-expanded', 'false');
        $(_this).attr('aria-expanded', 'true');
        parent.toggleClass('active');
      } else {
        $(this).attr('aria-expanded', function(index, attr){
          return attr != "true"? "true" : 'false';
        });

        parent.toggleClass('active');

        $('.search-wrapper').removeClass('shown');
      }
    });

    // zamykanie menu
    $('[role="menubar"] .close').click(function(){
      $('.appla').removeClass('on').addClass("close-menu");
      $('[role="menubar"] [aria-expanded="true"]').next().height(0);
      $('[role="menubar"] [aria-expanded="true"]').attr('aria-expanded', 'false');
      $('[role="menubar"] li.active').removeClass('active');
      setTimeout(function(){
        $('html').removeClass('block-scrolling');
        $('.appla').removeClass("close-menu");
      }, 1000);
    });

    $('#menu, .tooltip').on('mouseenter', function(){
      clearTimeout(timeoutHolder);
      timeoutHolder = setTimeout(function(){
        if($('.search-call-to-action').hasClass('closed')){
          $('.search-call-to-action').fadeIn(400);
        }
      }, 100);
    });

    $('#menu').on('mouseleave', function(){
      clearTimeout(timeoutHolder);
      timeoutHolder = setTimeout(function(){
        if($('.search-call-to-action').hasClass('closed')){
          $('.search-call-to-action').fadeOut(400);
        }
      }, 100);
    });

    $('.js-hide-tooltip').click(function(){
      setCookie('removed-search-tooltip', 'true', 365);
      $('.search-call-to-action').remove();
    });

    $('.js-close-tooltip').click(function(){
      setCookie('hidden-search-tooltip', 'true');
      $('.search-call-to-action').addClass('closed').fadeOut(0);
    });

    $('.js-back-to-top').click(function(){
      $('html, body').animate({
        scrollTop: 0
      }, 500);
    });

    // if($(window).innerWidth() >= 1200) {
    //   $('.small-news-slider .slider-wrapper').each(function(){
    //     $(this).slick({
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       arrows: true,
    //       prevArrow: '<button class="prev in-circle" aria-label="Przewiń w lewo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
    //       nextArrow: '<button class="next in-circle" aria-label="Przewiń w prawo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
    //       appendArrows: $(this).next(),
    //       responsive: [
    //         {
    //           breakpoint: 1300,
    //           settings: {
    //             slidesToShow: 2,
    //             slidesToScroll: 2,
    //           }
    //         },
    //       ]
    //     });
    //   });
    // }

    $('.secondary-nav').addClass('primary-coloured'); // kolorowanie belki na kolor wiodący
    $(".tabs-nav a").each(function(){ // zmniejszanie czcionki na belce gdy napisy łamią się
      if($(this).children().height() > $(this).height()){
        $(".tabs-nav a").css('font-size', '12px');
        return false;
      }
    });

    $(window).on('scroll', function(){
      if($(window).scrollTop() > $(window).innerHeight()) {
        $('.search-call-to-action').fadeOut(500);
      } else {
        if(!$('.search-call-to-action').hasClass('closed')){
          $('.search-call-to-action').fadeIn(500);
        }
      }

      // pojawianie/ukrywanie przycisku przwiń do gry
      if($(window).scrollTop() > $('html').innerHeight() * 0.25) {
        $('.back-to-top').fadeIn(500, function(){
          $(this).css('display', 'inline-flex');
        });
      } else {
        $('.back-to-top').fadeOut(500);
      }
    });

    $('.submenu-wrapper').on('scroll', function(){ // ukrywanie elementów
      if($(window).innerWidth() > 1200) {
        if($(this).scrollTop() >= 100) {
          $('#top .logo-link').css('z-index', "5");
          $('.primary-nav .btn').css('z-index', "5");
          $('.primary-nav>ul>li.active>a:not([class])').css('z-index', "5");
        } else {
          $('#top .logo-link').css('z-index', "");
          $('.primary-nav .btn').css('z-index', "");
          $('.primary-nav>ul>li.active>a:not([class])').css('z-index', "");
        }
      }
    });

    $(window).resize(function(){
      clearTimeout(timeoutHolder);
      timeoutHolder = setTimeout(function(){
        if($(window).innerWidth() >= 1200) {
          var item = $('#menu>li>.js-toggle-search'),
          position = item.offset(),
          width = item.innerWidth() + 4;

          $('.search-call-to-action').css({
            top: 100 * scale,
            left: Math.ceil(position.left),
            opacity: 1
          });

          // slider z newsami - tez ze strony głównej też
          $('.small-news-slider .slider-wrapper').each(function(){
            $(this).slick({
              slidesToShow: 3,
              slidesToScroll: 3,
              arrows: true,
              prevArrow: '<button class="prev in-circle" aria-label="Przewiń w lewo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
              nextArrow: '<button class="next in-circle" aria-label="Przewiń w prawo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
              appendArrows: $(this).next(),
              responsive: [
                {
                  breakpoint: 1300,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                  }
                },
              ]
            });
          });

          if(getCookie('removed-search-tooltip') !== "") {
            $('.search-call-to-action').remove();
          } else if(getCookie('hidden-search-tooltip') !== "") {
            $('.search-call-to-action').addClass('closed').fadeOut(0);
          }

          if($('#menu [aria-expanded="true"]').length) {
            $('.effect').css('margin-left', ($('#menu [aria-expanded="true"]').offset().left - (50 * scale))+"px");
            $('.effect span').css('width', ($('#menu [aria-expanded="true"]').innerWidth())+"px");
          }
        } else {
          $('.small-news-slider .slider-wrapper').each(function(){
            if($(this).hasClass('slick-slider')){
              $(this).slick('destroy');
            }
          });

          if(!$('.mobile-bottom-menu').length) { // mobilne menu na dole ekranu
            $('#content').append('<div class="mobile-bottom-menu"></div>');

            if($('.podyplomowe').length && $('.section-banner').length) {
              $('.mobile-bottom-menu').addClass('apply-only');
              $('.mobile-bottom-menu').append($('.price-wrapper .btn:last-of-type').clone().addClass('w-100'));
            } else if($('.section-banner').length) {
              $('.mobile-bottom-menu').addClass('path-bg');
              $('.mobile-bottom-menu').append('<a href="#program"><i class="icon-program" aria-hidden="true"></i>Program</a>')
              $('.mobile-bottom-menu').append('<a href="#kariera"><i class="icon-career" aria-hidden="true"></i>Kariera</a>')
              $('.mobile-bottom-menu').append('<a href="#zespol"><i class="icon-team" aria-hidden="true"></i>Zespół</a>')
              $('.mobile-bottom-menu').append('<a href="#rekrutacja"><i class="icon-award" aria-hidden="true"></i>Rekrutacja</a>')
              $('.mobile-bottom-menu').append($('.price-wrapper .btn:last-of-type').clone().addClass('apply-btn'));
            } else if($('body').hasClass('wydzial')) {
              $('.mobile-bottom-menu').append($('[href="#zespol"]').clone());
              $('.mobile-bottom-menu').append($('[href="#jednostki"]').clone());
              $('.mobile-bottom-menu').append($('[href="#kolegium"]').clone());
              $('.mobile-bottom-menu').append($('[href="#kontakt"]').clone());
            } else if($('body').hasClass('instytut')) {
              $('.mobile-bottom-menu').append($('[href="#zespol"]').clone());
              $('.mobile-bottom-menu').append($('[href="#aktualnosci"]').clone());
              $('.mobile-bottom-menu').append($('[href="#awanse"]').clone());
              $('.mobile-bottom-menu').append($('[href="#kontakt"]').clone());
            } else if($('body').hasClass('centrum')) {
              $('.mobile-bottom-menu').append($('[href="#aktualnosci"]').clone());
              $('.mobile-bottom-menu').append($('[href="#zespol"]').clone());
              $('.mobile-bottom-menu').append($('[href="#projekty"]').clone());
              $('.mobile-bottom-menu').append($('[href="#kontakt"]').clone());
            }
          }
        }
      }, 150)
    });
  });
})(jQuery);
