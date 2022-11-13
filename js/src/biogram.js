'use strict';

// JavaScript Document
(function($){
	$(document).ready(function(){
    var timeoutHolder;

		$('.bio-lang a').append('Bio in English');
		$('.pakiet, .zapytaj').addClass('btn');
		$('.zapytaj').addClass('btn-ghost');

		var prawnikTrawnik = $('.prawnik-trawnik .field-value').text();
		$('.biogram-naglowek').each(function(){
			$(this).children().wrapAll('<div class="inner"></div>');
			$(this).find('.img').append($(this).find('ul.linki'));
			if (prawnikTrawnik != '') {
				$('<div class="prawnik-trawnik">' + prawnikTrawnik  + '</div>').insertAfter( $(this).find('.email') );
				if ($(this).find('.email').length == 0) {
					$('<div class="prawnik-trawnik">' + prawnikTrawnik  + '</div>').insertBefore( $(this).find('.stanowisko') );
				}
			}
			if($('[itemtype].biogram:not(.biogram-no-content)').length) {
        $(this).append('<div class="inner" id="inner-2"><div></div></div>');
      }
		});

    // // $('.funkcja.funkcja-instytut').each(appendToOccupation);
    // // $('.funkcja.funkcja-centrum').each(appendToOccupation);
    // // $('.funkcja.funkcja-wydzial').each(appendToOccupation);
    // // $('.funkcja.funkcja-katedra').each(appendToOccupation);
    //
    $('.stanowisko').html('');
    if($('.funkcja.funkcja-uczelnia').length) {
      $('.stanowisko').append('<span>'+$('.funkcja.funkcja-uczelnia').children().text()+'</span><br>');
    }
    var instituteField = $('.funkcja.funkcja-instytut').children().children().children();
    var centerField = $('.funkcja.funkcja-centrum').children().children().children();
    var departmentField = $('.funkcja.funkcja-wydzial').children().children().children();
    var cathedralField = $('.funkcja.funkcja-katedra').children().children().children();

    var max1 = instituteField.length > centerField.length? instituteField.length : centerField.length;
    var max2 = departmentField.length > cathedralField.length? departmentField.length : cathedralField.length;

    for(var i = 0; i < max1; i++){
      var occupation = "<span>";
      var institute = instituteField.eq(i);
      var center = centerField.eq(i);

      if(institute.length){
        var instituteVal = institute.text().split(';');
        if(instituteVal[0] && instituteVal[2]){
          occupation += instituteVal[0]+' '+instituteVal[2];
        } else {
          occupation += instituteVal[1];
        }
      }

      if(institute.length && center.length) {
        occupation += " • ";
      }

      if(center.length){
        var centerVal = center.text().split(';');
        if(centerVal[0] && centerVal[2]){
          occupation += centerVal[0]+' '+centerVal[2];
        } else {
          occupation += centerVal[1];
        }
      }

      occupation += "</span><br />";

      $('.stanowisko').append(occupation);
    }

    for(var i = 0; i < max2; i++){
      var occupation = "<span>";
      var department = departmentField.eq(i);
      var cathedral = cathedralField.eq(i);

      if(department.length){
        var departmentVal = department.text().split(';');
        if(departmentVal[0] && departmentVal[2]){
          occupation += departmentVal[0]+' '+departmentVal[2];
        } else {
          occupation += departmentVal[1];
        }
      }

      if(department.length && cathedral.length) {
        occupation += " • ";
      }

      if(cathedral.length){
        var cathedralVal = cathedral.text().split(';');
        if(cathedralVal[0] && cathedralVal[2]){
          occupation += cathedralVal[0]+' '+cathedralVal[2];
        } else {
          occupation += cathedralVal[1];
        }
      }

      occupation += "</span><br />";

      $('.stanowisko').append(occupation);
    }

    var siteContent = $('div[itemprop=articleBody] > *').not('.biogram-naglowek, .kadra-kierunek');
		$('div[itemprop=articleBody] > *').not('.biogram-naglowek, .kadra-kierunek').wrapAll('<div class="inner"></div>');

    if(siteContent.length){
      siteContent.wrapAll('<div class="inner"></div>');
    }
    // else {
    //   $('div[itemprop=articleBody]').append('<div class="inner"></div>')
    // }

		$(this).find('.soclinki').append( $(this).find('.profil-naukowy ul li'));
		$('.soclinki a').each(function(){
			var classname = $(this).attr('class');
			$(this).parent('li').addClass(classname);
		});

		var linkTarget = {};
		$('.biogram-naglowek .soclinki li').each(function() {
			var href = $(this).find('a').attr('href');
			if (linkTarget[href]) {
				$(this).remove();
			} else {
				linkTarget[href] = true;
			}
		});

		$('.biogram-naglowek').each(function() {
			$('<a name="biogram-naglowek-marker" id="biogram-naglowek-marker"></a>').insertBefore(this);
		});

    if($('div[itemprop="articleBody"] > .inner').length) {
      $('div[itemprop="articleBody"] > .inner').prepend($('.moduletable.breadcrumbs'));
      $('div[itemprop="articleBody"] > .inner > *').wrapAll('<div class="col-right"></div>');

      $('[itemprop="articleBody"]').append('<div class="bottom-navigation"></div>');
      $('.bottom-navigation').append('<a href="#"><i class="icon-areas"></i><span>Obszary</span></a>');
      if($('.linki .pakiet').length) $('.bottom-navigation').append('<a href="#"><i class="icon-press"></i><span>Pakiet pras.</span></a>');
      if($('.linki .zapytaj').length) $('.bottom-navigation').append('<a href="#" class="ask-expert">Zapytaj o eksperta</a>');
      $('.bottom-navigation').append('<a href="#"><i class="icon-publications"></i><span>Publikacje</span></a>');
      $('.bottom-navigation').append('<a href="#"><i class="icon-projects"></i><span>Projekty</span></a>');
    }

		if($('.biogram-info').length !== 0 && $('.biogram-dla-mediow').length !== 0) {
			$('div[itemprop="articleBody"] > .inner').prepend($('.biogram-naglowek').clone().attr('class','biogram-naglowek-duplicate'));
		}

		$('.biogram-naglowek .soclinki').each(function() {
			$(this).appendTo( $('#inner-2').find('div'));
		});

		$(window).on("load ready scroll resize", function() {
			$('.biogram-naglowek-duplicate').removeAttr('style');
			$('body').removeAttr('style');
		});

    $(window).on("scroll", function() {
      // console.log($(window).innerWidth, $(window).innerWidth());
      if($(window).innerWidth() > 768) {
        var s = $(window).scrollTop(),
        bh = $('.biogram-naglowek'),
        blackBiogram = bh.height() + bh.offset().top;

        if(s >= blackBiogram){
          $('.biogram-naglowek-duplicate').addClass('shown');
        } else {
          $('.biogram-naglowek-duplicate').removeClass('shown');
        }
      }
    });

		$('.biogram-naglowek-duplicate').each(function() {
			$(this).find('div > *').not('.img > * ').unwrap();
			$(this).find('.linki').insertBefore( $(this).find('.img') );
			$(this).find('.tytul, h2').wrapAll('<div class="name"></div>');
			$(this).find('.img').append( $(this).find('.name'));
			$(this).find('.soclinki li.publikacje, .soclinki li.projekty, .soclinki li.wspolpraca').wrapAll('<ul class="bw"></ul>');
			$(this).find('.bw').insertBefore( $(this).find('.soclinki'));
			$("<span class=\"button\">Uzupełnij biogram</span>").insertBefore($(this).find('.stanowisko'));

      if($(this).find('.soclinki').length && $(this).find('.soclinki').get(0).innerHTML.trim() == ""){
        $(this).find('.soclinki').remove();
      }

      if($(this).find('.bio-lang').length){
        var link = $(this).find('.bio-lang').get(0).innerHTML;

        $(this).find('.bio-lang').insertBefore($(this).find('.stanowisko') );
        $(this).find('.bio-lang').replaceWith('<span class="bio-lang">'+link+'</span>');
      }
		});

		$('.soclinki li.facebook a').html('<i class="fa fa-facebook"></i> Facebook');
		$(".soclinki li.cytowania a").html(" <i class=\"fa fa-comments-o\"></i> Facebook");
		$(".soclinki li.statystyki a").html(" <i class=\"fa fa-line-chart\"></i> Statystyki");
		$(".soclinki li.wspolpraca a").html(" <i class=\"fa fa-users\"></i> Współpraca");
		$(".soclinki li.research-gate a").html(" <i class=\"ai ai-researchgate\"></i> Research Gate");
		$(".soclinki li.google-scholar a").html(" <i class=\"ai ai-google-scholar\"></i> Google Scholar");
		$(".soclinki li.academia a").html(" <i class=\"ai ai-academia\"></i> Academia");
		$(".soclinki li.acclaim a").html(" <i class=\"ai ai-acclaim\"></i> Acclaim");
		$(".soclinki li.arxiv a").html(" <i class=\"ai ai-arxiv\"></i> Arxiv");
		$(".soclinki li.courser a").html(" <i class=\"ai ai-courser\"></i> Coursera");
		$(".soclinki li.doi a").html(" <i class=\"ai ai-doi\"></i> DOI");
		$(".soclinki li.dryad a").html(" <i class=\"ai ai-dryad\"></i> Dryad");
		$(".soclinki li.figshare a").html(" <i class=\"ai ai-figshare\"></i> Figshare");
		$(".soclinki li.impactstory a").html(" <i class=\"ai ai-impactstory\"></i> Impactstoty");
		$(".soclinki li.inspire a").html(" <i class=\"ai ai-inspire\"></i> Inspire");
		$(".soclinki li.mendeley a").html(" <i class=\"ai ai-mendeley\"></i> Mendeley");
		$(".soclinki li.open-access a").html(" <i class=\"ai ai-open-access\"></i> Open Access");
		$(".soclinki li.orcid a").html(" <i class=\"ai ai-orcid\"></i> Orcid");
		$(".soclinki li.osf a").html(" <i class=\"ai ai-osf\"></i> OSF");
		$(".soclinki li.pubmed a").html(" <i class=\"ai ai-pubmed\"></i> Pubmed");
		$(".soclinki li.scirate a").html(" <i class=\"ai ai-scirate\"></i> Scirate");
		$(".soclinki li.zotero a").html(" <i class=\"ai ai-zotero\"></i> Zotero");
		$(".soclinki li.web-of-science a").html(" <i class=\"fa fa-flask\"></i> Flask");
		$(".soclinki li.researcherid a").html(" <i class=\"ai ai-researcherid\"></i> Researcherid");
		$(".soclinki li.ssrn a").html(" <i class=\"ai ai-ssrn\"></i> SSRN");

		$(".soclinki li.twitter a").html(" <i class=\"fa fa-twitter\"></i> Twitter");
		$(".soclinki li.pinterest a").html(" <i class=\"fa fa-pinterest-p\"></i> Pinterest");
		$(".soclinki li.nstagram a").html(" <i class=\"fa fa-instagram\"></i> Instagram");
		$(".soclinki li.linkedin a").html(" <i class=\"fa fa-linkedin\"></i> Linkedin");
		$(".soclinki li.tumblr a").html(" <i class=\"fa fa-tumblr\"></i> Tumblr");
		$(".soclinki li.youtube a").html(" <i class=\"fa fa-youtube-play\"></i> Youtube");
		$(".soclinki li.google a").html(" <i class=\"fa fa-google-plus\"></i> Google Plus");
		$(".soclinki li.flickr a").html(" <i class=\"fa fa-flickr\"></i> Flickr");
		$(".soclinki li.snapchat a").html(" <i class=\"fa fa-snapchat-ghost\"></i> Snapchat");
		$(".soclinki li.vimeo a").html(" <i class=\"fa fa-vimeo\"></i> Vimeo");

		$(".uzupelnijbiogram.unfoldable").each(function(){
			$(this).append("<span class=\"button\">Uzupełnij biogram</span>");
			$(this).prependTo('#inner-2');
			$(this).find('div:first').append( $('<span class="close"></sopan>'));
		});

		$(".completeBio, .researchprojects.unfoldable .button, .uzupelnijbiogram.unfoldable .button, .biogram-naglowek-duplicate .button").click(function(){
			$('.mauticform, .appla').addClass("on");
			$('body').addClass('block-scrolling');
		});

		$(".researchprojects.unfoldable .close, .uzupelnijbiogram.unfoldable .close").click(function(){
			$('.mauticform, .appla').removeClass("on");
			$('body').removeClass('block-scrolling');
		});

		$("div[itemprop=articleBody] > .inner .coworkers .item").each(function(){
			$(this).find('.fields .email a').addClass('email').wrapInner('<span></span>').insertBefore( $(this).find('.bio') );
		});

    if($('.biogram-naglowek .img + div').length){
      var title = $('.biogram-naglowek .tytul');
      var name = $('.biogram-naglowek h2');
      var email = $('.biogram-naglowek .email');
      var occupation = $('.biogram-naglowek .stanowisko');
      var lang = $('.biogram-naglowek .bio-lang');
      var prawnikTrawnik = $('.biogram-naglowek .prawnik-trawnik');

      if(title.length) {
        title.remove();
        title = '<p>'+title.get(0).innerHTML+'</p>';
      } else {
        title = "";
      }

      if(name.length) {
        name.remove();
        name = '<h1>'+name.get(0).innerHTML+'</h1>';
      } else {
        name = "";
      }

      $('.biogram-naglowek .img + div').prepend('<div class="name-wrapper">'+title+name+'</div>')
      $('.biogram-naglowek .name-wrapper').append(email).after(prawnikTrawnik);

      if(lang.length) {
        $('.biogram-naglowek .name-wrapper').append(lang.children('a').addClass('switch-lang'));
        lang.remove();
      }

      if($('.biogram-naglowek h3:last-child').length){
        $('.biogram-naglowek h3:last-child').remove();
      }
    }

    if($('.biogram-no-content').length) { // biogram no content
      $('.biogram-naglowek .inner:not([id]) > div:not([class])').prepend($('.moduletable.breadcrumbs'));
    }

    $('[itemprop="articleBody"]').append($('.mauticform'));

    if($('.coworkers .items .item').length) {
      $('.coworkers').append('<div class="slick-controls"></div>');

      $('.coworkers .items').on('init', function(event, slick){
        var slideCount = $('.slick-slide:not(.slick-cloned)').length;
        if(slideCount > 1) {
          $('.slick-controls').append('<span class="slide-counter"><span class="current-slide">1</span>/'+slideCount+'</span>')
        }
      });

      $('.coworkers .items').slick({
        adaptiveHeight: true,
        arrows: true,
        rows: 5,
        slidesPerRow: 2,
        prevArrow: '<button class="prev icon-arrow"></button>',
        nextArrow: '<button class="next icon-arrow"></button>',
        appendArrows: $('.slick-controls'),
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
      });

      $('.coworkers .items').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $(".slide-counter .current-slide").text(nextSlide+1);
      });

      $('.coworkers .items').on('breakpoint', function(event, slick, breakpoint){
        var slideCount = $('.slick-slide:not(.slick-cloned)').length;

        if(slideCount > 1) {
          $(".slide-counter").html('<span class="current-slide">1</span>/'+slideCount);
        } else {
          $(".slide-counter").html('');
        }
      });
    }

    $(window).on('resize', function(){
      clearTimeout(timeoutHolder);
      timeoutHolder = setTimeout(function(){
        if(window.innerWidth < 769){
          $('.coworkers .items .item').each(function(){
            if(!$(this).children('.biogram-links').length){
              $(this).children().children('a.email, a.bio').wrapAll('<div class="biogram-links"></div>');
              $(this).append($(this).find('.biogram-links'));
            }
          });
        } else {
          $('.coworkers .items .item').each(function(){
            $(this).children('.fields').prepend($(this).find('a.email, a.bio'));
            $(this).children('.biogram-links').remove();
          });
        }

        if(window.innerWidth < 769){
          $('.biogram-naglowek-duplicate').before($('div.breadcrumbs'));
        } else {
          $('.col-right').prepend($('div.breadcrumbs'));
        }
      }, 200);
    });

    $(window).resize();

    function trimElem(element){
      return element.trim();
    }

    function appendToOccupation(){
      var val = $(this).children().children().children().text().split(';');

      if(val[0].trim() && val[2].trim()){
        $('.stanowisko').append('<span>'+val[0].trim()+' • '+val[2].trim()+'</span><br />');
      } else {
        $('.stanowisko').append('<span>'+val[1].trim()+'</span><br />');
      }
    }
  });
})(jQuery);
