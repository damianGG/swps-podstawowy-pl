'use strict';

(function($){
	$(document).ready(function(){
    var searchTabOffsets = [];

    // otwieranie wyszukiwarki
    $('.js-toggle-search').click(function(){
      if(!$('.search-wrapper').hasClass('shown')){
        $('.search-wrapper').addClass('shown');
        $('html').addClass('block-scrolling');
        $('[aria-expanded=true]').attr('aria-expanded', 'false');
        $('li.active').removeClass('active');
        $('.submenu-wrapper').height(0);

        setTimeout(function(){
          $('.appla').addClass('on'); // wait for attribute operations
        }, 50);
      } else {
        $('.appla').removeClass('on');
        $('.search-wrapper').removeClass('shown');
        $('html').removeClass('block-scrolling');
      }
    });

    // zakładki z wyszukiwarki desktop
    $('.tabs [href^="#"]').click(function(e){
      e.preventDefault();
      var target = $(this).attr('href');
      var h = 0;

      $('.tab-wrapper').innerHeight(0).removeClass('active');

      $('.tabs a').removeClass('active');
      $('.tab-active').css({
        left: $(this).parent().position().left,
        width: $(this).innerWidth()
      });

      $(target).children().each(function(){
        if(!$(this).is(':hidden')) h += $(this).innerHeight();
      });

      h += 5; //border
      $(target).addClass('active').height(h);
      $(this).addClass('active');
    }); //wyszukiwarka

    // belki z wyszukiwarki mobile
    $('.tab-wrapper h3').click(function(){
      var tab = $(this).parent();
      var h = 0;

      $('.tab-wrapper:not(#'+tab.attr('id')+')').removeClass('active').each(function(){
        $(this).innerHeight($(this).children('h3').innerHeight());
      });

      tab.toggleClass('active');
      if(tab.hasClass('active')){
        tab.children().each(function(){
          h += $(this).innerHeight();
        });

        h += 5; //border

        $('.search-wrapper').animate({
          scrollTop: searchTabOffsets[tab.attr('id')]
        }, 500);
      }
      tab.height(h);
    });

    $('.tab-wrapper').each(function(){
      searchTabOffsets[$(this).attr('id')] = Math.floor($(this).position().top + 118);
    });

    // otwieranie wyszukiwarki z otwartą zakładką z "data-tab-name"
    $('.js-open-search-tab').click(function(e){
      e.preventDefault();
      var tabName = $(this).attr('data-tab-name');
      $('[href="'+tabName+'"]').click();
    });

    if($(window).innerWidth() > 1199) {
      $('.search-wrapper .tabs a').first().click();
    } else {
      $('.tab-wrapper.active').removeClass('active');
      $('.tab-wrapper').each(function(){
        $(this).innerHeight($(this).children('h3').innerHeight());
      });
    }
  });
})(jQuery);
