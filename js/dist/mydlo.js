'use strict';



(function($) {


    $(document).ready(function() {

        jQuery(".arrow-down").each(function() {
            const arrowButton = document.querySelector(".arrow-down")
            arrowButton.addEventListener("click", function(e) {

                e.preventDefault()

                const el = document.getElementById("01")
                var offset = el.offsetHeight / 1.1;

                $('html, body').animate({
                    scrollTop: offset
                }, 2500);
            })

        })






        $('.slider-3col-1row').each(function() {
            $(this).slick({
                adaptiveHeight: true,
                arrows: true,
                slidesPerRow: 3,
                rows: 1,
                prevArrow: '<button class="prev in-circle slick-arrow" aria-label="Przewiń w lewo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
                nextArrow: '<button class="next in-circle slick-arrow" aria-label="Przewiń w prawo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
                // appendArrows: $(this),
                dots: true,

                responsive: [{
                    breakpoint: 1080,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        slidesPerRow: 1,
                        rows: 1,
                        centerPadding: '60px',
                        slidesToShow: 1
                    }
                }]
            });
        });

        $('.one-slide-per-page').each(function() {
            $(this).slick({
                adaptiveHeight: true,
                arrows: true,
                slidesPerRow: 1,
                rows: 1,
                prevArrow: '<button class="prev in-circle slick-arrow" aria-label="Przewiń w lewo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
                nextArrow: '<button class="next in-circle slick-arrow" aria-label="Przewiń w prawo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
                dots: true,
                appendArrows: $(this),
                responsive: [{
                        breakpoint: 1300,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
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

        var placeOfInsertFirst = document.querySelector(".articles-view-block-first")
        var listOfElementsFirst = document.querySelectorAll(".list-wrapper-first li")
        if (placeOfInsertFirst !== null && listOfElementsFirst !== null) {
            for (var i = 0; i < listOfElementsFirst.length; i++) {
                listOfElementsFirst[i].addEventListener("mouseenter", function(e) {
                    e.preventDefault();

                    var elementToRemove = document.querySelector(".articles-view-block-first")
                    var foundSqure = document.querySelector(".triangle-shadow-first")
                    foundSqure.parentElement.removeChild(foundSqure);
                    elementToRemove.innerHTML = "";
                    var copy = e.target.cloneNode(true)

                    var squareEl = document.createElement("div")
                    squareEl.classList.add("triangle-shadow")
                    squareEl.classList.add("triangle-shadow-first")
                    e.target.prepend(squareEl)

                    placeOfInsertFirst.appendChild(copy.querySelector(".bg-element"))
                    placeOfInsertFirst.appendChild(copy.querySelector(".title"))
                    placeOfInsertFirst.appendChild(copy.querySelector(".subtitle"))
                })
            }
        }


        var placeOfInsert = document.querySelector(".articles-view-block-second")
        var listOfElements = document.querySelectorAll(".list-wrapper-second li")
        if (placeOfInsert !== null && listOfElements !== null) {
            for (var i = 0; i < listOfElements.length; i++) {
                listOfElements[i].addEventListener("mouseenter", function(e) {
                    e.preventDefault();

                    var elementToRemove = document.querySelector(".articles-view-block-second")
                    var foundSqure = document.querySelector(".triangle-shadow-second")
                    foundSqure.parentElement.removeChild(foundSqure);
                    elementToRemove.innerHTML = "";
                    var copy = e.target.cloneNode(true)

                    var squareEl = document.createElement("div")
                    squareEl.classList.add("triangle-shadow")
                    squareEl.classList.add("triangle-shadow-second")
                    e.target.prepend(squareEl)

                    placeOfInsert.appendChild(copy.querySelector(".bg-element"))
                    placeOfInsert.appendChild(copy.querySelector(".title"))
                    placeOfInsert.appendChild(copy.querySelector(".subtitle"))
                })
            }
        }

        // poprawa menu i usuniecie klasy banner START 
        jQuery("#menu > li > div > ul > li:nth-child(1) > div > p:nth-child(2) > a").removeClass("banner")


        // poprawa menu i usuniecie klasy banner STOP 


        // usuniecie z menu linkow- tak aby przy otwieraniu w nowym oknie nie pokazywal sie artykul
        // jQuery("#menu li").each(function() {
        //     jQuery(this).find("a").attr("href", "#")
        // })



        //Slidery Meet Our Reserchers START 






        $('.big-video .slider-wrapper').each(function() {
            var total = $('.video-slide-wrapper').length // get the number of slides
            var rand = Math.floor(Math.random() * total); // random number

            $(this).slick({
                lazyLoad: 'progressive',
                speed: 1500,
                prevArrow: '<button class="prev" aria-label="Przewiń w lewo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
                nextArrow: '<button class="next" aria-label="Przewiń w prawo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
                appendArrows: jQuery(this).parent().find(".slider-controls")
            })

            $(this).slick('slickGoTo', rand)
            console.log(rand)

        })


        $('.slider-wrapper.small-articles').each(function() {
            $(this).slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                prevArrow: '<button class="prev" aria-label="Przewiń w lewo"><i class="icon-arrow" aria-hidden="true"></i></button>',
                nextArrow: '<button class="next" aria-label="Przewiń w prawo"><i class="icon-arrow" aria-hidden="true"></i></button>',
                appendArrows: jQuery(this).parent().find(".slider-controls"),
                responsive: [{
                    breakpoint: 1200,
                    settings: "unslick"
                }]
            })
        })


        jQuery('.quote-slider').each(function() {
            jQuery(this).slick({
                arrows: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                prevArrow: '<button class="prev in-circle slick-arrow" aria-label="Przewiń w lewo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
                nextArrow: '<button class="next in-circle slick-arrow" aria-label="Przewiń w prawo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
                dots: true,
                appendArrows: $(this),
                responsive: [{
                    breakpoint: 1200,
                    settings: "unslick"
                }]
            });
        });

        // jQuery(".arrow-down").on("click", function() {
        //     window.scrollTo(0, 550);
        // })


        //Slidery Meet Our Reserchers END  
        //Animacje START 
        function reveal() {
            var reveals = document.querySelectorAll(".reveal");

            for (var i = 0; i < reveals.length; i++) {
                var windowHeight = window.innerHeight;
                var elementTop = reveals[i].getBoundingClientRect().top;
                var elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add("active");
                } else {
                    reveals[i].classList.remove("active");
                }
            }
        }

        window.addEventListener("scroll", reveal);
        //Animacje END 



        //animacja clicku na ptaszek 





        //transparetne menu 
        if (window.location.href.indexOf("poznaj-naszych-naukowcow") > -1) {
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                var w = window.innerWidth;
                if (scroll >= 100) {

                    $("#top").removeClass("bgd-transparent");
                    // $(".section.mydla.rised-box").addClass("fade-bottom-top");
                    // $(".section.mydla.rised-box").addClass("active");
                    // jQuery("#menu > li > a").css("color", "black");
                    // jQuery("#top.black-nav").css("background-color", "white");
                    // jQuery("#top > div.container > figure > a > picture > source").attr("srcset", "/images/LOGOTYPY/SWPS_University_smallV2.png")
                    if (w <= 1200) {
                        // jQuery("#top.black-nav").css("background-color", "black");
                        // jQuery("#top > div.container > figure > a > picture > source").attr("srcset", "/images/LOGOTYPY/logo_web.svg")
                    }


                } else {
                    // jQuery("#top.black-nav").css("background-color", "transparent")
                    // jQuery("#menu > li > a").css("color", "white")
                    $("#top").addClass("bgd-transparent");
                    // jQuery("#top > div.container > figure > a > picture > source").attr("srcset", "/images/LOGOTYPY/logo_web.svg")
                    // $(".section.mydla.rised-box").removeClass("fade-bottom-top");
                    // $(".section.mydla.rised-box").removeClass("active");

                }
            });
        }

        //animacja dla albumow w sliderze - dodanie klasy 
        jQuery(".slick-active .album-element").each(function(index) {
            var number = index + 1;
            jQuery(this).addClass(`fade-up-small-${number}`)
            jQuery(this).addClass(`reveal`)
        })

        jQuery(".variable-slider ").each(function() {

            jQuery(this).find(".slick-active").each(function(index) {
                var number = index + 1;
                jQuery(this).addClass(`fade-right-small-${number}`)
                jQuery(this).addClass(`reveal`)
            })
        })





        //autoplay na sliderze 
        jQuery(".play-btn").on("click", function(e) {
            e.preventDefault()
            jQuery(this).parent().find("img").hide()
            jQuery(this).parent().find(".play-btn").hide()
            jQuery(this).parent().find(".video-container").css("width", "56rem")
            jQuery(this).parent().find(".video-container").css("height", "31.5rem")
            jQuery(this).parent().find("iframe").show()
            let srcYoutTubelink = jQuery(this).parent().find("iframe").attr("src")
            jQuery(this).parent().find("iframe").attr("src", srcYoutTubelink + "?autoplay=1&mute=1");
            var w = jQuery(window).width();

            if (w < 1000) {
                jQuery(this).parent().find(".video-container").css("width", "inherit")
                jQuery(this).parent().find(".video-container").css("height", "50vw")
            }

        })


        //deactive hover efekt on mobile

        function hasTouch() {
            return 'ontouchstart' in document.documentElement ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0;
        }

        if (hasTouch()) { // remove all the :hover stylesheets
            try { // prevent exception on browsers not supporting DOM styleSheets properly
                for (var si in document.styleSheets) {
                    var styleSheet = document.styleSheets[si];
                    if (!styleSheet.rules) continue;

                    for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                        if (!styleSheet.rules[ri].selectorText) continue;

                        if (styleSheet.rules[ri].selectorText.match(':hover')) {
                            styleSheet.deleteRule(ri);
                        }
                    }
                }
            } catch (ex) {}
        }


        // mydlo grafiki na dole stronie 
        if (window.location.href.indexOf("zaangazowani") > -1) {

            jQuery(".fixed-wrapper").addClass("bottom-fixed")
            jQuery(".three-logos").after(`<img src="/images/common/belka-x.svg" class="close">`);
            jQuery(".bottom-fixed").css("z-index", "90")
            jQuery(".bottom-fixed .close").on("click", function() {

                jQuery(".fixed-wrapper").removeClass("bottom-fixed")
            })
        }


        jQuery(document).ready(function() {
            jQuery(".loader").fadeOut("slow");
        })
    });




})(jQuery);