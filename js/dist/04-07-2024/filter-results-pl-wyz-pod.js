
! function ($) {
    console.log("Hello world!");

    function disableScroll() {
        document.body.classList.add("stop-scrolling");
    }

    function enableScroll() {
        document.body.classList.remove("stop-scrolling");
    }

    function hasTouch() {
        return 'ontouchstart' in document.documentElement ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0;
    }

    function updateNumberOfField() {
        const expertsFields = document.querySelectorAll(".studies-card.kierunek")
        let numberOfVisibleElement = 0;
        if (expertsFields.length == 0) { return; }
        for (let i = 0; i < expertsFields.length; i++) {
            if (expertsFields[i].getAttribute("style") == "display:flex !important") {
                numberOfVisibleElement++;
            }
        }

        const numberOfFound = document.querySelector(".liczba-kierunkow")
        let word;
        if (numberOfVisibleElement === 1) {
            word = "kierunek";
        } else if (numberOfVisibleElement >= 2 && numberOfVisibleElement <= 4) {
            word = "kierunki";
        } else {
            word = "kierunków";
        }

        // const numberOfSpecElement = document.querySelector(".liczba-specjalnosci")
        // Sprawdź, czy istnieje klasa 'studia-podyplomowe-listing' w dokumencie
        if (!document.querySelector('.studia-podyplomowe-listing') && document.querySelector(".liczba-specjalnosci")) {
            word += " oraz"; // Dodaj 'oraz' na końcu słowa
        }

        numberOfFound.textContent = `${numberOfVisibleElement} ${word} `;
    }




    const obszary = document.querySelector(".obszary-test");
    function updateNumberOfSpec() {
        if (!obszary) {
            const expertsFields = document.querySelectorAll(".studies-card.specjalnosc")
            if (expertsFields.length) {
                if (expertsFields.length == 0) {
                    return;
                }

                let numberOfVisibleElement = 0;
                for (let i = 0; i < expertsFields.length; i++) {
                    if (expertsFields[i].getAttribute("style") == "display:flex !important") {
                        numberOfVisibleElement++;
                    }
                }

                const numberOfFound = document.querySelector(".liczba-specjalnosci")
                if (numberOfFound) {
                    numberOfFound.textContent = numberOfVisibleElement;
                }
            }

        }
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
        } catch (ex) { }
    }



    function bulidTheFiltersElements() {
        jQuery("#new-results-wrapper .filters").append(
            `<h3>Filtruj wyniki</h3>
        <hr>
        <fieldset class="city-filter-box">
            <legend>lokalizacja:<i class="icon-arrow-down-open" aria-hidden="true"></i></legend>
            <ul class="city-filter-box-btns list-style-none">
            </ul>
        </fieldset>

        <hr>

        <fieldset class="level-filter-box">
                <legend>poziom studiów:<i class="icon-arrow-down-open" aria-hidden="true"></i></legend>
                <ul class="level-filter-box-btns list-style-none">
                </ul>
        </fieldset>

        <hr>

        <fieldset class="discipline-filter-box">
             <legend>obszar tematyczny:<i class="icon-arrow-down-open" aria-hidden="true"></i></legend>
             <ul class="discipline-filter-box-btns list-style-none">
             </ul>
        </fieldset>

        <hr>

        <fieldset class="mode-filter-box">
             <legend>rodzaj zajęć:<i class="icon-arrow-down-open" aria-hidden="true"></i></legend>
             <ul class="mode-filter-box-btns list-style-none">
             </ul>
        </fieldset>

        <hr>

        <fieldset class="form-filter-box">
             <legend>forma studiów:<i class="icon-arrow-down-open" aria-hidden="true"></i></legend>
             <ul class="form-filter-box-btns list-style-none">
             </ul>
        </fieldset>
        <hr>
        <button class="close-filter-btn btn btn-ghost" data-filter="all">pokaż wyniki</button>
        <button class="clear-filter-btn btn" data-filter="all">wyczyść filtry</button>`
        )

        const getFilters = (attribute) => {
            return [...document.querySelectorAll('.studies-card')]
                .map(card => card.getAttribute(`data-${attribute}`).split(";"))
                .flat()
                .map(e => e.trim())
                .filter(e => e !== "")
                .sort();
        };

        const removeDuplicatesAndEmpty = (filters) => {
            return new Set(filters);
        };

        const processFormFilters = () => {
            let formFilteresFixed = getFilters('form').map(e => {
                if (e === " na uczelni") return "na uczelni";
                if (e === " online") return "online";
                return e;
            });

            formFilteresFixed = removeDuplicatesAndEmpty(formFilteresFixed);

            ["online", "na uczelni", "hybrydowo"].forEach(value => {
                if (formFilteresFixed.has(value)) {
                    formFilteresFixed.delete(value);
                    formFilteresFixed.add(value);
                }
            });

            return formFilteresFixed;
        };

        // Fetch and process all filters
        let cityFilters = removeDuplicatesAndEmpty(getFilters('city'));
        let levelFilters = removeDuplicatesAndEmpty(getFilters('level'));
        let modeFilters = removeDuplicatesAndEmpty(getFilters('mode').reverse());
        let disciplineFilters = removeDuplicatesAndEmpty(getFilters('discipline'));
        let formFilteresFixed = processFormFilters();

        //added used-filters-wrapper box into curent-searchbox 
        jQuery(".current-search-box").append(`<div aria-label="wybrane filtry" class="used-filters-wrapper"></div>`)

        const appendFilters = (filters, filterType, filterBoxClass, inputName) => {
            const resultsWrapper = document.querySelector("#new-results-wrapper");
            const filterBoxBtns = resultsWrapper.querySelector(`.${filterBoxClass}-btns`);
            const usedFiltersWrapper = document.querySelector(".used-filters-wrapper");

            if (filters.size) {
                filters.forEach(item => {
                    const li = document.createElement('li');
                    li.className = `btn btn-tag ${filterType}-filter-btn btn btn-ghost button-filter`;
                    li.innerHTML = `<input type="checkbox" id="${item}" name="${inputName}" value="${item}" tabindex="-1"><label for="${item}">${item}</label>`;
                    filterBoxBtns.appendChild(li);

                    const button = document.createElement('button');
                    button.style.display = "none";
                    button.className = `${filterType}-filter-btn button-filter`;
                    button.setAttribute("data-filter", item);
                    button.innerHTML = `${item}&nbsp;&nbsp;&nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" class="svg-icon">
                     <path d="M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75 1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925 11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z" fill="#0C7BC4"/>
                    </svg>`;
                    usedFiltersWrapper.appendChild(button);
                });
            } else {
                resultsWrapper.querySelector(`.${filterBoxClass}`).style.display = 'none';
            }
        };

        // Example usage for different filters
        appendFilters(cityFilters, 'city', 'city-filter-box', 'lokalizacja');
        appendFilters(levelFilters, 'level', 'level-filter-box', 'poziom');
        appendFilters(disciplineFilters, 'discipline', 'discipline-filter-box', 'dyscyplina');
        appendFilters(modeFilters, 'mode', 'mode-filter-box', 'tryb');
        appendFilters(formFilteresFixed, 'form', 'form-filter-box', 'forma');

        jQuery(".read-more-content").append(`<button class="btn show-results button-filter">Pokaż wyniki</button>`)

        // if (formFilteresFixed.size == 0) {
        //     jQuery(".form-filter-box").hide();
        // }

        var h3 = document.createElement('h3');
        // Ustawienie stylów dla elementu
        if (jQuery(window).width() < 1200) {
            h3.style.cssText = 'font-size: 1.5rem; letter-spacing: 0.02px;';
        }
        else {
            h3.style.cssText = 'flex-basis: 100%; font-size: 1.5rem; letter-spacing: 0.02px;';
        }
        // Dodanie tekstu do elementu h3
        h3.textContent = 'Obszary tematyczne studiów';
        // Dodanie elementu h3 do drzewa DOM
        // Przykład: dodanie go do elementu body

        const readMoreContentElement = document.querySelector('.read-more-content')
        if (readMoreContentElement) {
            readMoreContentElement.insertBefore(h3, readMoreContentElement.firstChild);
        }
    }



    function createDynamicFiltersBtns() {
        // city filter 
        var cityFilters = []
        jQuery(".studies-card").each(function () {
            var occ = jQuery(this).attr('data-city').split(";");
            if (occ && jQuery(this).attr('style') == "display:flex !important")
                cityFilters.push(occ);
        });
        cityFilters = cityFilters.flat()
        cityFilters = new Set([...cityFilters].map(e => e.trim()).sort());
        cityFilters.delete("") // usuniecie pustych znakow 
        cityFilters.delete(" ") // usuniecie pustych znakow



        //level filters 
        var levelFilters = []
        jQuery(".studies-card").each(function () {
            var occ = jQuery(this).attr('data-level').split(";");
            if (occ && jQuery(this).attr('style') == "display:flex !important")
                levelFilters.push(occ);
        });

        levelFilters = levelFilters.flat()
        levelFilters = new Set([...levelFilters].map(e => e.trim()).sort());
        levelFilters.delete("") // usuniecie pustych znakow 
        levelFilters.delete(" ") // usuniecie pustych znakow

        jQuery(".level-filter-box a").each(function () {
            if (levelFilters.has(jQuery(this).attr("data-filter"))) {
                jQuery(this).show()
            } else { jQuery(this).hide() }
        })


        // mode filteres 
        var modeFilters = []
        jQuery(".studies-card").each(function () {
            var occ = jQuery(this).attr('data-mode').split(";");
            if (occ && jQuery(this).attr('style') == "display:flex !important")
                modeFilters.push(occ);
        });

        modeFilters = modeFilters.flat()
        modeFilters = new Set([...modeFilters].map(e => e.trim()).reverse());
        modeFilters.delete("") // usuniecie pustych znakow 
        modeFilters.delete(" ") // usuniecie pustych znakow

        jQuery(".mode-filter-box a").each(function () {
            if (modeFilters.has(jQuery(this).attr("data-filter"))) {
                jQuery(this).show()
            } else { jQuery(this).hide() }
        })

        // discipline filters
        var disciplineFilters = []
        jQuery(".studies-card").each(function () {
            var occ = jQuery(this).attr('data-discipline').split(";");
            if (occ && jQuery(this).attr('style') == "display:flex !important")
                disciplineFilters.push(occ);
        });

        disciplineFilters = disciplineFilters.flat()
        disciplineFilters = new Set([...disciplineFilters].map(e => e.trim()).sort());
        //disciplineFilters = new Set(disciplineFilters.sort()); // usuniecie unikatow
        disciplineFilters.delete("") // usuniecie pustych znakow 
        disciplineFilters.delete(" ") // usuniecie pustych znakow

        jQuery(".discipline-filter-box a").each(function () {
            if (disciplineFilters.has(jQuery(this).attr("data-filter"))) {
                jQuery(this).show()
            } else { jQuery(this).hide() }
        })

        // form filteres START 
        var formFilters = []
        jQuery(".studies-card").each(function () {
            var occ = jQuery(this).attr('data-form').split(";");
            if (occ && jQuery(this).attr('style') == "display:flex !important")
                formFilters.push(occ);
        });

        formFilters = formFilters.flat()
        formFilters = new Set([...formFilters].map(e => e.trim()).sort());
        // formFilters = new Set(formFilters.sort()); // usuniecie unikatow
        formFilters.delete("") // usuniecie pustych znakow 
        formFilters.delete(" ") // usuniecie pustych znakow

        if (formFilters.has("online")) {
            formFilters.delete("online")
            formFilters.add("online")

        }
        if (formFilters.has("na uczelni")) {
            formFilters.delete("na uczelni")
            formFilters.add("na uczelni")

        }
        if (formFilters.has("hybrydowo")) {
            formFilters.delete("hybrydowo")
            formFilters.add("hybrydowo")

        }

        jQuery(".form-filter-box a").each(function () {
            if (formFilters.has(jQuery(this).attr("data-filter"))) {
                jQuery(this).show()
            } else { jQuery(this).hide() }
        })
        hideInterestingFieldIfEmpty();

        // form filteres END 
    }
    jQuery("html, body").scrollTop(0)


    function animationsAndTogglesButtonsOfFilters() {
        document.querySelectorAll('.filters legend').forEach(function (legend) {
            function toggleList(event) {
                if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
                    let box = legend.closest('.city-filter-box, .level-filter-box, .mode-filter-box, .discipline-filter-box, .form-filter-box');
                    if (box) {
                        box.classList.toggle('rotate');

                        let buttons = legend.nextElementSibling;
                        if (buttons && buttons.tagName === 'UL') {
                            let isHidden = buttons.style.display === 'none' || buttons.style.display === '';
                            buttons.style.display = isHidden ? 'flex' : 'none';

                            if (isHidden && event.type === 'keydown' && event.key === 'Enter') {
                                let firstItem = buttons.querySelector('li:first-child');
                                if (firstItem) {
                                    firstItem.focus();
                                }
                            }
                        }
                    }
                }
            }

            legend.addEventListener('click', toggleList);
            legend.addEventListener('keydown', toggleList);

            legend.setAttribute('tabindex', '0');
            legend.setAttribute('role', 'button');
        });

        document.querySelectorAll('.city-filter-box-btns, .level-filter-box-btns, .mode-filter-box-btns, .discipline-filter-box-btns, .form-filter-box-btns').forEach(function (btn) {
            btn.style.display = 'none';
        });

        // Ustawienie tabindex dla elementów li, aby były focusowane
        document.querySelectorAll('.filters li.btn').forEach(function (li) {
            li.setAttribute('tabindex', '0');

            // Dodanie nasłuchiwania zdarzeń klawiatury dla elementów li
            li.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    // Aktywacja checkboxa przy naciśnięciu Enter lub Spacji
                    let checkbox = li.querySelector('input[type="checkbox"]');
                    if (checkbox) {
                        checkbox.checked = !checkbox.checked;
                        event.preventDefault();
                    }
                } else if (event.key === 'ArrowDown') {
                    // Przejście do następnego elementu li
                    let nextLi = li.nextElementSibling;
                    if (nextLi) {
                        nextLi.focus();
                        event.preventDefault();
                    }
                } else if (event.key === 'ArrowUp') {
                    // Przejście do poprzedniego elementu li
                    let prevLi = li.previousElementSibling;
                    if (prevLi) {
                        prevLi.focus();
                        event.preventDefault();
                    }
                }
            });
        });
    }

    animationsAndTogglesButtonsOfFilters();

    function showHideKierunekBox() {
        $('.kierunek-box').each(function () {
            var isAnyVisible = false;
            $(this).find('.studies-card').each(function () {
                if ($(this).css('display') !== 'none') {
                    isAnyVisible = true;
                }
            });
            if (!isAnyVisible) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    }



    function createClickableWholeElement() {
        jQuery(".studies-card").each(function () {
            var link = jQuery(this).find("a").attr("href");
            jQuery(this).attr("onclick", 'window.location.href="' + link + '"');
            jQuery(this).css("cursor", "pointer");
        })
    }

    function sortingSearchResults() {
        jQuery(".studies-card").each(function () {
            var title = jQuery(this).find("h3").text()
            jQuery(this).attr('data-title-name', title)
        });

        function sortAB(a, b) {
            let an = a.firstChild.getAttribute('data-title-name')
            let bn = b.firstChild.getAttribute('data-title-name')
            return an.localeCompare(bn);
        }

        function sortBA(a, b) {
            let an = a.firstChild.getAttribute('data-title-name')
            let bn = b.firstChild.getAttribute('data-title-name')
            return bn.localeCompare(an);
        }
        const sortingEl = document.querySelector("#sorting")
        sortingEl.addEventListener('change', (event) => {

            var wyszukiwarka = jQuery('.wyniki-wyszukiwania');
            var listaWynikow = wyszukiwarka.children(".kierunek");
            var featuredWyszukiwarka = jQuery(".featured")


            if (event.target.value === "a-z") {
                listaWynikow.sort(sortAB).detach().appendTo(wyszukiwarka);
                if (featuredWyszukiwarka.children().length >= 3) {
                    var featuredlistaWynikow = featuredWyszukiwarka.children(".kierunek");
                    featuredlistaWynikow.sort(sortAB).detach().appendTo(featuredWyszukiwarka);
                }
            }
            if (event.target.value === "z-a") {
                listaWynikow.sort(sortBA).detach().appendTo(wyszukiwarka);
                if (featuredWyszukiwarka.children().length >= 3) {
                    var featuredlistaWynikow = featuredWyszukiwarka.children(".kierunek");
                    featuredlistaWynikow.sort(sortBA).detach().appendTo(featuredWyszukiwarka);
                }
            }
            hideInterestingFieldIfEmpty();
        })
    }

    function hideInterestingFieldIfEmpty() {
        jQuery(".featured").find(".studies-card").each(function () {
            if (jQuery(this).attr("style") == "display:flex !important" || jQuery(this).css("display") == "flex") {
                jQuery(".featured").show();
            } else {
                jQuery(".featured").hide();
            }
        })
    }

    function bulidFiltersAndLogicForMobile() {

        jQuery("#new-results-wrapper > div:nth-child(2)")
            .append(`<div class="mobile-filter">
                <button class="button-mobile-filter btn" aria-expanded="false">Filtruj<i class="icon-preferences" aria-hidden="true"></i></button>
                </div>`)

        jQuery("#new-results-wrapper > div:nth-child(1) > div > h3").append(`<span class="close close-filter" style="display: flex;"></span>`)

        jQuery(".button-mobile-filter").click(function () {
            jQuery("html, body").animate({ scrollTop: 0 }, 500)
            jQuery(".filters").addClass("mobile")
            jQuery(".button-mobile-filter").parent().hide();
            //  jQuery(".appla").addClass("on")
        })

        jQuery(".filters .close-filter").click(function () {
            jQuery(".filters").removeClass("mobile")
            jQuery(".appla").removeClass("on")
            jQuery(".button-mobile-filter").parent().show();
        })

        createDynamicFiltersBtns()
    }

    function updateAllSelectedCounts() {
        // Definiuj kontenery filtrów
        const filterContainers = [
            '.city-filter-box',
            '.level-filter-box',
            '.discipline-filter-box',
            '.mode-filter-box',
            '.form-filter-box'
        ];

        filterContainers.forEach(containerSelector => {
            // Znajdź kontener dla danego filtru
            const filterContainer = document.querySelector(containerSelector);
            if (!filterContainer) return; // jeśli kontener nie istnieje, kontynuuj z następnym

            // Policz wszystkie elementy z klasą 'active' w kontenerze z przyciskami
            const buttonsContainer = filterContainer.querySelector('ul, .mode-filter-box-btns, .form-filter-box-btns');
            const selectedCount = buttonsContainer ? buttonsContainer.querySelectorAll('.active').length : 0;

            // Znajdź element <legend> dla danego filtru
            const legend = filterContainer.querySelector('legend');
            if (!legend) return; // jeśli element <legend> nie istnieje, kontynuuj z następnym

            // Sprawdź, czy istnieje już element <span>
            let countSpan = legend.querySelector('.selected-count');

            // Jeśli nie istnieje, utwórz nowy element <span>
            if (!countSpan) {
                countSpan = document.createElement('span');
                countSpan.className = 'selected-count';
                legend.appendChild(countSpan);
            }

            // Ustaw tekst elementu <span> na liczbę zaznaczonych elementów lub czyść go, jeśli jest zero
            if (selectedCount > 0) {
                countSpan.textContent = `${selectedCount}`;
                countSpan.style.display = 'inline'; // Pokaż element
            } else {
                countSpan.style.display = 'none';
            }
        });
    }

    // Przykładowe wywołanie funkcji
    updateAllSelectedCounts();

    function filterResultBaseOnObj() {
        const studyFields = document.querySelectorAll(".studies-card")
        const FiltersBtns = document.querySelectorAll(".button-filter");
        const Filters = {
            city: [],
            level: [],
            mode: [],
            form: [],
            discipline: []
        };

        const updateFilter = (filterType, filter, button, clickedOnImage) => {
            const filterIndex = Filters[filterType].indexOf(filter);
            const isActive = filterIndex !== -1;

            if (isActive) {
                Filters[filterType].splice(filterIndex, 1);
                if (!clickedOnImage) button.classList.remove("active");
                document.querySelectorAll(`[data-filter='${filter}']`).forEach(el => el.style.display = 'none');
                // Usunięcie klasy active z odpowiadającego elementu li
                document.querySelectorAll(`.${filterType}-filter-btn`).forEach(el => {
                    if (el.querySelector("input") && el.querySelector("input").value === filter) {
                        el.classList.remove("active");
                    }
                });
            } else {
                Filters[filterType].push(filter);
                if (!clickedOnImage) button.classList.add("active");
                document.querySelectorAll(`[data-filter='${filter}']`).forEach(el => el.style.display = 'flex');
                // Dodanie klasy active do odpowiadającego elementu li
                document.querySelectorAll(`.${filterType}-filter-btn`).forEach(el => {
                    if (el.querySelector("input") && el.querySelector("input").value === filter) {
                        el.classList.add("active");
                    }
                });
            }
        };

        const handleButtonClick = (e, filterType, button) => {
            e.preventDefault();

            let filter;
            const clickedOnImage = e.target.tagName === 'IMG';

            if (button.tagName === 'BUTTON') {
                // Jeśli elementem jest button, użyj data-filter
                filter = button.getAttribute('data-filter');
            } else if (button.tagName === 'LI') {
                // Jeśli elementem jest li, znajdź input i użyj jego wartości
                const input = button.querySelector("input");
                if (input) {
                    filter = input.value;
                }
            }

            if (filter) {
                updateFilter(filterType, filter, button, clickedOnImage);
            } else {
                console.error('Filter value not found');
            }
        };

        const addFilterEventListeners = (buttons, filterType) => {
            buttons.forEach(button => {
                button.addEventListener("click", (e) => handleButtonClick(e, filterType, button));
                button.addEventListener("keydown", (e) => {
                    if (e.key === " " || e.key === "Enter") {
                        handleButtonClick(e, filterType, button);
                    }
                });
            });
        };

        addFilterEventListeners(document.querySelectorAll(".city-filter-btn"), 'city');
        addFilterEventListeners(document.querySelectorAll(".level-filter-btn"), 'level');
        addFilterEventListeners(document.querySelectorAll(".mode-filter-btn"), 'mode');
        addFilterEventListeners(document.querySelectorAll(".form-filter-btn"), 'form');
        addFilterEventListeners(document.querySelectorAll(".discipline-filter-btn"), 'discipline');


        const labels = document.querySelectorAll('.mauticform-checkboxgrp-label');
        labels.forEach(label => {
            label.addEventListener('click', (e) => {
                // Pobranie checkboxa powiązanego z klikniętą etykietą
                const checkbox = label.querySelector('.mauticform-checkboxgrp-checkbox');

                // Sprawdzenie, czy kliknięto bezpośrednio na checkbox, jeśli tak, to nie wykonuj dalszych działań
                if (e.target === checkbox) {
                    return;
                }

                // Zmiana stanu checkboxa
                checkbox.checked = !checkbox.checked;

                // Wywołanie zdarzenia 'change' dla checkboxa
                const event = new Event('change');
                checkbox.dispatchEvent(event);
            });
        });


        const checkboxes = document.querySelectorAll('.mauticform-checkboxgrp-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const filter = e.currentTarget.value;
                const isFilterActive = Filters.discipline.includes(filter);
                const clickedOnImage = e.currentTarget.tagName === 'IMG';
                if (Filters.discipline.includes(filter)) {
                    Filters.discipline.splice(Filters.discipline.indexOf(filter), 1)
                    if (!clickedOnImage) {
                        e.currentTarget.classList.remove("active");
                    }
                    jQuery(".filters").find(`[data-filter='${filter}']`).removeClass("active")
                    jQuery(".used-filters-wrapper").find(`[data-filter='${filter}']`).attr("style", "display:none")
                } else {
                    Filters.discipline.push(filter)
                    if (!clickedOnImage) {
                        e.currentTarget.classList.add("active");
                    }
                    jQuery(".used-filters-wrapper").find(`[data-filter='${filter}']`).attr("style", "display:flex")
                }

                //Update the state of the corresponding button
                const correspondingButton = document.querySelector(`.discipline-filter-btn[data-filter="${filter}"]`);
                if (correspondingButton) {
                    correspondingButton.classList.toggle('active', !isFilterActive);
                }
            });
        });

        // 
        let featuredBox = document.querySelector('.featured')
        let bigTitle = document.querySelector('#new-results-wrapper div.wyniki-wyszukiwania > h3');

        for (let i = 0; i < FiltersBtns.length; i++) {
            // Funkcja obsługująca event
            const handleEvent = (e) => {
                e.preventDefault();
                console.log("jestem");
                updateAllSelectedCounts();
                console.log(Filters);
                studyFields.forEach((study) => {
                    var tablicaWszystkichAtrybutowJednegoElementu = [];
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.city.split(";"));
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.level.split(";"));
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.mode.split(";"));
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.form.split(";"));
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.discipline.split(";"));

                    tablicaWszystkichAtrybutowJednegoElementu = tablicaWszystkichAtrybutowJednegoElementu.flat();
                    if (Object.values(Filters).length == 0) {
                        jQuery(study).attr('style', 'display:flex !important');
                        jQuery(".filters").find(".active").removeClass("active");
                        if (featuredBox) {
                            featuredBox.style.display = "block";
                        }
                        if (bigTitle) {
                            bigTitle.style.visibility = "visible";
                            bigTitle.style.marginTop = "2rem";
                        }
                    } else {
                        if (featuredBox) {
                            featuredBox.style.display = "none";
                        }
                        if (bigTitle) {
                            bigTitle.style.visibility = "hidden";
                            bigTitle.style.marginTop = "-1rem";
                        }

                        if (
                            (Filters.city.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.city.length == 0) &&
                            (Filters.level.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.level.length == 0) &&
                            (Filters.mode.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.mode.length == 0) &&
                            (Filters.form.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.form.length == 0) &&
                            (Filters.discipline.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.discipline.length == 0)
                        ) {
                            if (!jQuery(study).hasClass("city-card")) {
                                jQuery(study).attr('style', 'display:flex !important');
                            }
                            if (jQuery(study).parent().hasClass("kierunek-box")) {
                                jQuery(study).parent().show();
                                jQuery(study).parent().css({ "margin-bottom": "20px" });
                                console.log("jest");
                            }
                        } else {
                            jQuery(study).attr('style', 'display:none !important');
                            if (jQuery(study).parent().hasClass("kierunek-box")) {
                                jQuery(study).parent().hide();
                            }
                        }
                    }
                });
                updateNumberOfSpec();
                updateNumberOfField();
                showHideKierunekBox();
            };

            // Dodaj event listener dla kliknięcia
            FiltersBtns[i].addEventListener("click", handleEvent);

            // Dodaj event listener dla klawiszy spacji i enter
            FiltersBtns[i].addEventListener("keydown", (e) => {
                if (e.key === " " || e.key === "Enter") {
                    handleEvent(e);
                }
            });
        }


        jQuery(".current-search-box h2").html("Twoje wyniki wyszukiwania")
    }


    jQuery(document).ready(function () {
        if (window.location.href.indexOf("oferta") > -1 || window.location.href.indexOf("studia") > -1) {

            bulidTheFiltersElements();


            animationsAndTogglesButtonsOfFilters();

            createClickableWholeElement();

            sortingSearchResults()


            console.log(":)")

            const listOfElementsWithKierunekBoxClass = document.querySelectorAll(".kierunek-box")
            listOfElementsWithKierunekBoxClass.forEach(function (el) {
                if (el.children.length === 1) {
                    el.classList.remove("kierunek-box")
                };
            });
            const studyFields = document.querySelectorAll(".studies-card")
            const usedFilterWrapper = document.querySelectorAll(".used-filters-wrapper button")

            jQuery(".clear-filter-btn").click(function () {

                jQuery(".filters").find(".active").removeClass("active");
                //window.scrollTo(0);
                studyFields.forEach((study) => {
                    jQuery(study).attr('style', 'display:flex !important');
                    if (jQuery(study).parent().hasClass("kierunek-box")) {
                        jQuery(study).parent().show();
                    }
                })
                usedFilterWrapper.forEach((field) => {
                    field.style.display = "none";

                })

                const studiesCard = document.querySelectorAll('.multiple-filed .studies-card');
                const cityCards = document.querySelectorAll(".city-card")

                cityCards.forEach(e => {
                    e.setAttribute('style', 'display:none !important')
                })
                studiesCard.forEach(e => {
                    e.classList.add("expanded");
                })


                filterResultBaseOnObj()
                createDynamicFiltersBtns();
                updateNumberOfSpec();
                updateNumberOfField();

                function smoothScroll(target, duration) {
                    let targetPosition = target.getBoundingClientRect().top;
                    let startPosition = window.scrollY;

                    let distance;

                    if (window.innerWidth < 700) {
                        distance = targetPosition - 150;
                    } else {
                        distance = targetPosition - 150;
                    }
                    let startTime = null;

                    function animation(currentTime) {
                        if (startTime === null) startTime = currentTime;
                        let timeElapsed = currentTime - startTime;
                        let run = ease(timeElapsed, startPosition, distance, duration);
                        //  
                        if (timeElapsed < duration) requestAnimationFrame(animation);
                    }

                    function ease(t, b, c, d) {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t + b;
                        t--;
                        return -c / 2 * (t * (t - 2) - 1) + b;
                    }

                    requestAnimationFrame(animation);
                }
                const smoothScrollToNewResults = () => {
                    let targetElement = document.getElementById('new-results-wrapper');

                    smoothScroll(targetElement, 450);
                };

                smoothScrollToNewResults();

                const fieldsCount = document.querySelectorAll(".selected-count")
                fieldsCount.forEach((field) => {
                    field.style.display = "none";
                })
            })


            const newSearchEl = document.querySelector(".new-search")
            newSearchEl.addEventListener("click", function () {
                document.querySelector(".js-toggle-search").click();
            })
        } else {
            console.log("This is not a ofert site")
        }

        bulidFiltersAndLogicForMobile();
        jQuery(".clear-filter-btn").click();
    });

}(jQuery);





