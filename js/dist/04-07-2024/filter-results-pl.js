! function ($) {

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
        numberOfFound.textContent = numberOfVisibleElement;
    }




    function updateNumberOfSpec() {
        const expertsFields = document.querySelectorAll(".studies-card.specjalnosc")
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
        //  numberOfFound.textContent = numberOfVisibleElement;
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
        <div class="city-filter-box">
            <div>
                <p>lokalizacja:</p><i class="icon-arrow-down-open" aria-hidden="true"></i>
            </div>
            <div class="city-filter-box-btns">

            </div>
        </div>
        <hr>
        <div class="level-filter-box">
            <div>
                <p>poziom studiów:</p><i class="icon-arrow-down-open" aria-hidden="true"></i>
            </div>
            <div class="level-filter-box-btns">

            </div>
        </div>
        <hr>
        <div class="discipline-filter-box">
            <div>
                <p>obszar tematyczny:</p><i class="icon-arrow-down-open" aria-hidden="true"></i>
            </div>
            <div class="discipline-filter-box-btns">

            </div>
        </div>
        <hr>
        <div class="mode-filter-box">
            <div>
                <p>forma studiów: </p><i class="icon-arrow-down-open" aria-hidden="true"></i>
            </div>
            <div class="mode-filter-box-btns">

            </div>
        </div>
        <hr>
        <div class="form-filter-box">
            <div>
                <p>zajęcia podyplomowe:</p><i class="icon-arrow-down-open" aria-hidden="true"></i>
            </div>
            <div class="form-filter-box-btns">

            </div>
        </div>
        <hr>
        <button class="close-filter-btn btn btn-ghost" data-filter="all">pokaż wyniki</button>
        <button class="clear-filter-btn btn" data-filter="all">wyczyść filtry</button>`
        )

        var cityFilters = []
        jQuery(".studies-card").each(function () {
            var occ = jQuery(this).attr('data-city').split(";")
            if (occ) cityFilters.push(occ);
        });

        var levelFilters = []
        jQuery(".studies-card").each(function () {
            var occ = jQuery(this).attr('data-level').split(";");
            if (occ) levelFilters.push(occ);
        });
        var modeFilters = []
        jQuery(".studies-card").each(function () {
            var occ = jQuery(this).attr('data-mode');
            if (occ) modeFilters.push(occ.split(";"));
        });

        var disciplineFilters = []
        jQuery(".studies-card").each(function () {
            var occ = jQuery(this).attr('data-discipline').split(";");
            if (occ) disciplineFilters.push(occ);
        });

        var formFilters = []
        jQuery(".studies-card").each(function () {
            var occ = jQuery(this).attr('data-form').split(";");
            if (occ) formFilters.push(occ);
        });

        cityFilters = cityFilters.flat().filter(function (e) {
            return String(e).replace(/\s+/g, '')
        });
        cityFilters = new Set(cityFilters.sort()); // usuniecie unikatow
        cityFilters.delete("") // usuniecie pustych znakow 
        cityFilters.delete(" ") // usuniecie pustych znakow


        levelFilters = levelFilters.flat().filter(function (e) {
            return String(e).replace(/\s+/g, '')
        });
        levelFilters = new Set(levelFilters.sort()); // usuniecie unikatow
        levelFilters.delete("") // usuniecie pustych znakow 
        levelFilters.delete(" ") // usuniecie pustych znakow

        modeFilters = modeFilters.flat().filter(function (e) {
            return String(e).replace(/\s+/g, '')
        });
        modeFilters = new Set(modeFilters.reverse()); // usuniecie unikatow
        modeFilters.delete("") // usuniecie pustych znakow 
        modeFilters.delete(" ") // usuniecie pustych znakow

        disciplineFilters = disciplineFilters.flat().filter(function (e) {
            return String(e).replace(/\s+/g, '')
        });
        disciplineFilters = new Set(disciplineFilters.sort()); // usuniecie unikatow
        disciplineFilters.delete("") // usuniecie pustych znakow 
        disciplineFilters.delete(" ") // usuniecie pustych znakow



        var formFilters = []
        jQuery(".studies-card").each(function () {
            var occ = jQuery(this).attr('data-form').split(";");
            if (occ) formFilters.push(occ);
        });
        formFilters = formFilters.flat().filter(function (e) {
            return String(e).replace(/\s+/g, '')
        });
        var formFilteresFixed = []
        for (let i = 0; i < formFilters.length; i++) {
            if (formFilters[i] === " na uczelni") {
                formFilters[i] = "na uczelni"
            }
            if (formFilters[i] === " online") {
                formFilters[i] = "online"
            }
            formFilteresFixed.push(formFilters[i])
        }
        formFilteresFixed = new Set(formFilteresFixed); // usuniecie unikatow
        formFilteresFixed.delete("") // usuniecie pustych znakow 
        formFilteresFixed.delete(" ") // usuniecie pustych znakow

        if (formFilteresFixed.has("online")) {
            formFilteresFixed.delete("online")
            formFilteresFixed.add("online")
        }
        if (formFilteresFixed.has("na uczelni")) {
            formFilteresFixed.delete("na uczelni")
            formFilteresFixed.add("na uczelni")
        }
        if (formFilteresFixed.has("hybrydowo")) {
            formFilteresFixed.delete("hybrydowo")
            formFilteresFixed.add("hybrydowo")
        }

        cityFilters.forEach(function (item, i) {
            if (cityFilters.size) {
                jQuery("#new-results-wrapper").find('.city-filter-box-btns').append('<a href="#" class="city-filter-btn btn btn-ghost button-filter" data-filter="' + item + '">' + item + '</button>');
            } else {
                jQuery("#new-results-wrapper").find('.city-filter-box').hide();
            }
        })


        levelFilters.forEach(function (item, i) {
            if (levelFilters.size) {
                jQuery("#new-results-wrapper").find('.level-filter-box-btns').append('<a href="#" class="level-filter-btn btn btn-ghost button-filter" data-filter="' + item + '">' + item + '</button>');
            } else {
                jQuery("#new-results-wrapper").find('.level-filter-box').hide();
            }
        })

        disciplineFilters.forEach(function (item, i) {
            if (disciplineFilters.size) {
                jQuery("#new-results-wrapper").find('.discipline-filter-box-btns').append('<a href="#" class="discipline-filter-btn btn btn-ghost button-filter" data-filter="' + item + '">' + item + '</button>');
            } else {
                jQuery("#new-results-wrapper").find('.discipline-filter-box').hide();
            }
        })

        modeFilters.forEach(function (item, i) {
            if (modeFilters.size) {
                jQuery("#new-results-wrapper").find('.mode-filter-box-btns').append('<a href="#" class="mode-filter-btn btn btn-ghost button-filter" data-filter="' + item + '">' + item + '</button>');
            } else {
                jQuery("#new-results-wrapper").find('.mode-filter-box').hide();
            }
        })

        if (formFilteresFixed.size == 0) {
            jQuery(".form-filter-box").hide();
        }
        formFilteresFixed.forEach(function (item, i) {

            if (formFilteresFixed.size > 0) {
                jQuery("#new-results-wrapper").find('.form-filter-box-btns').append('<a href="#" class="form-filter-btn btn btn-ghost button-filter" data-filter="' + item + '">' + item + '</button>');
            } else {
                jQuery("#new-results-wrapper").find('.form-filter-box').hide();
            }
        })
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
        // levelFilters = new Set(levelFilters.sort()); // usuniecie unikatow
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
        // modeFilters = new Set(modeFilters.sort()); // usuniecie unikatow
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

    function animationsAndTogglesButtonsOfFilters() {
        jQuery(".icon-arrow-down-open").click(function () {
            if (!jQuery(this).hasClass("rotate")) {
                jQuery(this).addClass("rotate")
            } else {
                jQuery(this).removeClass("rotate")
            }
        })
        jQuery(".city-filter-box > div:nth-child(1),.level-filter-box > div:nth-child(1),.mode-filter-box > div:nth-child(1),.discipline-filter-box > div:nth-child(1),.form-filter-box > div:nth-child(1)")
            .click(function () {
                if (!jQuery(this).find(".icon-arrow-down-open").hasClass("rotate")) {
                    jQuery(this).find(".icon-arrow-down-open").addClass("rotate")
                } else {
                    jQuery(this).find(".icon-arrow-down-open").removeClass("rotate")
                }
            })
        //mechanizm filtrowanie nowy start
        // ukrycia, rozwijanie zwojanie list z litrami SRART 
        jQuery(".city-filter-box-btns,.level-filter-box-btns,.mode-filter-box-btns,.discipline-filter-box-btns,.form-filter-box-btns").hide()

        jQuery(".city-filter-box > div:nth-child(1)").click(function () {
            jQuery(".city-filter-box-btns").toggle()
        })
        jQuery(".level-filter-box > div:nth-child(1)").click(function () {
            jQuery(".level-filter-box-btns").toggle()
        })

        jQuery(".mode-filter-box > div:nth-child(1)").click(function () {
            jQuery(".mode-filter-box-btns").toggle()
        })
        jQuery(".discipline-filter-box > div:nth-child(1)").click(function () {
            jQuery(".discipline-filter-box-btns").toggle()
        })
        jQuery(".form-filter-box > div:nth-child(1)").click(function () {
            jQuery(".form-filter-box-btns").toggle()
        })

    }

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

    function logicOfFilteresResults() {
        var listaFiltrowCitySamll = [];
        const cityBtnButtons = document.querySelectorAll(".city-filter-btn");
        for (let i = 0; i < cityBtnButtons.length; i++) {
            cityBtnButtons[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                if (listaFiltrowCitySamll[0] == e.target.dataset.filter) {
                    listaFiltrowCitySamll = [];
                    e.target.classList.remove("active")
                } else if (listaFiltrowCitySamll[0] !== e.target.dataset.filter) {
                    listaFiltrowCitySamll = [];
                    jQuery(".city-filter-box").find(".active").removeClass("active")
                    listaFiltrowCitySamll.push(filter)
                    e.target.classList.add("active")
                } else {
                    listaFiltrowCitySamll.push(filter)
                    e.target.classList.add("active")
                }
            })
        }

        var listaFiltrowMode = []
        const modeBtnButtons = document.querySelectorAll(".mode-filter-btn");
        for (let i = 0; i < modeBtnButtons.length; i++) {
            modeBtnButtons[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                if (listaFiltrowMode[0] == e.target.dataset.filter) {
                    listaFiltrowMode = [];
                    e.target.classList.remove("active")
                } else if (listaFiltrowMode[0] !== e.target.dataset.filter) {
                    listaFiltrowMode = [];
                    jQuery(".level-filter-box").find(".active").removeClass("active")
                    listaFiltrowMode.push(filter)
                    e.target.classList.add("active")
                } else {
                    listaFiltrowMode.push(filter)
                    e.target.classList.add("active")
                }
            })
        }

        var listraFiltrowLevel = []
        const levelBtnButtons = document.querySelectorAll(".level-filter-btn");
        for (let i = 0; i < levelBtnButtons.length; i++) {
            levelBtnButtons[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                if (listraFiltrowLevel[0] == e.target.dataset.filter) {
                    listraFiltrowLevel = [];
                    e.target.classList.remove("active")
                } else if (listraFiltrowLevel[0] !== e.target.dataset.filter) {
                    listraFiltrowLevel = [];
                    jQuery(".level-filter-box").find(".active").removeClass("active")
                    listraFiltrowLevel.push(filter)
                    e.target.classList.add("active")
                } else {
                    listraFiltrowLevel.push(filter)
                    e.target.classList.add("active")
                }
            })
        }

        var listaFiltrowDiscipline = []
        const disciplineBtnButtons = document.querySelectorAll(".discipline-filter-btn");
        for (let i = 0; i < disciplineBtnButtons.length; i++) {
            disciplineBtnButtons[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                if (listaFiltrowDiscipline[0] == e.target.dataset.filter) {
                    listaFiltrowDiscipline = [];
                    e.target.classList.remove("active")
                } else if (listaFiltrowDiscipline[0] !== e.target.dataset.filter) {
                    listaFiltrowDiscipline = [];
                    jQuery(".discipline-filter-box").find(".active").removeClass("active")
                    listaFiltrowDiscipline.push(filter)
                    e.target.classList.add("active")
                } else {
                    listaFiltrowDiscipline.push(filter)
                    e.target.classList.add("active")
                }
            })
        }

        var listaFiltrowForm = []
        const formBtnButtons = document.querySelectorAll(".form-filter-btn");
        for (let i = 0; i < formBtnButtons.length; i++) {
            formBtnButtons[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                if (listaFiltrowForm[0] == e.target.dataset.filter) {
                    listaFiltrowForm = [];
                    e.target.classList.remove("active")
                } else if (listaFiltrowForm[0] !== e.target.dataset.filter) {
                    listaFiltrowForm = [];
                    jQuery(".discipline-filter-box").find(".active").removeClass("active")
                    listaFiltrowForm.push(filter)
                    e.target.classList.add("active")
                } else {
                    listaFiltrowForm.push(filter)
                    e.target.classList.add("active")
                }
            })
        }

        const studyFields = document.querySelectorAll(".studies-card")
        const FiltersBtns = document.querySelectorAll(".button-filter");
        console.log(":))")
        for (let i = 0; i < FiltersBtns.length; i++) {
            FiltersBtns[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                var listaFiltrowCity = [...listaFiltrowCitySamll, ...listraFiltrowLevel, ...listaFiltrowDiscipline, ...listaFiltrowForm, ...listaFiltrowMode]
                console.log(listaFiltrowCity)
                studyFields.forEach((study) => {
                    var tablicaWszystkichAtrybutowJednegoElementu = []
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.city.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.level.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.mode.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.form.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.discipline.split(";"))


                    tablicaWszystkichAtrybutowJednegoElementu = tablicaWszystkichAtrybutowJednegoElementu.flat();
                    if (filter == "all" || listaFiltrowCity.length == 0) {
                        jQuery(study).attr('style', 'display:flex !important');
                        jQuery(".filters").find(".active").removeClass("active");
                    } else {
                        if (listaFiltrowCity.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length == listaFiltrowCity.length) {
                            jQuery(study).attr('style', 'display:flex !important');
                            if (jQuery(study).parentElement.classList.contains("kierunek-box")) {
                                jQuery(study).parent().attr('style', 'display:block !important');
                            }
                        } else {
                            jQuery(study).attr('style', 'display:none !important');
                            if (jQuery(study).parentElement.classList.contains("kierunek-box")) {
                                jQuery(study).parent().attr('style', 'display:none !important');
                            }
                        }
                    }
                });
                // createDynamicFiltersBtns();
            })
        }
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
            //  jQuery(".appla").addClass("on")
        })

        jQuery(".filters .close-filter").click(function () {
            jQuery(".filters").removeClass("mobile")
            jQuery(".appla").removeClass("on")
        })

        createDynamicFiltersBtns()
    }


    function filterResultBaseOnObj() {
        const studyFields = document.querySelectorAll(".studies-card")
        const FiltersBtns = document.querySelectorAll(".button-filter");
        var Filters = {
            city: [],
            level: [],
            mode: [],
            form: [],
            discipline: []
        }

        const cityBtnButtons = document.querySelectorAll(".city-filter-btn");
        for (let i = 0; i < cityBtnButtons.length; i++) {
            cityBtnButtons[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                if (Filters.city.includes(filter)) {
                    Filters.city.splice(Filters.city.indexOf(filter), 1)
                    e.target.classList.remove("active")
                } else {
                    Filters.city.push(filter)
                    e.target.classList.add("active")
                }
            })
        }
        const levelBtnButtons = document.querySelectorAll(".level-filter-btn");
        for (let i = 0; i < levelBtnButtons.length; i++) {
            levelBtnButtons[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                if (Filters.level.includes(filter)) {
                    Filters.level.splice(Filters.level.indexOf(filter), 1)
                    e.target.classList.remove("active")
                } else {
                    Filters.level.push(filter)
                    e.target.classList.add("active")
                }
            })
        }
        const modeBtnButtons = document.querySelectorAll(".mode-filter-btn");
        for (let i = 0; i < modeBtnButtons.length; i++) {
            modeBtnButtons[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                if (Filters.mode.includes(filter)) {
                    Filters.mode.splice(Filters.mode.indexOf(filter), 1)
                    e.target.classList.remove("active")
                } else {
                    Filters.mode.push(filter)
                    e.target.classList.add("active")
                }
            })
        }
        const formBtnButtons = document.querySelectorAll(".form-filter-btn");
        for (let i = 0; i < formBtnButtons.length; i++) {
            formBtnButtons[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                if (Filters.form.includes(filter)) {
                    Filters.form.splice(Filters.form.indexOf(filter), 1)
                    e.target.classList.remove("active")
                } else {
                    Filters.form.push(filter)
                    e.target.classList.add("active")
                }
            })
        }
        const disciplineBtnButtons = document.querySelectorAll(".discipline-filter-btn");
        for (let i = 0; i < disciplineBtnButtons.length; i++) {
            disciplineBtnButtons[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                if (Filters.discipline.includes(filter)) {
                    Filters.discipline.splice(Filters.discipline.indexOf(filter), 1)
                    e.target.classList.remove("active")
                } else {
                    Filters.discipline.push(filter)
                    e.target.classList.add("active")
                }
            })
        }

        // 
        let featuredBox = document.querySelector('.featured')
        let bigTitle = document.querySelector('#new-results-wrapper div.wyniki-wyszukiwania > h3');

        for (let i = 0; i < FiltersBtns.length; i++) {
            FiltersBtns[i].addEventListener("click", (e) => {
                e.preventDefault();
                console.log(Filters)
                studyFields.forEach((study) => {
                    var tablicaWszystkichAtrybutowJednegoElementu = []
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.city.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.level.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.mode.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.form.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.discipline.split(";"))

                    tablicaWszystkichAtrybutowJednegoElementu = tablicaWszystkichAtrybutowJednegoElementu.flat()
                    //console.log("1")
                    if (Object.values(Filters).length == 0) {
                        jQuery(study).attr('style', 'display:flex !important');
                        jQuery(".filters").find(".active").removeClass("active");
                        if (featuredBox) {
                            featuredBox.style.display = "block"
                        }
                        if (bigTitle) {
                            bigTitle.style.visibility = "visible"
                            bigTitle.style.marginTop = "2rem"

                        }
                        // console.log("2")
                    } else {
                        //console.log("3")
                        if (featuredBox) {
                            featuredBox.style.display = "none"
                        }
                        if (bigTitle) {
                            bigTitle.style.visibility = "hidden"
                            bigTitle.style.marginTop = "-1rem"
                        }

                        if (
                            (Filters.city.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.city.length == 0) &&
                            (Filters.level.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.level.length == 0) &&
                            (Filters.mode.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.mode.length == 0) &&
                            (Filters.form.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.form.length == 0) &&
                            (Filters.discipline.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.discipline.length == 0)
                        ) {
                            //console.log("4")
                            if (!jQuery(study).hasClass("city-card")) {
                                jQuery(study).attr('style', 'display:flex !important');
                            }
                            if (jQuery(study).parent().hasClass("kierunek-box")) {
                                jQuery(study).parent().show();
                            }
                        } else {
                            jQuery(study).attr('style', 'display:none !important');
                            //console.log("5")
                            if (jQuery(study).parent().hasClass("kierunek-box")) {
                                jQuery(study).parent().hide();
                            }
                        }
                    }
                });
                updateNumberOfSpec();
                updateNumberOfField();
                showHideKierunekBox();

            })
        }
    }


    jQuery(document).ready(function () {
        if (window.location.href.indexOf("oferta") > -1 || window.location.href.indexOf("studia") > -1) {

            bulidTheFiltersElements();

            // logicOfFilteresResults();

            animationsAndTogglesButtonsOfFilters();

            createClickableWholeElement();

            sortingSearchResults()

            // createDynamicFiltersBtns()
            console.log(":)")

            // nowa logika filtrowania START 

            // const studyFields = document.querySelectorAll(".studies-card")



            filterResultBaseOnObj()
            //nowa logika filtrowania END 

            const listOfElementsWithKierunekBoxClass = document.querySelectorAll(".kierunek-box")
            listOfElementsWithKierunekBoxClass.forEach(function (el) {
                if (el.children.length === 1) {
                    el.classList.remove("kierunek-box")
                };
            });
            const studyFields = document.querySelectorAll(".studies-card")
            jQuery(".clear-filter-btn").click(function () {
                jQuery(".filters").find(".active").removeClass("active");
                studyFields.forEach((study) => {
                    jQuery(study).attr('style', 'display:flex !important');
                    if (jQuery(study).parent().hasClass("kierunek-box")) {
                        jQuery(study).parent().show();
                    }
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

    setTimeout(function () {
        jQuery(".close-filter-btn").click(function () {
            jQuery("html, body").animate({ scrollTop: 0 }, 500)
            jQuery(".appla").removeClass("on")
            jQuery(".filters").removeClass("mobile")
            enableScroll()
        })

        jQuery(".appla.on").click(function () {
            jQuery("html, body").animate({ scrollTop: 0 }, 500)
            jQuery(".appla").removeClass("on")
            jQuery(".filters").removeClass("mobile")
            enableScroll()
        })
    }, 3000)






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



// function filterByTyping() {
//     hideInterestingFieldIfEmpty()
//     var resultsOfSearch = jQuery(".wyniki-wyszukiwania .kierunek h3")
//     // var resultsOfSearch = jQuery(".wyniki-wyszukiwania .studies-card") //nowa
//     var typingFilter = document.getElementById("typingFilter").value.toUpperCase();




//     console.log("tera")
//     for (let i = 0; i < resultsOfSearch.length; i++) {

//         var resultsOfSearchSingleElement = resultsOfSearch[i].parentElement.parentElement;
//         if (resultsOfSearch[i].textContent.toUpperCase().includes(typingFilter)) {
//             resultsOfSearchSingleElement.setAttribute('style', 'display:flex !important');


//             if (resultsOfSearchSingleElement.parentElement.classList.contains("kierunek-box")) {
//                 resultsOfSearchSingleElement.parentElement.setAttribute('style', 'display:flex !important;flex-direction:column')
//             }
//             if (resultsOfSearchSingleElement.classList.contains("specjalnosc")) {
//                 resultsOfSearchSingleElement.setAttribute('style', 'display:flex !important');
//                 resultsOfSearch[i].parentElement.parentElement.parentElement
//                     .querySelector(".kierunek")
//                     .setAttribute('style', 'display:flex !important')
//             }

//         }
//         if (typingFilter == "koniec!") {
//             resultsOfSearch[i].parentElement.parentElement
//                 .setAttribute('style', 'display:flex !important');
//             jQuery(".kierunek-box").each(function () {
//                 jQuery(this).css({ "border": "1px solid #c2c2c2", "margin-bottom": "0" })
//             })
//         }
//         if (!resultsOfSearch[i].textContent.toUpperCase().includes(typingFilter)) {

//             resultsOfSearchSingleElement.setAttribute('style', 'display:none !important');

//             jQuery(".kierunek-box").each(function () {
//                 jQuery(this).css({ "border": "none", "margin-bottom": "0" })
//             })
//         }
//     }

// }
function filterByTyping() {
    hideInterestingFieldIfEmpty()

    var resultsOfSearch = jQuery(".wyniki-wyszukiwania .studies-card:not(.city-card)") //nowa
    var typingFilter = document.getElementById("typingFilter").value.toUpperCase();



    for (let i = 0; i < resultsOfSearch.length; i++) {

        var valueOfText = resultsOfSearch[i].getAttribute('data-title-fullname').toUpperCase()
        console.log(valueOfText)
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

            jQuery(".kierunek-box").each(function () {
                jQuery(this).css({ "border": "none", "margin-bottom": "0" })
            })
        }
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
        wynikiWyszukiwania.style.marginTop = "2.2rem"

    }

    function smoothScroll(target, duration) {
        let targetPosition = target.getBoundingClientRect().top;
        let startPosition = window.scrollY;
        let distance = targetPosition - 100;
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

    const smoothScrollToNewResults = () => {
        let targetElement = document.getElementById('new-results-wrapper');
        smoothScroll(targetElement, 500);
    };

    if (arrowElement) {
        arrowElement.addEventListener('click', smoothScrollToNewResults);

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



    let slider = $('.big-slider');


    let autoplayButton = document.querySelector('.play-stop');


    let playIcon = document.querySelector('.play');
    let stopIcon = document.querySelector('.stop');


    let isAutoplay = true;

    if (autoplayButton) {
        autoplayButton.addEventListener('click', function () {
            if (isAutoplay) {

                slider.slick('slickPause');

                playIcon.style.visibility = 'hidden';
                stopIcon.style.visibility = 'visible';
            } else {

                slider.slick('slickPlay');

                stopIcon.style.visibility = 'hidden';
                playIcon.style.visibility = 'visible';
            }

            isAutoplay = !isAutoplay;
        });

    }
    const informatyka = true
    document.querySelector(".kulturoznawstwo");
    if (informatyka) {
        console.log("kulturoznawstwo")
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
            let suggestionBox = document.getElementById('suggestionBox');
            let isClickInside = suggestionBox.contains(event.target);

            if (!isClickInside) {
                // Ukryj suggestionBox, jeżeli kliknięcie nastąpiło poza nim
                suggestionBox.style.display = 'none';
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
    // else {
    //     // Stworzenie nowego elementu do przechowywania podpowiedzi
    //     let suggestionBox = document.createElement('ul');
    //     suggestionBox.id = 'suggestionBox';
    //     suggestionBox.style.display = 'none'; // Ukrycie elementu początkowo
    //     document.querySelector('.icon-inside').appendChild(suggestionBox);

    //     //Pobranie elementów, z których będą pobierane podpowiedzi
    //     let studyCards = Array.from(document.querySelectorAll('.kierunek h3'));
    //     studyCards = Array.from(new Set(studyCards.map(card => card.textContent))).map(text => {
    //         return studyCards.find(card => card.textContent === text)
    //     });


    //     // Pobranie elementu input
    //     let input = document.getElementById('typingFilter');


    //     document.addEventListener('click', function (event) {
    //         let suggestionBox = document.getElementById('suggestionBox');
    //         let isClickInside = suggestionBox.contains(event.target);

    //         if (!isClickInside) {
    //             // Ukryj suggestionBox, jeżeli kliknięcie nastąpiło poza nim
    //             suggestionBox.style.display = 'none';
    //         }
    //     });

    //     // Dodanie nasłuchiwania na wprowadzanie tekstu do elementu input
    //     input.addEventListener('keyup', function () {
    //         // Wyczyszczenie poprzednich podpowiedzi
    //         suggestionBox.innerHTML = '';
    //         // Pobranie aktualnie wprowadzonego tekstu
    //         let text = input.value;

    //         let featuredBox = document.querySelector('.featured')
    //         let bigTitle = document.querySelector('#new-results-wrapper div.wyniki-wyszukiwania > h3');

    //         if (text) {
    //             // Znalezienie pasujących podpowiedzi
    //             if (featuredBox) {
    //                 featuredBox.style.display = 'none';
    //             }
    //             let matchingSuggestions = studyCards.filter(card => card.textContent.toLowerCase().includes(text.toLowerCase())); // przed zmiana Damian
    //             // let matchingSuggestions = studyCards.filter(title => title.toLowerCase().includes(text.toLowerCase())); //nowe

    //             if (bigTitle) {
    //                 bigTitle.style.visibility = 'hidden';
    //                 bigTitle.style.marginTop = '-1rem';

    //             }

    //             if (matchingSuggestions.length > 0) {
    //                 // Pokazanie elementu z podpowiedziami
    //                 suggestionBox.style.display = 'block';
    //                 // Dodanie pasujących podpowiedzi do elementu
    //                 for (let suggestion of matchingSuggestions) {
    //                     let suggestionElement = document.createElement('li');
    //                     suggestionElement.textContent = suggestion.textContent;
    //                     suggestionBox.appendChild(suggestionElement);

    //                     // Dodanie event listenera do elementu li
    //                     suggestionElement.addEventListener('click', function () {

    //                         console.log(this.textContent);
    //                         // Skopiowanie tekstu do wyszukiwarki
    //                         input.value = this.textContent;
    //                         console.log("ukrycie")
    //                         // Symulacja zdarzenia keyup
    //                         let event = new Event('keyup');
    //                         input.dispatchEvent(event);

    //                         let suggestionBox = document.getElementById('suggestionBox');
    //                         // Ukrycie podpowiedzi
    //                         suggestionBox.style.display = 'none';

    //                     });
    //                 }
    //             } else {
    //                 // Ukrycie elementu z podpowiedziami, jeśli nie ma żadnych pasujących podpowiedzi
    //                 suggestionBox.style.display = 'none';
    //             }
    //         } else {
    //             // Ukrycie elementu z podpowiedziami, jeśli pole input jest puste
    //             suggestionBox.style.display = 'none';
    //             if (featuredBox) {
    //                 featuredBox.style.display = 'block';

    //             }
    //             if (bigTitle) {
    //                 bigTitle.style.visibility = 'unset';
    //                 bigTitle.style.marginTop = '2rem';
    //             }

    //         }

    //     });

    // }






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
            arrowIcon.classList.toggle("rotated");

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

});
// obszary








