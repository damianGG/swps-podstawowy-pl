'use strict';

(function($){
	$(document).ready(function(){

    $('[name="check-all"]').change(function(){
      var isChecked = $(this).prop('checked');

      $(this).parent().siblings('.checkbox').children('input').prop('checked', isChecked);
    });

    // obsługa focus
    $('input[type="text"], input[type="url"], input[type="email"], input[type="number"], input[type="password"]').change(function(){
      if($(this).val().trim() !== "") {
        $(this).addClass('filled');
      } else {
        $(this).removeClass('filled');
      }
    });

    // wyświetlanie nazwy pliku
    $('body').on('change', '.file-input-wrapper [type="file"]', function(){
      var value = $(this).val().split('\\');
      $(this).siblings('span:not([class])').text(value[value.length-1]);
    });

    // wywołanie popupu do wyboru pliku
    $('body').on('click', '.file-input-wrapper .btn', function(e){
      e.preventDefault();
      e.stopPropagation();
      $(this).siblings('[type="file"]').click();
    });

    // wrzucanie styli do radio buttonów z mautica
    $('.mauticform-radiogrp-row').each(function(){
      if(!$(this).parents('.ios-toggle').length){
        $(this).children('label')
          .addClass('radio')
          .wrapInner('<span class="value"></span>');

        $(this).children('label').prepend($(this).children('input'));
      }
    });

    // wrzucanie styli do checkboxów z mautica
    $('.mauticform-checkboxgrp-row').each(function(){
      $(this).children('label')
        .addClass('checkbox path')
        .wrapInner('<span class="value"></span>');

      $(this).children('label')
        .prepend('<svg viewBox="0 0 21 21"><path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path></svg>')
        .prepend($(this).children('input'));
    });

    // $('.mauticform-checkboxgrp-row [type="checkbox"]').focus(function(){
    //   $(this).parent().focus();
    // });
    //
    // $('.mauticform-checkboxgrp-row [type="checkbox"]').blur(function(){
    //   $(this).parent().blur();
    // });

    // wrzucanie styli do pola wyboru z mautica
    $('.mauticform-file').each(function(){
      $(this).addClass('file-input-wrapper');
      $(this).children('.mauticform-label').addClass('btn');
      $(this).children('.mauticform-label').append('<i class="icon-upload" aria-hidden="true"></i>');
      $(this).append('<span>nie wybrano pliku</span>');
    });

    // $('.mauticform-select select').addClass('input-field');
    $('.mauticform-select select').select2();

    $('.mauticform-button-wrapper').addClass('text-center');
    if(!$('.biogram').length) {
      $('.mauticform-button-wrapper').children('button').addClass('w-25');
    }


    // obsługa ios toggle na konferecjach
    $('.ios-toggle-radio [type="radio"]').click(function(){
      var radioGroup = $(this).parents('.ios-toggle-radio');
      // var iosToggle = radioGroup.children('.ios-toggle');

      if($(this).parent().prev('.ios-toggle').length){
        radioGroup.addClass('to-right');
      } else {
        radioGroup.removeClass('to-right');
      }
    });

    $('.ios-toggle-radio .ios-toggle').click(function(){
      var radioGroup = $(this).parents('.ios-toggle-radio');
      radioGroup.toggleClass('to-right');
    });

  });
})(jQuery);
