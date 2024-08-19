jQuery('.gallery').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    prevArrow: '<button class="prev in-circle slick-arrow" aria-label="Przewiń w lewo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
    nextArrow: '<button class="next in-circle slick-arrow" aria-label="Przewiń w prawo"><i class="icon-cheveron" aria-hidden="true"></i></button>',
});



//horizontal-list slider start 
document.querySelectorAll('.points li').forEach(function (el) {
    el.addEventListener('click', function () {
        // Usuń klasę 'active' z wszystkich elementów listy
        document.querySelectorAll('.points li').forEach(function (el) {
            el.classList.remove('active');
        });

        // Dodaj klasę 'active' do klikniętego elementu
        this.classList.add('active');

        let clickedNumber = this.dataset.number;

        document.querySelectorAll('.info-wrapper > div').forEach(function (el) {
            el.style.opacity = '0';
            el.style.display = 'none';
        });

        let toShow = document.querySelector('.info-wrapper div[data-number="' + clickedNumber + '"]');
        toShow.style.display = 'block';

        // Animacja pojawiania się elementu
        let opacity = 0;
        let timer = setInterval(function () {
            if (opacity < 1) {
                opacity = opacity + 0.1;
                toShow.style.opacity = opacity;
            } else {
                clearInterval(timer);
            }
        }, 50); // Zmieniaj wartość opacity co 50 milisekund
    });
});

//horizontal-list slider end 

const li = document.querySelector(".horizontal-list > div.points > ol > li")
li.click()

//tutaj dodaje nowy js start
const menuWrapper = document.querySelector('.menu-wrapper');
if (menuWrapper) {
    const scrollableList = menuWrapper.querySelector('ul');
    const leftArrow = menuWrapper.querySelector('.icon-arrow-down-open.left');
    const rightArrow = menuWrapper.querySelector('.icon-arrow-down-open.right');



    function setActiveItem(newActiveItem) {
        const currentActiveItem = scrollableList.querySelector('li.active');
        if (currentActiveItem) {
            currentActiveItem.classList.remove('active');
        }
        newActiveItem.classList.add('active');

        updateContent(newActiveItem.dataset.number);
    }

    function updateContent(number) {
        document.querySelectorAll('.desc-wrapper .tab').forEach(function (el) {
            el.style.display = 'none';
        });

        let toShow = document.querySelector('.desc-wrapper .tab[data-number="' + number + '"]');
        if (toShow) {
            toShow.style.display = 'block';
        }
    }

    function updateArrowVisibility() {
        const items = document.querySelectorAll('.menu-wrapper li');
        const activeItem = document.querySelector('.menu-wrapper li.active');

        const leftArrow = document.querySelector('.menu-wrapper .icon-arrow-down-open.left');
        const rightArrow = document.querySelector('.menu-wrapper .icon-arrow-down-open.right');

        if (activeItem) {
            // Ukryj lewą strzałkę, jeśli aktywny element jest pierwszy
            if (activeItem === items[0]) {
                leftArrow.style.display = 'none';
            } else {
                leftArrow.style.display = 'block';
            }

            // Ukryj prawą strzałkę, jeśli aktywny element jest ostatni
            if (activeItem === items[items.length - 1]) {
                rightArrow.style.display = 'none';
            } else {
                rightArrow.style.display = 'block';
            }
        }
    }
    updateArrowVisibility();

    leftArrow.addEventListener('click', function () {
        const currentActiveItem = scrollableList.querySelector('li.active');
        const previousItem = currentActiveItem.previousElementSibling;
        if (previousItem) {
            setActiveItem(previousItem);
            let scrollDistance = previousItem.offsetWidth || 100; // Fallback to a default value if offsetWidth is not available
            scrollableList.scrollBy({ left: -scrollDistance, top: 0, behavior: 'smooth' });
        }
        updateArrowVisibility();
    });

    rightArrow.addEventListener('click', function () {
        const currentActiveItem = scrollableList.querySelector('li.active');
        const nextItem = currentActiveItem.nextElementSibling;
        if (nextItem) {
            setActiveItem(nextItem);
            let scrollDistance = nextItem.offsetWidth || 100; // Fallback to a default value if offsetWidth is not available
            scrollableList.scrollBy({ left: scrollDistance, top: 0, behavior: 'smooth' });
        }
        updateArrowVisibility();
    });


}


