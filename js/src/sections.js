'use strict';

(function($) {
  $(document).ready(function(){
    var timeoutHolder;

    var cBoxWidth = $(window).innerWidth() * 0.8;
    var cBoxHeight = Math.ceil((cBoxWidth * 9) / 16);

    $('.news-slider, .section-columns-slider .slider-wrapper').each(function(){
      var slides = +$(this).attr('data-slide-count');
      slides = slides || 3;

      $(this).slick({
        adaptiveHeight: true,
        slidesToShow: slides,
        slidesToScroll: slides,
        prevArrow: '<button class="prev in-circle" aria-label="Przewiń w lewo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
        nextArrow: '<button class="next in-circle" aria-label="Przewiń w prawo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
        dots: true,
        responsive: [
          {
            breakpoint: 1300,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
            }
          },
        ]
      });
    });

    // slider z ludzmi
    $('.ppl-slider').each(function(){
      var _this = this;
      var filters = [];
      var slider = $(this).find('.card-wrapper');

      $(this).children('.title').append('<div class="slider-controls"></div>');

      // wyciaganie mozliwosci filtrow
      $(this).find('.biogramAdv').each(function(){
        var occ = $(this).attr('data-occupation');
        if (occ) filters.push(occ);
      });
      filters = new Set(filters.sort()); // usuniecie unikatow
      if(filters.size) {
        $(this).find('.slider-controls').before('<div class="filters"></div>');
        $(this).find('.filters').append('<p class="color-grey p2">Filtruj wg. stanowisk</p>');
        $(this).find('.filters').append('<button class="btn btn-tag filter-active" data-ppl-filter="all">Wszystkie</button>');
      }
      // budowanie filtrow
      filters.forEach(function(item, i){
        var itemLabel = item;
        itemLabel = itemLabel[0].toUpperCase() + itemLabel.slice(1);
        itemLabel = itemLabel.replace('-', ' ');
        $(_this).find('.filters').append('<button class="btn btn-tag" data-ppl-filter="'+item+'">'+itemLabel+'</button>');
      });

      slider.on('init', function(event, slick){
        var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

        $(this).parents('.section').find(".slide-counter").remove();
        $(this).parents('.section').find('.slider-controls').append('<span class="slide-counter"><span class="current-slide">1</span>/'+slideCount+'</span>')
      });

      slider.slickFilterable({
          filterName: 'ppl-filter',
          // beforeFilter: function(category, slider, slides) {
          //   slides.removeClass('hidden');
          //   if(category !== "all") {
          //     slides.not('.'+category).addClass('hidden');
          //   }
          // },
          filter: function(category, slider, settings) {
            return $(this).attr('data-occupation') == category;
          },
          slick: {
            adaptiveHeight: true,
            arrows: true,
            rows: 5,
            slidesPerRow: 2,
            prevArrow: '<button class="prev" aria-label="Przewiń w lewo"><i class="icon-arrow"></i></button>',
            nextArrow: '<button class="next" aria-label="Przewiń w prawo"><i class="icon-arrow"></i></button>',
            appendArrows: $(this).find('.slider-controls'),
            responsive: [
              {
                breakpoint: 992,
                settings: {
                  rows: 3,
                  slidesPerRow: 2,
                }
              },
              {
                breakpoint: 600,
                settings: {
                  rows: 3,
                  slidesPerRow: 1,
                }
              }
            ]
          }
      });

      slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $(this).parents('.section').find(".slide-counter .current-slide").text(nextSlide+1);
      });

      slider.on('breakpoint', function(event, slick, breakpoint){
        var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

        if(slideCount > 1) {
          $(this).parents('.section').find(".slide-counter").html('<span class="current-slide">1</span>/'+slideCount);
        } else {
          $(this).parents('.section').find(".slide-counter").html('');
        }
      });
    });

    // slider jednostki - na pełna strone
    $('.section-full-width-slider .slider-wrapper').each(function(){
      var _this = this;

      $(this).siblings('.slider-table-of-contents').children().children('nav').children().children().children('a').click(function(e){
        e.preventDefault();
        $('.slider-table-of-contents').toggleClass('shown');
        $(_this).slick('slickGoTo', +$(this).attr('data-id'), true);
      });

      $(this).on('init', function(event, slick){
        var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;
        var prevText = $(this).parents('.section').find('[data-id="'+(slideCount - 1)+'"]').text();
        var nextText = $(this).parents('.section').find('[data-id="1"]').text();

        if(slideCount > 1) {
          $(this).parents('.section').find('.outer-wrapper').prepend('<div class="container counter-container"><span class="slide-counter"><span class="current-slide">1</span>/'+slideCount+'</span></div>')
        }

        $(this).parents('.section').find('.prev span').text(prevText);
        $(this).parents('.section').find('.next span').text(nextText);
      });

      $(this).slick({
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: true,
        prevArrow: '<button class="prev in-circle" aria-label="Przewiń w lewo"><span></span><i class="icon-cheveron" aria-hidden="true"></i></button>',
        nextArrow: '<button class="next in-circle" aria-label="Przewiń w prawo"><span></span><i class="icon-cheveron" aria-hidden="true"></i></button>',
        appendArrows: $(this).next().children(),
        infinite: $(this).children('.slide').length < 3? false : true
      });

      $(this).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $(this).parents('.section').find(".slide-counter .current-slide").text(nextSlide+1);
      });

      $(this).on('afterChange', function(event, slick, currentSlide){
        var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;
        var prev = currentSlide-1 > -1? currentSlide-1 : slideCount-1;
        var next = currentSlide+1 >= slideCount? 0 : currentSlide+1;
        var prevText = $(this).parents('.section').find('[data-id="'+prev+'"]').text();
        var nextText = $(this).parents('.section').find('[data-id="'+next+'"]').text();

        $(this).parents('.section').find('.prev span').text(prevText);
        $(this).parents('.section').find('.next span').text(nextText);
      });

      $(this).on('breakpoint', function(event, slick, breakpoint){
        var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

        if(slideCount > 1) {
          $(this).parents('.section').find(".slide-counter").html('<span class="current-slide">1</span>/'+slideCount);
        } else {
          $(this).parents('.section').find(".slide-counter").html('');
        }
      });
    });

    // spis treści do slidera powyżej
    $('.js-toggle-table-of-contents').click(function(){
      $(this).parents('.section').find('.slider-table-of-contents').toggleClass('shown');
    });

    // slider z dużymi kartami (klasa big-card)
    $('.section-one-column-slider:not(.video-slider)').each(function(){
      var slider = $(this).find('.slider-wrapper');

      slider.on('init', function(event, slick){
        var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

        $(this).parents('.section').find(".slide-counter").remove();
        $(this).parents('.section').find('.slider-controls').append('<span class="slide-counter"><span class="current-slide">1</span>/'+slideCount+'</span>')
      });

      slider.slickFilterable({
          filterName: 'filter-heading',
          filter: function(category, slider, settings) {
            return $(this).attr('data-occupation') == category;
          },
          slick: {
            slidesPerRow: 1,
            rows: 5,
            adaptiveHeight: true,
            arrows: true,
            prevArrow: '<button class="prev" aria-label="Przewiń w lewo"><i class="icon-arrow" aria-hidden="true"></i></button>',
            nextArrow: '<button class="next" aria-label="Przewiń w prawo"><i class="icon-arrow" aria-hidden="true"></i></button>',
            appendArrows: $(this).find('.slider-controls'),
            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  rows: 4,
                }
              },
              {
                breakpoint: 992,
                settings: {
                  rows: 3,
                }
              }
            ]
          }
      });

      slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $(this).parents('.section').find(".slide-counter .current-slide").text(nextSlide+1);
      });

      slider.on('breakpoint', function(event, slick, breakpoint){
        var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

        if(slideCount > 1) {
          $(this).parents('.section').find(".slide-counter").html('<span class="current-slide">1</span>/'+slideCount);
        } else {
          $(this).parents('.section').find(".slide-counter").html('');
        }
      });
    });

    // slider z kaflami do filmw YT
    $('.video-slider').each(function(){
      var slider = $(this).children().children('.slider-wrapper');

      slider.on('init', function(event, slick){
        var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

        $(this).parents('.section').find(".slide-counter").remove();
        $(this).parents('.section').find('.slider-controls').append('<span class="slide-counter"><span class="current-slide">1</span>/'+slideCount+'</span>')
      });

      slider.slick({
        slidesPerRow: 1,
        rows: 5,
        adaptiveHeight: true,
        arrows: true,
        prevArrow: '<button class="prev" aria-label="Przewiń w lewo"><i class="icon-arrow"></i></button>',
        nextArrow: '<button class="next" aria-label="Przewiń w prawo"><i class="icon-arrow"></i></button>',
        appendArrows: $(this).find('.slider-controls'),
        // mobileFirst: true,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              rows: 1,
              slidesPerRow: 1,
              centerMode: true,
              arrows: false,
            }
          }
        ]
      });

      slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $(this).parents('.section').find(".slide-counter .current-slide").text(nextSlide+1);
      });

      slider.on('breakpoint', function(event, slick, breakpoint){
        var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

        if(slideCount > 1) {
          $(this).parents('.section').find(".slide-counter").html('<span class="current-slide">1</span>/'+slideCount);
        } else {
          $(this).parents('.section').find(".slide-counter").html('');
        }
      });
    });

    // slider z ludźmi 2 - bez filtrów
    $('.section-collegium .slider-wrapper .card-wrapper').each(function(){
      $(this).on('init', function(event, slick){
        var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

        if(slideCount > 1) {
          $(this).prev().append('<span class="slide-counter"><span class="current-slide">1</span>/'+slideCount+'</span>')
        }
      });

      $(this).slick({
        adaptiveHeight: true,
        arrows: true,
        rows: 5,
        slidesPerRow: 2,
        prevArrow: '<button class="prev" aria-label="Przewiń w lewo"><i class="icon-arrow" aria-hidden="true"></i></button>',
        nextArrow: '<button class="next" aria-label="Przewiń w prawo"><i class="icon-arrow" aria-hidden="true"></i></button>',
        appendArrows: $(this).prev(),
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              rows: 3,
              slidesPerRow: 2,
            }
          },
          {
            breakpoint: 600,
            settings: {
              rows: 3,
              slidesPerRow: 1,
            }
          },
        ]
      });

      $(this).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $(this).prev().find(".slide-counter .current-slide").text(nextSlide+1);
      });

      $(this).on('breakpoint', function(event, slick, breakpoint){
        var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

        if(slideCount > 1) {
          $(this).find(".slide-counter").html('<span class="current-slide">1</span>/'+slideCount);
        } else {
          $(this).find(".slide-counter").html('');
        }
      });
    });

    // slider z publikacjami
    $('.publication-slider').each(function(){
      $(this).on('init', function(event, slick){
        var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

        if(slideCount > 1) {
          $(this).siblings('.slider-controls').append('<span class="slide-counter"><span class="current-slide">1</span>/'+slideCount+'</span>')
        }
      });

      $(this).slick({
        adaptiveHeight: true,
        arrows: true,
        rows: 5,
        slidesPerRow: 1,
        prevArrow: '<button class="prev" aria-label="Przewiń w lewo"><i class="icon-arrow" aria-hidden="true"></i></button>',
        nextArrow: '<button class="next" aria-label="Przewiń w prawo"><i class="icon-arrow" aria-hidden="true"></i></button>',
        appendArrows: $(this).siblings('.slider-controls'),
      });

      $(this).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $(this).prev().find(".slide-counter .current-slide").text(nextSlide+1);
      });

      $(this).on('breakpoint', function(event, slick, breakpoint){
        var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

        if(slideCount > 1) {
          $(this).find(".slide-counter").html('<span class="current-slide">1</span>/'+slideCount);
        } else {
          $(this).find(".slide-counter").html('');
        }
      });
    });

    $('.section-sticky-aside, .section-axis').each(function(){
      if($(this).children('.main-content').length) {
        $(this).children().wrapAll('<div class="container flex-container"></div>');
        $(this).removeClass('container');
      }
    });

    // zakładki na podyplomowych
    $('body').on('click', '.tabs-nav a, .tab-trigger', function(e){
      e.preventDefault();
      var target = $(this).attr('href');

      if($(target).length){
        var h = 0;

        if($(this).hasClass('active') && $(window).innerWidth() < 1200) {
          $(this).removeClass('active');
          $('.section-tab').removeClass('section-active').height(h);
        } else {
          $('.tabs-nav a').removeClass('active');
          $('.section-tab').removeClass('section-active').height(h);
          $(this).addClass('active');

          $('.tabs-nav .div-effect').css({
            left: $(this).parent().position().left,
            width: $(this).innerWidth()
          });

          $(target).children().each(function(){
            h += $(this).innerHeight();
          });
          $(target).addClass('section-active').height(h);
        }
      }
    });

    // automatyczne pobieranie miniaturek z YT
    $('.video-card').each(function(){
      var href = $(this).attr('href').split('?')[0].split('/'),
        videoID = href[href.length-1];
      $(this).children('img').attr('src', 'https://i3.ytimg.com/vi/'+videoID+'/hqdefault.jpg');
    });

    $('.section .title h2').each(function(){
      if(!$(this).children(':not(br)').length) {
        $(this).wrapInner('<span class="main-title"></span>');
      }
    });

    // lightbox u ludzi "czytaj więcej"
    $('.ppl-card .read-more').each(function(){
      $(this).siblings('.read-more-content').prepend($(this).siblings('.imie-i-nazwisko').clone());
      $(this).colorbox({
        rel: 'ppl-card',
        scrolling: false,
        width: "60%",
        // initialHeight: 1,
        // height: 184,
        // innerHeight: 184,
        maxHeight: "60%",
        current: "{current} z {total}",
        previous: "",
        next: "",
        close: "",
        html: '<img src="" alt="" /><div></div>',
        inline: true,
        href: $(this).siblings('.read-more-content'),
        onOpen:function(){
          $('html').addClass('block-scrolling');
          $('#colorbox').addClass('ppl-lightbox');
        },
        onLoad: function(){
          $('#cboxClose').addClass('close');
        },
        onClosed:function(){
          $('html').removeClass('block-scrolling');
        },
        onComplete: function(){
          $('#cboxLoadedContent').prepend('<img src="'+$(this).parent().prev().attr('src')+'" alt="">');
        }
      });
    });

    // slider ze zdjeciami różnej szerokości
    $('.variable-slider .slider-wrapper').each(function(){
      $(this).slick({
        adaptiveHeight: true,
        arrows: true,
        slidesToShow: 1,
        variableWidth: true,
        prevArrow: '<button class="prev" aria-label="Przewiń w lewo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
        nextArrow: '<button class="next" aria-label="Przewiń w prawo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
        appendArrows: $(this).siblings('.slider-controls'),
      });
    });

    // slider z logotypami z landingów
    $('.section-logo-slider .slider-wrapper').each(function(){
      $(this).slick({
        adaptiveHeight: true,
        arrows: true,
        slidesPerRow: 3,
        rows: 2,
        prevArrow: '<button class="prev" aria-label="Przewiń w lewo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
        nextArrow: '<button class="next" aria-label="Przewiń w prawo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
        appendArrows: $(this).siblings('.slider-controls'),
        responsive: [
          // {
          //   breakpoint: 1200,
          //   settings: {
          //     rows: 2,
          //     slidesPerRow: 2,
          //   }
          // },
          {
            breakpoint: 480,
            settings: {
              rows: 2,
              slidesPerRow: 2,
            }
          },
        ]
      });
    });


    // zakładki konferencja
    $('.section-timetable .nav-tabs a').click(function(e){
      e.preventDefault();
      var href = $(this).attr('href');

      $(this).parents('.nav-tabs').children('.effect').css({
        left: $(this).parent().position().left,
        width: $(this).parent().innerWidth(),
      });

      $('.tabs-wrapper').children().removeClass('active');
      $('.tabs-wrapper').children(href).addClass('active');
    });

    $('.section-timetable .nav-tabs a').first().click();

    $('.secondary-nav li:last-child>.btn').attr('href', $('.price-wrapper .btn-large').attr('href')); // podmiana linku na podyplomowych
    $('.secondary-nav .m-l-auto a.btn').fadeOut(0); // wywalenie przycisku na podyplomowych

    $(window).resize(function(){
      clearTimeout(timeoutHolder);
      timeoutHolder = setTimeout(function(){
        if(window.innerWidth < 769){
          if($('.section-hero').length){
            $('.section-hero>div:first-child').prepend($('div.breadcrumbs'));
            $('.section-hero h2').after($('.section-hero img'));
          } else {
            $('.secondary-sections>section:first-of-type').prepend($('div.breadcrumbs'));
          }

          $('.card-wrapper .ppl-card').each(function(){
            if(!$(this).children('.biogram-links').length){
              $(this).children().find('a.email, a.bio').wrapAll('<div class="biogram-links"></div>');
              $(this).append($(this).find('.biogram-links'));
            }
          });

          $('.section-full-width-slider .container').each(function(){
            var btn = $(this).children('div').first().find('.btn');
            $(this).children('div').last().append(btn);
          });

          $('.slick-slide:not(.slick-cloned) .video-card').colorbox.remove();
        } else {
          var firstSection = $('.secondary-sections>section:first-of-type');

          firstSection.prepend($('div.breadcrumbs'))

          $('.section-hero>div:last-child').append($('.section-hero img'));

          $('.card-wrapper .ppl-card').each(function(){
            $(this).children('div').prepend($(this).find('a.email, a.bio'));
            $(this).find('.biogram-links').remove();
          });

          $('.section-full-width-slider .container').each(function(){
            var btn = $(this).children('div').last().find('.btn');
            $(this).children('div').first().append(btn);
          });

          // lightbox z filmami YT
          $('.slick-slide:not(.slick-cloned) .video-card').colorbox({
            // iframe:true,
            rel: 'video-card',
            scrolling: false,
            width: cBoxWidth - 35,
            height: cBoxHeight,
            current: "{current} z {total}",
            previous: "",
            next: "",
            close: "",
            onOpen:function(){
              $('html').addClass('block-scrolling');
            },
            onLoad: function(){
              $('#cboxClose').addClass('close');
            },
            onClosed:function(){
              $('html').removeClass('block-scrolling');
            },
            onComplete: function(){
              $('#cboxLoadedContent').html('<div class="video-container"><iframe width="560" height="315" src="'+$(this).attr('href')+'" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>');
            }
          });
        }

        // pprzestawianie przycisków na mobile
        if(window.innerWidth < 992) {
          $('.section-rules .main-content').append($('.section-rules .title .btn'));
          $('.section-ranking .main-content').append($('.section-ranking .title .btn'));
          $('.video-slider .main-content').append($('.video-slider .title .btn'));
        } else {
          $('.section-rules .title').append($('.section-rules .main-content .btn'));
          $('.section-ranking .title').append($('.section-ranking .main-content .btn'));
          $('.video-slider .title').append($('.video-slider .main-content .btn'));
        }
      }, 150);
    });
  });
})(jQuery);
