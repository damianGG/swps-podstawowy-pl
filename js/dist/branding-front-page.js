"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const body = document.querySelector('body');
    //body.classList.add("bcolor_0C78C1")
    let bgColorClass = Array.from(body.classList).find(className => className.startsWith("bcolor_"));

    if (bgColorClass) {
        const color = "#" + bgColorClass.substring(7)


        const naSkroty = document.querySelector("#menu > li:nth-child(7) > button");
        naSkroty.style.backgroundColor = color;
        naSkroty.style.borderColor = color;

        const obszary = document.querySelector(".moduletable.thematic-areas");

        obszary ? obszary.style.backgroundImage = `linear-gradient(110deg, ${color} 30%, rgb(255, 255, 255) 30%)` : null;
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (screenWidth > 1600) {
            obszary ? obszary.style.backgroundImage = `linear-gradient(110deg, ${color} 35%, rgb(255, 255, 255) 30%)` : null;
        }
        if (screenWidth < 700) {
            obszary ? obszary.style.background = color : null;
            const btnModulable = document.querySelector(".js-toggle-mobilethematicmenu.btn");
            btnModulable ? btnModulable.style.backgroundColor = color : null;
            btnModulable ? btnModulable.style.borderColor = color : null;
        }




        const obszaryText = document.querySelectorAll(".moduletable.thematic-areas .nav.menu.mod-list li a");
        obszaryText ? obszaryText.forEach(el => el.style.color = color) : null;


        const additionalText = document.querySelector(".additional-text");
        additionalText ? additionalText.style.color = color : null;

        const mainBtn = document.querySelector(".modified-brand .btn");
        mainBtn ? mainBtn.style.backgroundColor = color : null;
        mainBtn ? mainBtn.style.borderColor = color : null;

        const brandingSection = document.querySelector(".news-section.branding.slider");
        brandingSection ? brandingSection.style.backgroundColor = color : null;

        // const typeOf = document.querySelector(".news-wrapper .news-element .type-of");
        // typeOf ? typeOf.style.backgroundColor = color : null;




        function ustawMarginLeft() {
            let topContainer = document.querySelector("#top .container");
            let modifiedBrandContainer = document.querySelector(".modified-brand .container");

            const element = document.querySelector('figure');
            const rect = element.getBoundingClientRect();
            const distance = rect.left + window.scrollX;

            const marginToMove = distance - 44;


            if (topContainer && modifiedBrandContainer) {
                modifiedBrandContainer.style.marginLeft = `${marginToMove}px`;
            }
        }
        ustawMarginLeft();
        window.addEventListener("resize", function () {
            let modifiedBrandContainer = document.querySelector(".modified-brand .container");
            if (window.innerWidth > 1000) {
                ustawMarginLeft();
            }
            else {
                modifiedBrandContainer.style.marginLeft = `0px`;
            }
        });

        setTimeout(function () {
            jQuery(".news-slider-front-page").slick({
                slidesToShow: 4,
                slidesToScroll: 4,
                dots: false,
                infinite: true,
                speed: 300,
                adaptiveHeight: true,
                prevArrow: '<button class="prev" aria-label="Przewiń w lewo"><i class="icon-arrow-down-open" aria-hidden="true"></i></button>',
                nextArrow: '<button class="next" aria-label="Przewiń w prawo"><i class="icon-arrow-down-open" aria-hidden="true"></i></button>',
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

                ]
            });
            jQuery(".news-slider-front-page .next").insertBefore(jQuery(".news-slider-front-page .prev"))
        }, 100);


        const targetElement = document.querySelector('.landing-top.transparent-menu');
        const video = targetElement.querySelector('video');
        if (targetElement && video) {
            function toggleVideo() {
                const video = document.querySelector('video');
                const play = document.querySelector('.play');
                const stop = document.querySelector('.stop');

                if (video.paused) {
                    video.play();
                    play.style.color = 'gray';
                    play.style.visibility = 'hidden';
                    stop.style.visibility = 'inherit';
                    stop.style.color = 'white';

                } else {
                    video.pause();
                    play.style.color = 'white';
                    stop.style.color = 'gray';
                    play.style.visibility = 'inherit';
                    stop.style.visibility = 'hidden';
                }
            }

            function addToggleVideoButton() {
                const button = document.createElement('button');
                const targetElement = document.querySelector('.landing-top.transparent-menu');
                button.style.position = 'absolute';
                button.style.bottom = '24%';
                button.style.right = '10%';
                button.style.display = 'flex';
                // Tworzenie obrazka SVG z klasą 'play'
                const playSVG = `
                <svg class="play" width="30" height="30" color="gray"  position="absolute" visibility="hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                </svg>
              `;

                // Tworzenie obrazka SVG z klasą 'stop'
                const stopSVG = `
                <svg style="transform: translateX(-30px)" class="stop" width="30" height="30" color="white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 5h4v14H6zm8 0h4v14h-4z" fill="currentColor"/>
                </svg>
              `;
                // Dodawanie obrazków SVG do przycisku
                button.innerHTML = playSVG + stopSVG;

                // Dodawanie przycisku do elementu body
                targetElement.appendChild(button);
                button.addEventListener('click', toggleVideo);


            }

            // Dodaj przycisk do strony
            addToggleVideoButton();
        }
    }

});