document.querySelectorAll('.menu-wrapper li').forEach(function (el) {
    // el.addEventListener('click', function () {
    //     setActiveItem(this);
    // });
    var newEl = el.cloneNode(true);
    el.parentNode.replaceChild(newEl, el);
});

document.querySelectorAll('.menu-wrapper li').forEach(function (el) {
    el.style.cursor = 'default';
});
//tutaj dodaje nowy js stop 
var slider = document.querySelector('.menu-wrapper ul');


if (slider) {
    var isDown = false;
    var startX;
    var scrollLeft;
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });

}




// Tworzenie nowego elementu div
var newElement = document.createElement("div");

// Dodanie klasy do nowego elementu
newElement.className = "white-line";

// Dodanie stylów do nowego elementu
newElement.style.height = "5px";
newElement.style.backgroundColor = "#fbfbfb";
newElement.style.marginLeft = "0";
newElement.style.marginRight = "0";
newElement.style.width = "100%";
newElement.style.maxWidth = "100%";
newElement.style.marginTop = "-2px";

// Znalezienie elementu, pod którym nowy element ma być dodany
var secondaryMenuInsert = document.querySelector("#secondary-menu .container");

// Dodanie nowego elementu jako następny element po znalezionym elemencie



document.querySelectorAll('#secondary-menu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        let targetId = this.getAttribute('href');

        // Jeśli kliknięty link nie jest '#tab10', to zmień klasy 'active'
        if (targetId !== '#tab10') {
            // Usuń klasę 'active' ze wszystkich elementów 'li' w nawigacji
            document.querySelectorAll('#secondary-menu li').forEach(li => {
                li.classList.remove('active');
            });

            setTimeout(function () {
                let parentLi = anchor.parentElement;
                if (parentLi) {
                    parentLi.classList.add('active');
                }
            }, 100);
        }

        // Przewijanie działa dla wszystkich zakładek, w tym dla '#tab10'
        let targetElement = document.querySelector(targetId);
        if (targetElement) {
            let elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            let offset = 200; // Ustawienie przewijania 200px powyżej elementu
            let scrollToPosition = elementPosition - offset;

            if (window.innerWidth > 1200) {
                window.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth'
                });

            }
        }
    });
});

// document.querySelectorAll('#secondary-menu a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();

//         let targetId = this.getAttribute('href');

//         // Jeśli kliknięty link nie jest '#tab10', to zmień klasy 'active'
//         if (targetId !== '#tab10') {
//             // Usuń klasę 'active' ze wszystkich elementów 'li' w nawigacji
//             document.querySelectorAll('#secondary-menu li').forEach(li => {
//                 li.classList.remove('active');
//             });

//             setTimeout(function () {
//                 let parentLi = anchor.parentElement;
//                 if (parentLi) {
//                     parentLi.classList.add('active');
//                 }
//             }, 100);
//         }

//         // Przewijanie działa dla wszystkich zakładek, w tym dla '#tab10'
//         let targetElement = document.querySelector(targetId);
//         if (targetElement) {
//             let elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
//             let offset = 200; // Ustawienie przewijania 200px powyżej elementu
//             let scrollToPosition = elementPosition - offset;

//             window.scrollTo({
//                 top: scrollToPosition,
//                 behavior: 'smooth'
//             });
//         }
//     });
// });

function updateStickyMenu() {
    const secondaryMenu = document.getElementById('secondary-menu');
    const offsetTop = secondaryMenu.offsetTop;


    if (window.scrollY + 87 >= offsetTop) {
        secondaryMenu.classList.add('sticky');
        secondaryMenuInsert.parentNode.insertBefore(newElement, secondaryMenuInsert.nextSibling);
    }
    if (window.scrollY <= 764) {
        secondaryMenu.classList.remove('sticky');
        if (newElement.parentNode) {
            newElement.parentNode.removeChild(newElement);

        }
    }
}
function updateActiveLink() {

    let current = '';

    const links = document.querySelectorAll('#secondary-menu a');

    for (let link of links) {
        let href = link.getAttribute('href');

        if (!href.startsWith('#tab')) continue;

        let section = document.querySelector(href);
        if (!section) continue;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = section.clientHeight;
        const scrollY = window.scrollY + 200; // Dodajemy ten sam offset

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = href;
        }
    }

    links.forEach(a => {
        a.parentNode.classList.remove('active');
        if (a.getAttribute('href') === current) {
            a.parentNode.classList.add('active');
        }
    });
}


