'use strict';

(function($) {
  $(document).ready(function(){
    $('.photo-slider .slider-wrapper').slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      prevArrow: '<button class="prev in-circle" aria-label="Przewiń w lewo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
      nextArrow: '<button class="next in-circle" aria-label="Przewiń w prawo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
      dots: true,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            centerMode: true,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
           breakpoint: 1300,
           settings: {
             arrows: false,
             centerMode: true,
             centerPadding: 0,
             slidesToShow: 2,
             slidesToScroll: 2,
           }
        },
      ]
    });

    if($('.event-info-wrapper').length) {
      $('.single-article').addClass('conference');
      $('article>header').after($('.event-info-wrapper').addClass('container narrow-container'));
      $('.event-info-wrapper').wrap('<div class="event-info"></div>');
      $('.event-info-wrapper a').addClass('btn');
      $('.box.button .fa').remove();
    }

    $(window).scroll(function(){
      var scroll = $(window).scrollTop();

      if(scroll > $('article header').innerHeight() - 56){
        $('.event-info').addClass('full-bg');
      } else {
        $('.event-info').removeClass('full-bg');
      }
    });

    $(window).resize(function(){
      if(window.innerWidth < 600) {
        $('.author').each(function(){
          $(this).append($(this).find(".author-desc"));
        });
      } else {
        $('.author').each(function(){
          $(this).children('div').append($(this).find(".author-desc"));
        });
      }
    });
  });
})(jQuery);
