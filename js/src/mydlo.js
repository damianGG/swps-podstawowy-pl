'use strict';

(function($) {
    $(document).ready(function() {

        $('.album').each(function() {
            $(this).slick({
                adaptiveHeight: true,
                arrows: true,
                slidesPerRow: 3,
                rows: 1,
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

        $('.one-slide-per-page').each(function() {
            $(this).slick({
                adaptiveHeight: true,
                arrows: true,
                slidesPerRow: 3,
                rows: 1,
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


        console.log("new1")
        $('.slider-full-page').each(function() {
            var slider = $(this).find('.slider-wrapper');

            slider.on('init', function(event, slick) {
                var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

                $(this).parents('.section').find(".slide-counter").remove();
                $(this).parents('.section').find('.slider-controls').append('<span class="slide-counter"><span class="current-slide">1</span>/' + slideCount + '</span>')
            });

            slider.slickFilterable({
                filterName: 'filter-heading',
                filter: function(category, slider, settings) {
                    return $(this).attr('data-occupation') == category;
                },
                slick: {
                    slidesPerRow: 3,
                    rows: 1,
                    adaptiveHeight: true,
                    arrows: true,
                    prevArrow: '<button class="prev" aria-label="Przewiń w lewo"><i class="icon-arrow" aria-hidden="true"></i></button>',
                    nextArrow: '<button class="next" aria-label="Przewiń w prawo"><i class="icon-arrow" aria-hidden="true"></i></button>',
                    appendArrows: $(this).find('.slider-controls'),
                    responsive: [{
                            breakpoint: 1200,
                            settings: {
                                rows: 1,
                            }
                        },
                        {
                            breakpoint: 992,
                            settings: {
                                rows: 1,
                            }
                        }
                    ]
                }
            });

            slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                $(this).parents('.section').find(".slide-counter .current-slide").text(nextSlide + 1);
            });

            slider.on('breakpoint', function(event, slick, breakpoint) {
                var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

                if (slideCount > 1) {
                    $(this).parents('.section').find(".slide-counter").html('<span class="current-slide">1</span>/' + slideCount);
                } else {
                    $(this).parents('.section').find(".slide-counter").html('');
                }
            });
        });


        //Slider one element per page START 
        // jQuery('.one-slide-per-page-box').each(function() {
        //     var slider = $(this).find('.one-slide-per-page');

        //     slider.on('init', function(event, slick) {
        //         var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

        //         $(this).parents('.section').find(".slide-counter").remove();
        //         $(this).parents('.section').find('.slider-controls').append('<span class="slide-counter"><span class="current-slide">1</span>/' + slideCount + '</span>')
        //     });

        //     slider.slickFilterable({
        //         filterName: 'filter-heading',
        //         filter: function(category, slider, settings) {
        //             return $(this).attr('data-occupation') == category;
        //         },
        //         slick: {
        //             slidesPerRow: 1,
        //             rows: 1,
        //             adaptiveHeight: true,
        //             arrows: true,
        //             prevArrow: '<button class="prev" aria-label="Przewiń w lewo"><i class="icon-arrow" aria-hidden="true"></i></button>',
        //             nextArrow: '<button class="next" aria-label="Przewiń w prawo"><i class="icon-arrow" aria-hidden="true"></i></button>',
        //             appendArrows: $(this).find('.slider-controls'),
        //             responsive: [{
        //                     breakpoint: 1200,
        //                     settings: {
        //                         rows: 1,
        //                     }
        //                 },
        //                 {
        //                     breakpoint: 992,
        //                     settings: {
        //                         rows: 1,
        //                     }
        //                 }
        //             ]
        //         }
        //     });

        //     slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        //         $(this).parents('.section').find(".slide-counter .current-slide").text(nextSlide + 1);
        //     });

        //     slider.on('breakpoint', function(event, slick, breakpoint) {
        //         var slideCount = $(this).find('.slick-slide:not(.slick-cloned)').length;

        //         if (slideCount > 1) {
        //             $(this).parents('.section').find(".slide-counter").html('<span class="current-slide">1</span>/' + slideCount);
        //         } else {
        //             $(this).parents('.section').find(".slide-counter").html('');
        //         }
        //     });
        // });
        //Slider one element per page END



        //Slider full page  START 




        // vertical slider START 
        var placeOfInsert = document.querySelector(".articles-view-block")
        var listOfElements = document.querySelectorAll(".list-wrapper li")
        var firstLiElement = document.querySelector(".list-wrapper li")

        var squareEl = document.createElement("div")
        squareEl.classList.add("triangle-shadow")
        if (firstLiElement !== null) {
            firstLiElement.prepend(squareEl)
        }
        var copy;
        if (placeOfInsert !== null && listOfElements !== null) {
            for (var i = 0; i < listOfElements.length; i++) {
                listOfElements[i].addEventListener("mouseenter", function(e) {
                    e.preventDefault();

                    var elementToRemove = document.querySelector(".articles-view-block")
                    var foundSqure = document.querySelector(".triangle-shadow")
                    foundSqure.parentElement.removeChild(foundSqure);
                    elementToRemove.innerHTML = "";
                    copy = e.target.cloneNode(true)

                    var squareEl = document.createElement("div")
                    squareEl.classList.add("square")
                    e.target.prepend(squareEl)

                    placeOfInsert.appendChild(copy.querySelector(".bg-element"))
                    placeOfInsert.appendChild(copy.querySelector(".title"))
                    placeOfInsert.appendChild(copy.querySelector(".subtitle"))
                })
            }
        }
        // Vertical slider END






    });
})(jQuery);