window.addEventListener('scroll', function () {
    updateStickyMenu();
    updateActiveLink();
}
);




document.querySelectorAll('.additional-info').forEach(function (button) {
    button.addEventListener('click', function (event) {
        let infoText = event.currentTarget.querySelector('.additional-info-text');
        let imgElement = event.currentTarget.querySelector('.plus-button');
        if (infoText.classList.contains('open')) {
            infoText.classList.remove('open');
            imgElement.src = "/widoki/img/plus.svg"; // zmieniamy obrazek na plus.svg
        } else {
            infoText.classList.add('open');
            imgElement.src = "/widoki/img/minus.svg"; // zmieniamy obrazek na minus.svg
        }
    });
});

jQuery(".popup_v2 .read-more").each(function () {
    jQuery(this).colorbox({
        rel: "popup",
        scrolling: !1,
        width: "60%",
        maxHeight: "60%",
        close: "",
        inline: !0,
        href: jQuery(this).parent().parent().find(".read-more-content"),
        onOpen: function () {
            jQuery("html").addClass("block-scrolling"),
                jQuery("#colorbox").addClass("ppl-lightbox")
        },
        onLoad: function () {
            jQuery("#cboxClose").addClass("close")
        },
        onClosed: function () {
            jQuery("html").removeClass("block-scrolling")
        }
    })
})



jQuery('.slider-full-page').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 6000,
});

//dodanie klasy aby slider bez zdjeica dostal inne style 
function checkAndAddClassForMultipleElements(elementSelector) {
    // Znajdź wszystkie elementy o podanym selektorze
    var elements = document.querySelectorAll(elementSelector);

    // Przejrzyj każdy element w pętli
    elements.forEach(function (element) {
        // Pobierz pierwsze dziecko elementu
        var firstChild = element.firstElementChild;

        // Sprawdź, czy pierwsze dziecko to <img>, jeśli nie, dodaj klasę
        if (!firstChild || firstChild.tagName !== 'IMG') {
            element.classList.add('recomendation-slider-without-photo');
        }
    });
}

// Wywołanie funkcji dla konkretnego selektora
checkAndAddClassForMultipleElements('.recomendation.popup_v2');



//zmiana wysokosci elmentu, tak aby nawigacja slidera byla w odpowiedniej wysokosci
var parentElement = document.querySelector('.slider-full-page .slick-list.draggable');
if (parentElement) {
    // Znajdź element dziecka - zakładam, że jest to pierwsze dziecko, ale możesz to zmodyfikować
    var childElement = parentElement.children[0];

    if (childElement) {
        // Oblicz wysokość dziecka
        var childHeight = childElement.offsetHeight;

        // Przelicz piksele na rem (zakładając, że 1rem = 16px)
        var heightInRem = childHeight / 16 + 3;

        // Ustaw wysokość rodzica
        parentElement.style.height = `${heightInRem}rem`;
    }
}