function hideInterestingFieldIfEmpty() {
    jQuery(".featured").find(".studies-card").each(function () {
        if (jQuery(this).attr("style") == "display:flex !important" || jQuery(this).css("display") == "flex") {
            jQuery(".featured").show();
        } else {
            jQuery(".featured").hide();
        }
    })
}
function filterByTyping() {
    hideInterestingFieldIfEmpty()
    jQuery(".clear-filter-btn").click();
    var resultsOfSearch = jQuery(".wyniki-wyszukiwania .studies-card:not(.city-card)") //nowa
    var typingFilter = document.getElementById("typingFilter").value.toUpperCase();
    function updateNumberOfField() {
        const expertsFields = document.querySelectorAll(".studies-card.kierunek")
        let numberOfVisibleElement = 0;
        if (expertsFields.length == 0) { return; }
        for (let i = 0; i < expertsFields.length; i++) {
            if (expertsFields[i].getAttribute("style") == "display:flex !important") {
                numberOfVisibleElement++;
            }
        }

        const numberOfFound = document.querySelector(".liczba-kierunkow")
        let word;
        if (numberOfVisibleElement === 1) {
            word = "kierunek";
        } else if (numberOfVisibleElement >= 2 && numberOfVisibleElement <= 4) {
            word = "kierunki";
        } else {
            word = "kierunków";
        }
        numberOfFound.textContent = `${numberOfVisibleElement} ${word}`;
    }



    for (let i = 0; i < resultsOfSearch.length; i++) {

        var valueOfText = resultsOfSearch[i].getAttribute('data-title-fullname').toUpperCase()
        // console.log(valueOfText)
        if (valueOfText.toUpperCase().includes(typingFilter)) {
            resultsOfSearch[i].setAttribute('style', 'display:flex !important');

            if (resultsOfSearch[i].parentElement.classList.contains("kierunek-box")) {
                resultsOfSearch[i].parentElement.setAttribute('style', 'display:flex !important;flex-direction:column')
            }
            if (resultsOfSearch[i].classList.contains("specjalnosc")) {
                resultsOfSearch[i].setAttribute('style', 'display:flex !important');
                resultsOfSearch[i].parentElement.parentElement.parentElement
                    .querySelector(".kierunek")
                    .setAttribute('style', 'display:flex !important')
            }

        }
        if (typingFilter == "koniec!") {
            resultsOfSearch[i].parentElement.parentElement
                .setAttribute('style', 'display:flex !important');
            jQuery(".kierunek-box").each(function () {
                jQuery(this).css({ "border": "1px solid #c2c2c2", "margin-bottom": "0" })
            })
        }
        if (!valueOfText.toUpperCase().includes(typingFilter)) {
            //    if (!resultsOfSearch[i].textContent.toUpperCase().includes(typingFilter)) {
            resultsOfSearch[i].setAttribute('style', 'display:none !important');

            // jQuery(".kierunek-box").each(function () {
            //     jQuery(this).css({ "border": "none", "margin-bottom": "20px" })
            //     // jQuery(this).css({ "border": "none", })
            // })


            // jQuery(".kierunek-box").each(function () {
            //     jQuery(this).children().each(function () {
            //         if (jQuery(this).is(':visible')) {
            //             jQuery(this).parent().css({ "border": "none", "margin-bottom": "20px" });
            //         }
            //         else {
            //             jQuery(this).parent().css({ "border": "none", "margin-bottom": "0px" });
            //         }
            //     });
            // });
        }

        jQuery(".multiple-filed").each(function () {
            var areAllChildrenHidden = true;
            jQuery(this).children().each(function () {
                if (jQuery(this).css('display') !== 'none') {
                    areAllChildrenHidden = false;
                    return false; // przerywa pętlę
                }
            });

            if (areAllChildrenHidden) {
                jQuery(this).css({ 'margin-bottom': '0', 'border': 'none' });
            } else {
                jQuery(this).css({ 'margin-bottom': '20px', 'border': '' }); // przywróć domyślny styl obramowania jeśli potrzebujesz
            }
        });

        updateNumberOfField();
    }

}

