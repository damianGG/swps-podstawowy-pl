'use strict';

(function($){
	$(document).ready(function(){
    var timeoutHolder;
    var scale = $('html').css('font-size').replace('px', '') / 16;

    // dodanie kontrolek
    $('.main-slider .slider-wrapper').on('init', function(event, slick){
      var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

      $(this).parents('.main-slider').find(".slide-counter").remove();
      $(this).parents('.main-slider').find('.slider-controls .container').append('<span class="slide-counter"><span class="current-slide">1</span>/'+slideCount+'</span>')
    });

    // główny slider
    $('.main-slider .slider-wrapper').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      infinite: false,
      speed: 750,
      prevArrow: '<button class="prev" aria-label="Przewiń w lewo"><i class="icon-arrow" aria-hidden="true"></i></button>',
      nextArrow: '<button class="next" aria-label="Przewiń w prawo"><i class="icon-arrow" aria-hidden="true"></i></button>',
      appendArrows: $('.main-slider .slider-controls .container'),
      dots: true,
      appendDots: $('.main-slider .slider-controls .container'),
    });

    // animacje
    $('.main-slider .slider-wrapper').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      var prevSlide = $('.slide-content.active').not('[data-i="'+nextSlide+'"]');
      $(this).parents('.main-slider').css("background-position-x", ((nextSlide+1) * 25)+"%");
      $(this).parents('.main-slider').find(".slide-counter .current-slide").text(nextSlide+1);

      setTimeout(function(){
        prevSlide.removeClass('active').removeClass('out');
      }, 1000);
      prevSlide.addClass('out');
      $('.slide-content[data-i="'+nextSlide+'"]').addClass('active');
    });

    $(window).resize(function(){
      clearTimeout(timeoutHolder);
      timeoutHolder = setTimeout(function(){
        if($(window).innerWidth() >= 1200) {
          if($('.front-page .small-news-slider').length) {
            //ustawianie slidera z newsami
            var leftGap = $('.slider-controls .container').offset().left + parseFloat($('.slider-controls .container').css("padding-left"));
            $('.front-page .small-news-slider').css({
              'display': 'block',
              'left': (leftGap/16)+"rem"
            });
          }

          $('.main-slider .slide').each(function(){
            var bg = $(this).css('background-image');
            bg = bg.replace("-mobile.png", ".webp");
            $(this).css('background-image', bg);
          });

          $('.main-slider .slide-content').each(function(i){
            $('.slider-content').append($(this));
          });

          $('.main-slider + .small-news-slider').on('init', function(){
            // ustawianie podpisów na sliderze głównym
            $('.slide-content .caption').css({
              bottom: $('.main-slider + .small-news-slider').height()+'px',
              display: 'block'
            });
          });
        } else {
          $('.main-slider .slide').each(function(){
            var bg = $(this).css('background-image');
            if(bg.search("-mobile.png") == -1) bg = bg.replace(".webp", "-mobile.png");
            $(this).css('background-image', bg);
          });

          $('.main-slider .slide').each(function(i){
            $(this).append($('.slide-content[data-i="'+i+'"]'));
          });

          $('.front-page .small-news-slider').css('left', '');
        }

        if($(window).innerWidth() < 500) {
          $('.slide-content').each(function(){
            var h2 = $(this).children().children('h2'),
            text = h2.text();
            if(text.length > 12 && !h2.children('small').length) { // zmniejszenie teksty gdy jest długi
              h2.wrapInner('<small></small>');
            }
          });
        }
      }, 150);
    });
  });
})(jQuery);