if (window.innerWidth < 1200) {


    function changeSpecificImageSrc(oldSrc, newSrc) {
        var images = document.querySelectorAll('img'); // Wybiera wszystkie obrazy na stronie
        images.forEach(function (image) {
            if (image.src.includes(oldSrc)) { // Sprawdza, czy źródło obrazu zawiera stary adres URL
                image.src = newSrc; // Zmienia źródło na nowe
                image.style.height = '8rem';
                image.style.display = 'block';
            }
        });
    }
    changeSpecificImageSrc('/images/PODYPLOMOWE/layout/Dlaczego-warto/biznes.webp', '/images/PODYPLOMOWE/layout/Dlaczego-warto/dlaczego_wartaMOBILE.png');

    let button = document.createElement("button");
    button.id = "aside-toggle-button";
    button.style.position = "fixed";
    button.style.bottom = "87px";
    button.style.right = "16px";
    button.style.zIndex = "15";
    button.style.color = "white";
    button.innerHTML = `<img class="plus-button" src="/widoki/img/chat.svg" alt="" srcset="" style="width:25px">`;

    document.getElementById('content').appendChild(button);

    let aside = document.querySelector('aside');
    aside.style.left = '-100%';

    document.getElementById('aside-toggle-button').addEventListener('click', function () {
        const buttonToggle = document.getElementById('aside-toggle-button');
        const html = document.querySelector('html');
        if (aside.style.left === '-100%') {
            aside.style.left = '0';
            aside.style.zIndex = '16';
            buttonToggle.style.zIndex = '17';
            buttonToggle.style.top = '21px';
            buttonToggle.style.bottom = 'auto';
            buttonToggle.style.backgroundColor = 'inherit'
            buttonToggle.innerHTML = `<span class="close"></span>`;
            html.classList.add('block-scrolling');
        } else {
            aside.style.left = '-100%';
            buttonToggle.style.bottom = '100px';
            buttonToggle.style.top = 'auto';
            buttonToggle.style.backgroundColor = 'var(--primary-color)'
            buttonToggle.innerHTML = `<img class="plus-button" src="/widoki/img/chat.svg" alt="" srcset="" style="width:25px">`;
            buttonToggle.style.zIndex = '15';
            html.classList.remove('block-scrolling');
        }
    });



    let listItems = document.querySelectorAll('.points ol li');

    listItems.forEach((li, index) => {
        // Wstaw numer na początek zawartości tekstowej elementu 'li' 
        li.firstChild.textContent = (index + 1) + ' ';
    });


    // Znajdź wszystkie elementy <a> w liście
    let links = document.querySelectorAll('ul li a');

    //Przejdź przez każdy link
    for (let link of links) {
        // Wyciągnij wartość href
        let href = link.getAttribute('href');
        let newImage = document.createElement('img');
        newImage.setAttribute('class', 'plus-button');
        newImage.setAttribute('src', '/widoki/img/plus.svg');
        newImage.setAttribute('alt', '');
        newImage.setAttribute('srcset', '');
        // Sprawdź, czy href zaczyna się od "#tab"
        if (href.startsWith('#tab')) {
            // Znajdź element docelowy
            let targetElement = document.querySelector(href);


            let newLink = document.createElement('a');
            newLink.setAttribute('href', href);


            newLink.innerHTML = link.innerHTML;
            newLink.appendChild(newImage)
            // Dodaj nowy link jako pierwsze dziecko elementu docelowego
            targetElement.insertBefore(newLink, targetElement.firstChild);

        }
    }

    let sectionsHide = document.querySelectorAll('section');

    // Iteruj przez każdą sekcję
    sectionsHide.forEach(section => {
        // Pobierz id sekcji
        let id = section.id;

        // Sprawdź, czy id zaczyna się od "tab"
        if (id.startsWith('tab')) {
            let children = section.children;
            for (let i = 1; i < children.length; i++) {
                children[i].style.display = 'none';
            }
        }
    });


    let sections = document.querySelectorAll('section[id^="tab"]');

    // Iteruj przez każdą sekcję
    sections.forEach(section => {
        // Znajdź link i przypisz do niego funkcję onclick
        let link = section.querySelector('a');


        if (link) {
            link.onclick = function () {
                // Przełącz widoczność dzieci sekcji
                let children = section.children;
                for (let i = 1; i < children.length; i++) {
                    if (children[i].style.display == 'none') {
                        children[i].style.removeProperty('display');
                    } else {
                        children[i].style.display = 'none';
                    }
                }

                // Przełącz obrazek plus/minus
                let img = link.querySelector('.plus-button');
                if (img && img.src.includes('plus.svg')) {
                    img.src = '/widoki/img/minus.svg';
                } else if (img) {
                    img.src = '/widoki/img/plus.svg';
                }


            };
        }
    });
    let sections2 = document.querySelectorAll('section[id^="tab"] a');
    sections2.forEach(anchor => {

        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);

            if (targetElement) {
                console.log("Scrolling to:", targetElement.offsetTop);
                const offset = 594; // Możesz dostosować tę wartość do wysokości Twojego paska nawigacyjnego

                window.scrollTo({
                    top: targetElement.offsetTop + offset, // Dostosuj przewijanie o offset
                    behavior: 'smooth'
                });
            } else {
                console.log("Nie znaleziono elementu docelowego dla:", targetId);
            }
        });
    })
    jQuery(`[id^="tab10"] a`).click();

    const contact = document.querySelector(".contact")
    const moreLinks = document.querySelector(".moreLinks")
    contact.appendChild(moreLinks)
}


