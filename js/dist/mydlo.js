"use strict";!function($){$(document).ready(function(){$(".album").each(function(){$(this).slick({adaptiveHeight:!0,arrows:!0,slidesPerRow:3,rows:1,prevArrow:'<button class="prev" aria-label="Przewiń w lewo"><i class="icon-cheveron" aria-hidden="true"></i></button>',nextArrow:'<button class="next" aria-label="Przewiń w prawo"><i class="icon-cheveron" aria-hidden="true"></i></button>',appendArrows:$(this).siblings(".slider-controls"),responsive:[{breakpoint:480,settings:{rows:2,slidesPerRow:2}}]})}),$(".one-slide-per-page").each(function(){$(this).slick({adaptiveHeight:!0,arrows:!0,slidesPerRow:3,rows:1,prevArrow:'<button class="prev" aria-label="Przewiń w lewo"><i class="icon-cheveron" aria-hidden="true"></i></button>',nextArrow:'<button class="next" aria-label="Przewiń w prawo"><i class="icon-cheveron" aria-hidden="true"></i></button>',appendArrows:$(this).siblings(".slider-controls"),responsive:[{breakpoint:480,settings:{rows:2,slidesPerRow:2}}]})}),console.log("new1"),$(".slider-full-page").each(function(){var slider=$(this).find(".slider-wrapper");slider.on("init",function(event,slick){var slideCount=$(this).find(".slick-slide:not(.slick-cloned)").length;$(this).parents(".section").find(".slide-counter").remove(),$(this).parents(".section").find(".slider-controls").append('<span class="slide-counter"><span class="current-slide">1</span>/'+slideCount+"</span>")}),slider.slickFilterable({filterName:"filter-heading",filter:function(category,slider,settings){return $(this).attr("data-occupation")==category},slick:{slidesPerRow:3,rows:1,adaptiveHeight:!0,arrows:!0,prevArrow:'<button class="prev" aria-label="Przewiń w lewo"><i class="icon-arrow" aria-hidden="true"></i></button>',nextArrow:'<button class="next" aria-label="Przewiń w prawo"><i class="icon-arrow" aria-hidden="true"></i></button>',appendArrows:$(this).find(".slider-controls"),responsive:[{breakpoint:1200,settings:{rows:1}},{breakpoint:992,settings:{rows:1}}]}}),slider.on("beforeChange",function(event,slick,currentSlide,nextSlide){$(this).parents(".section").find(".slide-counter .current-slide").text(nextSlide+1)}),slider.on("breakpoint",function(event,slick,breakpoint){var slideCount=$(this).find(".slick-slide:not(.slick-cloned)").length;1<slideCount?$(this).parents(".section").find(".slide-counter").html('<span class="current-slide">1</span>/'+slideCount):$(this).parents(".section").find(".slide-counter").html("")})});var copy,placeOfInsert=document.querySelector(".articles-view-block"),listOfElements=document.querySelectorAll(".list-wrapper li"),firstLiElement=document.querySelector(".list-wrapper li"),squareEl=document.createElement("div");if(squareEl.classList.add("triangle-shadow"),null!==firstLiElement&&firstLiElement.prepend(squareEl),null!==placeOfInsert&&null!==listOfElements)for(var i=0;i<listOfElements.length;i++)listOfElements[i].addEventListener("mouseenter",function(e){e.preventDefault();var elementToRemove=document.querySelector(".articles-view-block"),foundSqure=document.querySelector(".triangle-shadow");foundSqure.parentElement.removeChild(foundSqure),elementToRemove.innerHTML="",copy=e.target.cloneNode(!0);var squareEl=document.createElement("div");squareEl.classList.add("square"),e.target.prepend(squareEl),placeOfInsert.appendChild(copy.querySelector(".bg-element")),placeOfInsert.appendChild(copy.querySelector(".title")),placeOfInsert.appendChild(copy.querySelector(".subtitle"))})})}(jQuery);