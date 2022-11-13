'use strict';
var timeoutHolder, accordionIterator = 0;
(function($){
	$(document).ready(function(){
    // zamykanie filmow z yt w kontener rwd
    $("iframe[src*='youtube.com']").each(function() {
      $(this).wrapAll('<div class="video-container"></div>');
    });

    // zamykanie menu, wyszukiwarki i lioghtboxa po kliknięciu w apple
    $('body').on('click', '.appla', function(){
      $(this).removeClass('on');
      $('.search-wrapper').removeClass('shown');
      $('html').removeClass('block-scrolling');
      $('[aria-expanded=true]').attr('aria-expanded', 'false');
      $('li.active').removeClass('active');
      $('.submenu-wrapper').height(0);
      $('.search-call-to-action').remove();
      $('.mauticform').removeClass('on');
    });

    // zmiana zakladek w section-background
    $('.js-tab-selection').select2();
    $('.js-tab-selection').change(function(){
      var val = $(this).val(),
        tabs = $(this).parent().siblings('.main-content').children('.tab'),
        activeTab = $(this).parent().siblings('.main-content').children('.'+val);

      tabs.removeClass('active');
      activeTab.addClass('active');
    });

    // otwieranie/zamykanie filtrów na stronach wyników wyszukiwania
    $('.js-toggle-filters').click(function(){
      var h = 0;

      if(!$('.search-filters').height()){
        $('.search-filters').children().each(function(){
          h += $(this).innerHeight();
        });
        $('.search-filters').height(h);
      } else {
        $('.search-filters').height(0);
      }
    });

    // rozwijanie kontaktu
    $('.js-expand-contact').click(function(){
      var expandedContent = $(this).siblings('.expanded-contact'),
      firstColumn = expandedContent.children(":first-child").innerHeight(),
      secondColumn = expandedContent.children(":last-child").innerHeight();

      if(expandedContent.height() == 0) {
        $(this).addClass('active').html('zobacz mniej informacji <span>&laquo;</span>');
        if($(window).innerWidth() >= 1200){
          if(firstColumn > secondColumn){
            expandedContent.height(firstColumn);
          } else {
            expandedContent.height(secondColumn);
          }
        } else {
          expandedContent.height(firstColumn+secondColumn);
        }
        // expandedContent.css('flex', '1 0');
      } else {
        $(this).removeClass('active').html('zobacz więcej informacji <span>&laquo;</span>');
        expandedContent.height(0);
        // expandedContent.css('flex', '0');
      }
    });

    $('.faq-wrapper button').each(function(e){
      $(this).attr('aria-expanded', 'false');
      $(this).attr('id', 'accordion'+accordionIterator);
      $(this).siblings().attr('aria-labelledby', 'accordion'+accordionIterator++);
    });

    $('.faq-wrapper button').click(function(e){
      e.preventDefault();
      var h = 0;

      $(this).attr('aria-expanded', 'true');
      if(!$(this).hasClass('opened')){
        if($(this).parent().parent('.multifaq-wrapper').length){
          $(this).parent().siblings('.faq-wrapper').children('button').attr('aria-expanded', 'false').removeClass('opened');
          $(this).parent().siblings('.faq-wrapper').children('div').height(0);
        }

        $(this).addClass('opened');
        $(this).siblings().children().each(function(){
          h += $(this).innerHeight();
        });
        $(this).siblings().height(h);
      } else {
        $(this).removeClass('opened');
        $(this).siblings().height(0);
        $(this).attr('aria-expanded', 'false');
      }
    });

    // dodawanie ikonek do wizytówek biogramów
    $('.card-wrapper .ppl-card [href^="mailto:"], .coworkers .ppl-card [href^="mailto:"]').addClass('email icon-mail');
    $('.ppl-card.no-email').children('div').prepend('<span class="email icon-mail"></span>');

    tippy('.ppl-card a.email, .big-ppl a.email', {
      content: $('html[lang="pl-pl"]').length? 'Wyślij wiadomość' : "Send Message",
    });

    tippy('.has-biogram a.bio, .big-ppl a.bio', {
      content: $('html[lang="pl-pl"]').length? 'Zobacz biogram' : "View biogram",
    });

    $('.recruitment-status').addClass('shown'); // animacja statusu z widoku kierunek
    if($('.secondary-nav').lenght){
      $('.secondary-nav').attr('id', 'secondary-menu')
    } else {
      $('[href="#secondary-menu"]').remove(); // remove skip link
    }

    $('.sticky-nav a[href*="#"], .section a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
      var target = $(this.hash);

      if($(this).parents('.tabs').length) return;
      if (target.length) {
        var scale = $('html').css('font-size').replace('px', '') / 16;
        var pxPerSec = 2500 * scale,
          position = $(window).scrollTop() < target.offset().top?
            $(window).scrollTop() : $(window).scrollTop() + $(window).innerHeight(),
          distance = Math.abs(position - target.offset().top),
          time = (distance/pxPerSec) * 1000; // liczenie czasu scrollowania na podstawie odległości od celu

        event.preventDefault();

        $('html, body').animate({
          scrollTop: target.offset().top - (scale * 140)
        }, time);
      }
    });

    $('.banner-slider').each(function(){
      $(this).slick({
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button class="prev in-circle" aria-label="Przewiń w lewo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
        nextArrow: '<button class="next in-circle" aria-label="Przewiń w prawo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
        responsive: [
          {
            breakpoint: 600,
            settings: {
              arrows: false
            }
          },
        ]
      });
    });

    $(window).on('resize', function(){
      clearTimeout(timeoutHolder);
      timeoutHolder = setTimeout(function(){
        $('.search-wrapper form>.btn').each(function(){
          $(this).wrap('<div class="fixed-wrapper"></div>');
        });

        if($(window).innerWidth() >= 1200) {
          // skalowanie obrazkw na wyższe rozdzielczości
          $('img').each(function(){
            var w = $(this).attr('width'),
              h = $(this).attr('height');

            if(w) {
              $(this).css('width', w/16+"rem");
            }
            if(h) {
              $(this).css('height', h/16+"rem");
            }
          });

          // przestawianie elementów na desktop
          $('.big-card').each(function(){
            var items = $(this).children('.temp-wrapper').children();

            $(this).children('div:first-of-type').prepend(items);
            $(this).children('div:first-of-type').append(items.last());
            $(this).children('.temp-wrapper').remove();
          });
        } else {
          // przestawianie elementów na mobile
          $('.big-card').each(function(){
            if(!$(this).children('.temp-wrapper').length) {
              $(this).children('div:first-of-type').after('<div class="temp-wrapper"></div>');
              $(this).children('.temp-wrapper').append($(this).children('div:not([class])').children(":not(a)"));
            }
          });
        }
      }, 200);
    });

    $(window).resize();
  });
})(jQuery);

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