const recommendationElements = document.querySelectorAll('.recomendation.popup.biogramAdv');

recommendationElements.forEach(element => {
    if (!element.children[0] || element.children[0].tagName !== 'IMG') {
        element.classList.add('no-image');
    }
});

let podyplomowePage = document.querySelector('.podyplomowe');

let element = document.querySelector('#kontakt > div > div:nth-child(1)');

// Zmień styl tła elementu
if (element && podyplomowePage) {
    element.style.backgroundImage = 'url(https://www0.swps.pl/widoki/img/kontakt_blue_foto.png)';
    element.style.backgroundRepeat = 'no-repeat';
    element.style.backgroundPosition = '50%';
}

const contactElement = document.querySelector('aside > .contact:first-of-type');
const moreLinksElement = document.querySelector('aside > .contact.moreLinks');
const containerElement = document.querySelector('.secondary-sections.container');

function adjustContactMargin() {
    if (contactElement && moreLinksElement && containerElement) {
        const moreLinksBottom = moreLinksElement.getBoundingClientRect().bottom;
        const containerBottom = containerElement.getBoundingClientRect().bottom;

        // Jeśli dolna krawędź elementu 'moreLinks' jest równa lub większa niż dolna krawędź 'containerElement'
        if (moreLinksBottom >= containerBottom) {
            contactElement.style.marginBottom = '13rem';
        } else {
            contactElement.style.marginBottom = '32px'; // Resetuj margines, jeśli warunek nie jest spełniony
        }
    }
}

// Aktualizuj margines 'contactElement' podczas przewijania
window.addEventListener('scroll', adjustContactMargin);

function adjustMoreLinksPosition() {
    // Jeśli element istnieje
    if (contactElement && moreLinksElement) {
        // Pobierz jego wysokość
        const contactHeight = contactElement.offsetHeight;

        // Ustaw wartość 'top' dla 'moreLinks' na wysokość 'contact' + 2rem
        moreLinksElement.style.top = `calc(${contactHeight}px + 13rem)`;
    }
}

// Wywołaj funkcję, aby dostosować pozycję
adjustMoreLinksPosition();


if (window.location.pathname === "/oferta/wroclaw/podyplomowe/psychologia-psychoterapia/wczesne-wieloaspektowe-wspomaganie-rozwoju-dziecka??????") {

    // Insert the iframe
    var iframe = document.createElement('iframe');
    iframe.src = "https://www.chatbase.co/chatbot-iframe/6t8Q6ntrB-9KTt2fvCiyt";
    iframe.width = "100%";
    iframe.style.height = "0";
    iframe.style.minHeight = "0";
    iframe.style.visibility = "hidden"
    iframe.frameBorder = "0";
    document.body.appendChild(iframe);

    // Insert the first script
    var script1 = document.createElement('script');
    script1.innerHTML = `
        window.embeddedChatbotConfig = {
            chatbotId: "6t8Q6ntrB-9KTt2fvCiyt",
            domain: "www.chatbase.co"
        }
    `;
    document.body.appendChild(script1);

    // Insert the second script
    var script2 = document.createElement('script');
    script2.src = "https://www.chatbase.co/embed.min.js";
    script2.setAttribute("chatbotId", "6t8Q6ntrB-9KTt2fvCiyt");
    script2.setAttribute("domain", "www.chatbase.co");
    script2.defer = true;
    document.body.appendChild(script2);

    // Add the style
    const przycisk = document.getElementById("chatbase-bubble-button")
    przycisk.click()
    setTimeout(function () {
        var targetElement = document.querySelector('#__next > div > div.bg-inherit > form > p');
        if (targetElement) {
            targetElement.style.visibility = 'hidden';
        }
    }, 1000)

    przycisk.addEventListener("click", function () {
        var targetElement = document.querySelector('#__next > div > div.bg-inherit > form > p');
        if (targetElement) {
            targetElement.style.visibility = 'hidden';
        }
    })
}