document.addEventListener("DOMContentLoaded", function () {
    const wynikiWyszukiwania = document.querySelector(".wyniki-wyszukiwania");
    const moduletable = document.querySelector("#new-results-wrapper > div:nth-child(1) > div.moduletable");

    if (wynikiWyszukiwania && moduletable) {
        wynikiWyszukiwania.insertAdjacentElement("afterend", moduletable);
    } else {
        console.warn("Elementy o klasach 'wyniki-wyszukiwania' i/lub 'moduletable' nie istnieją na stronie.");
    }
    function calculateDistance() {
        // Znajdujemy oba elementy na podstawie selektorów CSS
        const element1 = document.querySelector('.slick-active > div > div > div > h1');
        const element2 = document.querySelector('.big-slider');
        const elToMove = document.querySelector('.slick-dots');
        // Upewniamy się, że oba elementy istnieją
        if (element1 && element2) {
            // Używamy metody getBoundingClientRect(), żeby znaleźć pozycję obu elementów
            const rect1 = element1.getBoundingClientRect();
            const rect2 = element2.getBoundingClientRect();

            // Obliczamy odległość między dolną krawędzią elementu1 a górną krawędzią elementu2
            const distance = rect2.bottom - rect1.bottom;

            const distanceToMove = -distance + 26;
            elToMove.style.transform = `translateY(${distanceToMove}px)`;
            elToMove.style.transition = 'transform 0.5s ease';
            console.log("przesuniete")
            // Zwracamy obliczoną odległość
            return distanceToMove;
        } else {
            // Zwracamy null, jeśli którykolwiek z elementów nie istnieje
            return null;
        }

    }

    // calculateDistance();

    const obszary = document.querySelector(".obszary-test");
    const listing = document.querySelector(".studia-podyplomowe-listing")
    if (obszary) {
        jQuery('.big-slider').slick({
            dots: true,
            autoplay: true,
            autoplaySpeed: 4000,
            infinite: true,
            //speed: 500,
            pauseOnHover: false,
            fade: true,
            cssEase: 'linear'
        });

        $('.big-slider').on('afterChange', function () {
            // calculateDistance();
        });

        let typingFilterElement = document.querySelector('.search-sorting-box .icon-inside');
        let searchBlockContainer = document.querySelector('.search-block.container');
        let titleElement = searchBlockContainer.querySelector('.title');
        let subTitleElement = searchBlockContainer.querySelector('.sub-title');

        // Sprawdź, czy wszystkie elementy istnieją
        if (typingFilterElement && searchBlockContainer && titleElement && subTitleElement) {
            // Przenieś element 'typingFilter' między 'title' i 'sub-title'
            searchBlockContainer.insertBefore(typingFilterElement, subTitleElement);
        } else {
            console.error("Nie można odnaleźć wszystkich potrzebnych elementów");
        }

        let element = document.querySelector('#new-results-wrapper > div:nth-child(1) > div > h3');
        element.textContent = "Filtruj kierunki studiów";
        if (listing) {
            element.textContent = "Filtruj studia podyplomowe";
        }

        const podyplomoweListing = document.querySelector(".studia-podyplomowe-listing")
        if (podyplomoweListing) {
            let levelFilterBox = document.querySelector(".level-filter-box")
            levelFilterBox.style.display = "none"
            levelFilterBox.nextElementSibling.style.display = "none"

            let modeFilterBox = document.querySelector(".mode-filter-box")
            modeFilterBox.style.display = "none"
            modeFilterBox.nextElementSibling.style.display = "none"

            let formFilterBox = document.querySelector(".form-filter-box")
            formFilterBox.querySelector("p").textContent = "rodzaj zajęć"

        }

        let wynikiWyszukiwania = document.querySelector(".wyniki-wyszukiwania")
        wynikiWyszukiwania.style.marginTop = "2.2rem";


        var $bigSlider = jQuery('.big-slider');
        var $playStopButton = jQuery('.play-stop');
        var $playIcon = jQuery('.play');
        var $stopIcon = jQuery('.stop');

        // Inicjalizacja slick slider


        // Funkcja do zatrzymywania i uruchamiania slidera
        function toggleAutoplay() {
            if ($bigSlider.slick('slickGetOption', 'autoplay')) {
                $bigSlider.slick('slickSetOption', 'autoplay', false, true);
                $bigSlider.slick('slickPause');
                $playIcon.css('visibility', 'visible');
                $stopIcon.css('visibility', 'hidden');
            } else {
                $bigSlider.slick('slickSetOption', 'autoplay', true, true);
                $bigSlider.slick('slickPlay');
                $playIcon.css('visibility', 'hidden');
                $stopIcon.css('visibility', 'visible');
            }
        }

        // Przypisanie funkcji do kliknięcia przycisku
        $playStopButton.on('click', toggleAutoplay);



    }

    function smoothScroll(target, duration) {
        let targetPosition = target.getBoundingClientRect().top;
        let startPosition = window.scrollY;

        let distance;

        if (window.innerWidth < 700) {
            distance = targetPosition - 150;
        } else {
            distance = targetPosition - 150;
        }
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            let timeElapsed = currentTime - startTime;
            let run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }



    let arrowElement = document.querySelector('.arrow-down');
    let textElement = document.querySelector('.search-block .sub-title');
    let typingFilter = document.querySelector('#typingFilter');
    let searchZoomIcon = document.querySelector('.search-block .icon-lupka');
    let suggestionBox = document.querySelector('#suggestionBox li');

    function smoothScrollToNewResults() {
        let targetElement = document.getElementById('new-results-wrapper');

        smoothScroll(targetElement, 450);
    };

    if (arrowElement) {
        arrowElement.addEventListener('click', smoothScrollToNewResults);

    }
    if (suggestionBox) {
        suggestionBox.addEventListener('click', smoothScrollToNewResults);

    }

    if (textElement) {
        textElement.addEventListener('click', function () {
            typingFilter.value = '';
            let event = new Event('keyup');
            typingFilter.dispatchEvent(event);
            smoothScrollToNewResults();
        });

    }

    if (searchZoomIcon) {
        searchZoomIcon.addEventListener('click', () => {
            if (typingFilter.value.length > 3) {
                smoothScrollToNewResults();
            }
        });

    }



    let inputElement = document.getElementById('typingFilter');
    inputElement.placeholder = 'wpisz kierunek lub specjalność';

    if (listing) {
        inputElement.placeholder = 'wpisz kierunek';
    }


    const cointaner = document.querySelector("#content > div > div");
    if (cointaner) {
        cointaner.setAttribute("style", "position: relative")

    }




    const slider = document.querySelector(".big-slider")
    if (slider) {
        let autoplayButton = document.querySelector('.play-stop');
        if (autoplayButton && autoplayButton.parentElement) {
            autoplayButton.parentElement.style.position = 'relative';
        }


        let playIcon = document.querySelector('.play');
        let stopIcon = document.querySelector('.stop');
        playIcon.style.visibility = 'hidden';
        autoplayButton.setAttribute('style', 'position: absolute; top: 60%; right: 10%; display: flex;z-index: 10;');

        let isAutoplay = true;

        if (autoplayButton) {
            autoplayButton.addEventListener('click', function () {
                if (isAutoplay) {

                    slider.slick('slickPause');

                    playIcon.style.visibility = 'visible';
                    stopIcon.style.visibility = 'hidden';
                } else {

                    slider.slick('slickPlay');

                    stopIcon.style.visibility = 'visible';
                    playIcon.style.visibility = 'hidden';
                }

                isAutoplay = !isAutoplay;
            });

        }

    }


    const informatyka = true
    document.querySelector(".kulturoznawstwo");
    if (informatyka) {

        // Stworzenie nowego elementu do przechowywania podpowiedzi
        let suggestionBox = document.createElement('ul');
        suggestionBox.id = 'suggestionBox';
        suggestionBox.style.display = 'none'; // Ukrycie elementu początkowo
        document.querySelector('.icon-inside').appendChild(suggestionBox);

        //Pobranie elementów, z których będą pobierane podpowiedzi
        let studyCards = Array.from(document.querySelectorAll('.studies-card')).map(card => card.getAttribute('data-title-fullname').trim());

        // Usunięcie duplikatów z listy
        studyCards = Array.from(new Set(studyCards));


        // Pobranie elementu input
        let input = document.getElementById('typingFilter');

        document.addEventListener('click', function (event) {
            let suggestionBoxes = document.querySelectorAll('#suggestionBox');

            let isClickInside = Array.from(suggestionBoxes).some(suggestionBox => suggestionBox.contains(event.target));

            if (!isClickInside) {
                // Ukryj każdy suggestionBox, jeżeli kliknięcie nastąpiło poza nim
                suggestionBoxes.forEach(el => { el.style.display = 'none'; });

            }
        });

        // Dodanie nasłuchiwania na wprowadzanie tekstu do elementu input
        input.addEventListener('keyup', function () {
            // Wyczyszczenie poprzednich podpowiedzi
            suggestionBox.innerHTML = '';
            // Pobranie aktualnie wprowadzonego tekstu
            let text = input.value;

            let featuredBox = document.querySelector('.featured')
            let bigTitle = document.querySelector('#new-results-wrapper div.wyniki-wyszukiwania > h3');



            if (text) {
                // Znalezienie pasujących podpowiedzi
                if (featuredBox) {
                    featuredBox.style.display = 'none';
                }

                let matchingSuggestions = studyCards.filter(title => title.toLowerCase().includes(text.toLowerCase())); //nowe

                if (bigTitle) {
                    bigTitle.style.visibility = 'hidden';
                    bigTitle.style.marginTop = '-1rem';

                }

                if (matchingSuggestions.length > 0) {
                    // Pokazanie elementu z podpowiedziami
                    suggestionBox.style.display = 'block';
                    // Dodanie pasujących podpowiedzi do elementu
                    for (let suggestion of matchingSuggestions) {
                        let suggestionElement = document.createElement('li');
                        suggestionElement.textContent = suggestion;
                        suggestionBox.appendChild(suggestionElement);

                        // Dodanie event listenera do elementu li
                        suggestionElement.addEventListener('click', function () {

                            console.log(this.textContent);
                            // Skopiowanie tekstu do wyszukiwarki
                            input.value = this.textContent;
                            console.log("ukrycie")
                            smoothScrollToNewResults();
                            // Symulacja zdarzenia keyup
                            let event = new Event('keyup');
                            input.dispatchEvent(event);

                            let suggestionBox = document.getElementById('suggestionBox');
                            // Ukrycie podpowiedzi
                            suggestionBox.style.display = 'none';

                        });
                    }
                } else {
                    // Ukrycie elementu z podpowiedziami, jeśli nie ma żadnych pasujących podpowiedzi
                    suggestionBox.style.display = 'none';
                }
            } else {
                // Ukrycie elementu z podpowiedziami, jeśli pole input jest puste
                suggestionBox.style.display = 'none';
                if (featuredBox) {
                    featuredBox.style.display = 'block';

                }
                if (bigTitle) {
                    bigTitle.style.visibility = 'unset';
                    bigTitle.style.marginTop = '2rem';
                }

            }

        });
    }

    function showOnScroll() {

        var maxWidthForMobile = 1100; // Na przykład 768px

        // Sprawdzamy, czy szerokość okna jest mniejsza niż zdefiniowana wartość
        if (window.innerWidth <= maxWidthForMobile) {
            // Znajdujemy element na podstawie selektora CSS
            var element = document.querySelector('#new-results-wrapper > div:nth-child(2) > div.mobile-filter');

            // Sprawdzamy, czy strona została przewinięta; jeśli tak, to pokazujemy element
            if (window.scrollY > 0 && element) {
                element.style.display = 'flex';
            }
        }
    }

    // Dodajemy nasłuchiwacz zdarzenia "scroll" do obiektu `window`
    window.addEventListener('scroll', showOnScroll);

    document.getElementById('sorting').value = 'a-z';



    const elements = document.querySelectorAll('.kierunek.kierunek-box.multiple-filed .studies-card.kierunek');

    // Dla każdego elementu usuwa atrybut 'onclick'
    elements.forEach(element => {
        element.removeAttribute('onclick');
    });



    const btnsGhost = document.querySelectorAll('.kierunek.kierunek-box.multiple-filed .btn-ghost');
    const studiesCard = document.querySelectorAll('.multiple-filed .studies-card');
    const cityCards = document.querySelectorAll(".city-card")

    cityCards.forEach(e => {
        e.setAttribute('style', 'display:none !important')
    })
    studiesCard.forEach(e => {
        e.classList.add("expanded");
    })


    btnsGhost.forEach(btn => {
        btn.parentElement.parentElement.addEventListener('click', function (e) {
            e.preventDefault();

            const arrowIcon = btn.querySelector('.icon-arrow-down-open');
            const studiesCard = btn.closest('.studies-card.kierunek');
            const cityCards = btn.closest('.kierunek-box').querySelectorAll('.city-card');

            // Obracanie ikonki strzałki
            // arrowIcon.classList.toggle("rotated");

            // Pokazanie lub ukrycie elementów z klasą city-card
            cityCards.forEach(cityCard => {
                if (cityCard.getAttribute("style") === "display:flex !important") {
                    console.log("none 1")
                    cityCard.setAttribute('style', 'display:none !important');
                } else {
                    console.log("show 1")
                    cityCard.setAttribute('style', 'display:flex !important');
                }
            });

            // Ustawienie margin-bottom dla .studies-card.kierunek
            studiesCard.classList.toggle("expanded");
        });
    });


    cityCards.forEach(function (card) {
        // Znajdowanie elementu more-info wewnątrz każdego city-card
        var moreInfo = card.querySelector('.more-info a');
        // Sprawdzanie, czy link istnieje
        if (moreInfo && moreInfo.href) {
            // Dodawanie funkcji onclick do city-card
            card.onclick = function () {
                window.location.href = moreInfo.href;
            };
        }

    });

    // przewijak dla mobila 
    function scrollToInput() {
        var inputField = document.getElementById('typingFilter');

        inputField.addEventListener('focus', function () {

            if (window.innerWidth <= 1200) {
                inputField.scrollIntoView(true);
                window.scrollBy(0, -140);
            }
        });
    }

    // Wywołanie funkcji
    scrollToInput();

    const studiaPodyplomoweListing = document.querySelector(".studia-podyplomowe-listing ")

    if (studiaPodyplomoweListing) {
        jQuery(".popup_obszary > .btn").each(function () {
            jQuery(this).colorbox({
                rel: "popup",
                scrolling: jQuery(window).width() < 768,
                width: jQuery(window).width() < 768 ? "100%" : "60%",  // szerokość 100% dla ekranów mniejszych niż 768px
                // maxHeight: jQuery(window).width() < 768 ? "100%" : "80%", // maksymalna wysokość 100% dla ekranów mniejszych niż 768px
                height: jQuery(window).width() < 768 ? "100%" : "65%", // automatyczna wysokość dla urządzeń mobilnych
                close: "",
                inline: !0,
                href: jQuery(this).parent().find(".read-more-content"),
                onOpen: function () {
                    if (jQuery(window).width() > 768) {
                        //jQuery("body").addClass("no-scroll"); // Wyłącza skrolowanie na całej stronie
                        jQuery("html").addClass("block-scrolling")
                    }
                    jQuery("#colorbox").addClass("ppl-lightbox");
                },
                onLoad: function () {
                    jQuery("#cboxClose").addClass("close")
                },
                onClosed: function () {
                    if (jQuery(window).width() > 768) {
                        jQuery("html").removeClass("block-scrolling")
                        //jQuery("body").removeClass("no-scroll"); // Włącza skrolowanie na całej stronie
                    }
                }
            })
        })
        jQuery(".current-search-box h2").html("Wszystkie studia podyplomowe")


    } else {
        const btnElement = document.querySelector(".popup_obszary > .btn");
        if (btnElement) {
            btnElement.innerText = "zobacz kierunki"
            btnElement.addEventListener("click", function (e) {
                smoothScrollToNewResults()
            }
            )
        }
    }





    jQuery(".show-results").on("click", function () {
        // Zamykanie colorbox
        jQuery.colorbox.close();
        smoothScrollToNewResults();
    });


    //zmiana tekstu  
    const podyplomoweListing = document.querySelector(".studia-podyplomowe-listing")
    const obszaryClass = document.querySelector(".obszary")
    if (podyplomoweListing) {
        jQuery(".current-search-box h2").html("Wszystkie studia podyplomowe")
    }
    if (!podyplomoweListing && obszaryClass) {
        jQuery(".current-search-box h2").html("Wszystkie studia podyplomowe")
        jQuery("#new-results-wrapper .filters h3").html("Filtruj wszystkie <br> kierunki z tego obszaru")
    }




    var input = document.getElementById("typingFilter");
    input.addEventListener('click', function () {
        this.classList.add("expanded");
        this.readOnly = false; // Pozwól na wpisywanie tekstu
        this.placeholder = "wpisz kierunek"; // Zmień tekst placeholder
        if (document.querySelector(".studia-podyplomowe-listing")) {
            this.placeholder = "wpisz kierunek"; // Zmień tekst placeholder
        }
        else {
            this.placeholder = "wpisz kierunek lub specjalność"; // Zmień tekst placeholder
        }
        this.style.textAlign = "left"; // Wyrównaj tekst do lewej
        this.parentElement.querySelector(".icon-lupka").style.display = "block";
    });

    //remove the text "kierunkow"
    var element = document.querySelector(".liczba-kierunkow");
    if (element && element.nextSibling && element.nextSibling.nodeType === 3) {
        // Usuń tekstowy węzeł sąsiadujący z elementem .liczba-kierunkow
        element.nextSibling.remove();
    }


    function addTextToArrowDown() {
        // Znajdź wszystkie elementy z klasą 'arrow-down'
        const arrowDownElements = document.querySelectorAll('.arrow-down');

        // Iteruj przez każdy element z klasą 'arrow-down'
        arrowDownElements.forEach(function (element) {
            // Stwórz nowy element <p>
            const newTextElement = document.createElement('p');
            newTextElement.textContent = 'zobacz ofertę'; // Dodaj tekst

            // Dodaj style do nowego elementu
            newTextElement.style.color = 'white';
            newTextElement.style.width = '200px';
            newTextElement.style.textAlign = 'center';
            newTextElement.style.marginTop = '-4rem';
            newTextElement.className = 'arrow-text'; // Dodaj klasę

            // Dodaj nowy element <p> do aktualnego elementu 'arrow-down'
            if (document.querySelector(".studia-podyplomowe-listing")) {
                element.prepend(newTextElement);
            }
        });
    }

    // Wywołaj funkcję
    addTextToArrowDown();

    jQuery(".close-filter-btn").click(function () {
        jQuery(".appla").removeClass("on")
        jQuery(".filters").removeClass("mobile")

        smoothScrollToNewResults();
        jQuery(".button-mobile-filter").parent().show();
    })

    function groupElements() {
        const container = document.querySelector('.read-more-content');
        const items = Array.from(container.children);

        // Usuwamy nagłówek i przycisk z listy elementów, które będą grupowane
        const filteredItems = items.filter(item => item.tagName !== 'H3' && item.tagName !== 'BUTTON');

        while (filteredItems.length > 0) {
            // Tworzymy nowy div do grupowania elementów
            const newDiv = document.createElement('div');

            // Przenosimy pierwsze 7 elementów (lub mniej, jeśli zostało ich mniej) do nowego diva
            for (let i = 0; i < 7 && filteredItems.length > 0; i++) {
                newDiv.appendChild(filteredItems.shift());
            }

            // Dodajemy nowy div do kontenera
            container.insertBefore(newDiv, container.lastElementChild);
        }
    }
    if (jQuery(window).width() > 1200) {
        groupElements();
    }

    // Wywołaj funkcję


    if (jQuery(window).width() < 1200) {
        function moveMobileFilterBeforeFooter() {
            // Znajdź element .mobile-filter
            const mobileFilter = document.querySelector('.mobile-filter');

            // Znajdź element <footer>
            const footer = document.querySelector('footer');

            // Przenieś .mobile-filter przed <footer>
            if (mobileFilter && footer) {
                footer.parentNode.insertBefore(mobileFilter, footer);
            }
        }
        moveMobileFilterBeforeFooter();
        function addCloseButtonForMobile() {
            // Sprawdzanie, czy urządzenie jest mobilne na podstawie szerokości ekranu
            if (window.innerWidth < 768) {
                // Znajdź element input
                const input = document.getElementById('typingFilter');

                // Stwórz przycisk
                const closeButton = document.createElement('button');
                closeButton.type = 'button';
                closeButton.classList.add('close', 'clear-input-text');

                // Stylowanie przycisku
                closeButton.style.position = 'absolute';
                closeButton.style.top = '117px';
                closeButton.style.width = '1.5rem';
                closeButton.style.height = '1.5rem';
                closeButton.style.right = '24px';
                closeButton.style.display = 'none'; // Początkowo ukryty

                // Dodanie przycisku do DOM
                input.parentNode.insertBefore(closeButton, input.nextSibling);

                // Dodanie zdarzenia keyup do inputa
                input.addEventListener('keyup', function () {
                    if (input.value) {
                        closeButton.style.display = 'flex'; // Pokaż przycisk, gdy input nie jest pusty
                    } else {
                        closeButton.style.display = 'none'; // Ukryj przycisk, gdy input jest pusty


                    }
                });

                // Dodanie zdarzenia kliknięcia do przycisku (opcjonalne)
                closeButton.addEventListener('click', function () {
                    input.value = ''; // Wyczyść input
                    closeButton.style.display = 'none'; // Ukryj przycisk
                    jQuery(".clear-filter-btn").click()
                });
            }
        }

        // Wywołanie funkcji przy załadowaniu strony
        addCloseButtonForMobile();
    }

    console.log("JS END")

});
// obszary


// Funkcja do pokazania filtra dla mobile
function showMobileFilter() {
    const filters = document.querySelector('.filters');
    // filters.classList.add('mobile');
    document.body.classList.add('no-scroll'); // Zablokowanie scrollowania tła
}

// Funkcja do ukrycia filtra dla mobile
function hideMobileFilter() {
    const filters = document.querySelector('.filters');
    // filters.classList.remove('mobile');
    document.body.classList.remove('no-scroll'); // Odblokowanie scrollowania tła
}

// Obsługa kliknięcia w przycisk filtracji dla mobile
document.querySelector('.button-mobile-filter').addEventListener('click', function () {
    showMobileFilter();
});

// Obsługa kliknięcia w przycisk zamknięcia filtra
document.querySelector('.close-filter-btn').addEventListener('click', function () {
    hideMobileFilter();
});








