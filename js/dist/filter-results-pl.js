"use strict";
! function($) {
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
                <p>tryb studiów:</p><i class="icon-arrow-down-open" aria-hidden="true"></i>
            </div>
            <div class="mode-filter-box-btns">

            </div>
        </div>
        <hr>
        <div class="form-filter-box">
            <div>
                <p>forma zajęć podyplomowych:</p><i class="icon-arrow-down-open" aria-hidden="true"></i>
            </div>
            <div class="form-filter-box-btns">

            </div>
        </div>
        <hr>
        <button class="clear-filter-btn btn" data-filter="all">wyczyść filtry</button>`
        )

        var cityFilters = []
        jQuery(".studies-card").each(function() {
            var occ = jQuery(this).attr('data-city').split(";")
            if (occ) cityFilters.push(occ);
        });

        var levelFilters = []
        jQuery(".studies-card").each(function() {
            var occ = jQuery(this).attr('data-level').split(";");
            if (occ) levelFilters.push(occ);
        });
        var modeFilters = []
        jQuery(".studies-card").each(function() {
            var occ = jQuery(this).attr('data-mode');
            if (occ) modeFilters.push(occ.split(";"));
        });

        var disciplineFilters = []
        jQuery(".studies-card").each(function() {
            var occ = jQuery(this).attr('data-discipline').split(";");
            if (occ) disciplineFilters.push(occ);
        });

        var formFilters = []
        jQuery(".studies-card").each(function() {
            var occ = jQuery(this).attr('data-form').split(";");
            if (occ) formFilters.push(occ);
        });

        cityFilters = cityFilters.flat().filter(function(e) {
            return String(e).replace(/\s+/g, '')
        });
        cityFilters = new Set(cityFilters.sort()); // usuniecie unikatow
        cityFilters.delete("") // usuniecie pustych znakow 
        cityFilters.delete(" ") // usuniecie pustych znakow


        levelFilters = levelFilters.flat().filter(function(e) {
            return String(e).replace(/\s+/g, '')
        });
        levelFilters = new Set(levelFilters.sort()); // usuniecie unikatow
        levelFilters.delete("") // usuniecie pustych znakow 
        levelFilters.delete(" ") // usuniecie pustych znakow

        modeFilters = modeFilters.flat().filter(function(e) {
            return String(e).replace(/\s+/g, '')
        });
        modeFilters = new Set(modeFilters.reverse()); // usuniecie unikatow
        modeFilters.delete("") // usuniecie pustych znakow 
        modeFilters.delete(" ") // usuniecie pustych znakow

        disciplineFilters = disciplineFilters.flat().filter(function(e) {
            return String(e).replace(/\s+/g, '')
        });
        disciplineFilters = new Set(disciplineFilters.sort()); // usuniecie unikatow
        disciplineFilters.delete("") // usuniecie pustych znakow 
        disciplineFilters.delete(" ") // usuniecie pustych znakow



        var formFilters = []
        jQuery(".studies-card").each(function() {
            var occ = jQuery(this).attr('data-form').split(";");
            if (occ) formFilters.push(occ);
        });
        formFilters = formFilters.flat().filter(function(e) {
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

        cityFilters.forEach(function(item, i) {
            if (cityFilters.size) {
                jQuery("#new-results-wrapper").find('.city-filter-box-btns').append('<a href="#" class="city-filter-btn btn btn-ghost button-filter" data-filter="' + item + '">' + item + '</button>');
            } else {
                jQuery("#new-results-wrapper").find('.city-filter-box').hide();
            }
        })


        levelFilters.forEach(function(item, i) {
            if (levelFilters.size) {
                jQuery("#new-results-wrapper").find('.level-filter-box-btns').append('<a href="#" class="level-filter-btn btn btn-ghost button-filter" data-filter="' + item + '">' + item + '</button>');
            } else {
                jQuery("#new-results-wrapper").find('.level-filter-box').hide();
            }
        })

        disciplineFilters.forEach(function(item, i) {
            if (disciplineFilters.size) {
                jQuery("#new-results-wrapper").find('.discipline-filter-box-btns').append('<a href="#" class="discipline-filter-btn btn btn-ghost button-filter" data-filter="' + item + '">' + item + '</button>');
            } else {
                jQuery("#new-results-wrapper").find('.discipline-filter-box').hide();
            }
        })

        modeFilters.forEach(function(item, i) {
            if (modeFilters.size) {
                jQuery("#new-results-wrapper").find('.mode-filter-box-btns').append('<a href="#" class="mode-filter-btn btn btn-ghost button-filter" data-filter="' + item + '">' + item + '</button>');
            } else {
                jQuery("#new-results-wrapper").find('.mode-filter-box').hide();
            }
        })

        if (formFilteresFixed.size == 0) {
            jQuery(".form-filter-box").hide();
        }
        formFilteresFixed.forEach(function(item, i) {

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
        jQuery(".studies-card").each(function() {
            var occ = jQuery(this).attr('data-city').split(";");
            if (occ && jQuery(this).attr('style') == "display:flex !important")
                cityFilters.push(occ);
        });
        cityFilters = cityFilters.flat()
        cityFilters = new Set([...cityFilters].map(e => e.trim()).sort());
        // cityFilters = cityFilters.flat()
        // cityFilters = new Set(cityFilters.sort()); // usuniecie unikatow
        cityFilters.delete("") // usuniecie pustych znakow 
        cityFilters.delete(" ") // usuniecie pustych znakow


        // jQuery(".city-filter-box a").each(function() {
        //     if (cityFilters.has(jQuery(this).attr("data-filter"))) {
        //         jQuery(this).show()
        //     } else {
        //         jQuery(this).hide()
        //     }
        // })

        //level filters 
        var levelFilters = []
        jQuery(".studies-card").each(function() {
            var occ = jQuery(this).attr('data-level').split(";");
            if (occ && jQuery(this).attr('style') == "display:flex !important")
                levelFilters.push(occ);
        });

        levelFilters = levelFilters.flat()
        levelFilters = new Set([...levelFilters].map(e => e.trim()).sort());
        // levelFilters = new Set(levelFilters.sort()); // usuniecie unikatow
        levelFilters.delete("") // usuniecie pustych znakow 
        levelFilters.delete(" ") // usuniecie pustych znakow

        jQuery(".level-filter-box a").each(function() {
            if (levelFilters.has(jQuery(this).attr("data-filter"))) {
                jQuery(this).show()
            } else { jQuery(this).hide() }
        })


        // mode filteres 
        var modeFilters = []
        jQuery(".studies-card").each(function() {
            var occ = jQuery(this).attr('data-mode').split(";");
            if (occ && jQuery(this).attr('style') == "display:flex !important")
                modeFilters.push(occ);
        });

        modeFilters = modeFilters.flat()
        modeFilters = new Set([...modeFilters].map(e => e.trim()).reverse());
        // modeFilters = new Set(modeFilters.sort()); // usuniecie unikatow
        modeFilters.delete("") // usuniecie pustych znakow 
        modeFilters.delete(" ") // usuniecie pustych znakow

        jQuery(".mode-filter-box a").each(function() {
            if (modeFilters.has(jQuery(this).attr("data-filter"))) {
                jQuery(this).show()
            } else { jQuery(this).hide() }
        })

        // discipline filters
        var disciplineFilters = []
        jQuery(".studies-card").each(function() {
            var occ = jQuery(this).attr('data-discipline').split(";");
            if (occ && jQuery(this).attr('style') == "display:flex !important")
                disciplineFilters.push(occ);
        });

        disciplineFilters = disciplineFilters.flat()
        disciplineFilters = new Set([...disciplineFilters].map(e => e.trim()).sort());
        //disciplineFilters = new Set(disciplineFilters.sort()); // usuniecie unikatow
        disciplineFilters.delete("") // usuniecie pustych znakow 
        disciplineFilters.delete(" ") // usuniecie pustych znakow

        jQuery(".discipline-filter-box a").each(function() {
            if (disciplineFilters.has(jQuery(this).attr("data-filter"))) {
                jQuery(this).show()
            } else { jQuery(this).hide() }
        })

        // form filteres START 
        var formFilters = []
        jQuery(".studies-card").each(function() {
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

        jQuery(".form-filter-box a").each(function() {
            if (formFilters.has(jQuery(this).attr("data-filter"))) {
                jQuery(this).show()
            } else { jQuery(this).hide() }
        })
        hideInterestingFieldIfEmpty();

        // form filteres END 
    }

    function animationsAndTogglesButtonsOfFilters() {
        jQuery(".icon-arrow-down-open").click(function() {
            if (!jQuery(this).hasClass("rotate")) {
                jQuery(this).addClass("rotate")
            } else {
                jQuery(this).removeClass("rotate")
            }
        })
        jQuery(".city-filter-box > div:nth-child(1),.level-filter-box > div:nth-child(1),.mode-filter-box > div:nth-child(1),.discipline-filter-box > div:nth-child(1),.form-filter-box > div:nth-child(1)")
            .click(function() {
                if (!jQuery(this).find(".icon-arrow-down-open").hasClass("rotate")) {
                    jQuery(this).find(".icon-arrow-down-open").addClass("rotate")
                } else {
                    jQuery(this).find(".icon-arrow-down-open").removeClass("rotate")
                }
            })
            //mechanizm filtrowanie nowy start
            // ukrycia, rozwijanie zwojanie list z litrami SRART 
        jQuery(".city-filter-box-btns,.level-filter-box-btns,.mode-filter-box-btns,.discipline-filter-box-btns,.form-filter-box-btns").hide()

        jQuery(".city-filter-box > div:nth-child(1)").click(function() {
            jQuery(".city-filter-box-btns").toggle()
        })
        jQuery(".level-filter-box > div:nth-child(1)").click(function() {
            jQuery(".level-filter-box-btns").toggle()
        })

        jQuery(".mode-filter-box > div:nth-child(1)").click(function() {
            jQuery(".mode-filter-box-btns").toggle()
        })
        jQuery(".discipline-filter-box > div:nth-child(1)").click(function() {
            jQuery(".discipline-filter-box-btns").toggle()
        })
        jQuery(".form-filter-box > div:nth-child(1)").click(function() {
            jQuery(".form-filter-box-btns").toggle()
        })

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
                studyFields.forEach((study) => {
                    var tablicaWszystkichAtrybutowJednegoElementu = []
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.city.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.level.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.mode.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.form.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu.push(study.dataset.discipline.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu = tablicaWszystkichAtrybutowJednegoElementu.flat()
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
                createDynamicFiltersBtns();
            })
        }
    }

    function createClickableWholeElement() {
        jQuery(".studies-card").each(function() {
            var link = jQuery(this).find("a").attr("href");
            jQuery(this).attr("onclick", 'window.location.href="' + link + '"');
            jQuery(this).css("cursor", "pointer");
        })
    }

    function sortingSearchResults() {
        jQuery(".studies-card").each(function() {
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
        jQuery(".featured").find(".studies-card").each(function() {
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

        jQuery(".button-mobile-filter").click(function() {
            jQuery("html, body").animate({ scrollTop: 0 }, 500)
            jQuery(".filters").addClass("mobile")
            jQuery(".appla").addClass("on")
        })

        jQuery(".filters .close-filter").click(function() {
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
        for (let i = 0; i < FiltersBtns.length; i++) {
            FiltersBtns[i].addEventListener("click", (e) => {
                e.preventDefault();
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
                        // console.log("2")
                    } else {
                        //console.log("3")
                        if (
                            (Filters.city.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.city.length == 0) &&
                            (Filters.level.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.level.length == 0) &&
                            (Filters.mode.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.mode.length == 0) &&
                            (Filters.form.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.form.length == 0) &&
                            (Filters.discipline.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.discipline.length == 0)
                        ) {
                            //console.log("4")
                            jQuery(study).attr('style', 'display:flex !important');
                            if (jQuery(study).parent().hasClass("kierunek-box")) {
                                jQuery(study).parent().show();
                            }
                        } else {
                            jQuery(study).attr('style', 'display:none !important');
                            console.log("5")
                            if (jQuery(study).parent().hasClass("kierunek-box")) {
                                jQuery(study).parent().hide();
                            }
                        }
                    }
                });
                createDynamicFiltersBtns()
            })
        }
    }


    jQuery(document).ready(function() {
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
            listOfElementsWithKierunekBoxClass.forEach(function(el) {
                if (el.children.length === 1) {
                    el.classList.remove("kierunek-box")
                };
            });
            const studyFields = document.querySelectorAll(".studies-card")
            jQuery(".clear-filter-btn").click(function() {
                jQuery(".filters").find(".active").removeClass("active");
                studyFields.forEach((study) => {
                    jQuery(study).attr('style', 'display:flex !important');
                    if (jQuery(study).parent().hasClass("kierunek-box")) {
                        jQuery(study).parent().show();
                    }
                })
                filterResultBaseOnObj()
                createDynamicFiltersBtns();
            })
            const newSearchEl = document.querySelector(".new-search")
            newSearchEl.addEventListener("click", function() {
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
    jQuery(".featured").find(".studies-card").each(function() {
        if (jQuery(this).attr("style") == "display:flex !important" || jQuery(this).css("display") == "flex") {
            jQuery(".featured").show();
        } else {
            jQuery(".featured").hide();
        }
    })
}



function filterByTyping() {
    hideInterestingFieldIfEmpty()
    var resultsOfSearch = jQuery(".wyniki-wyszukiwania .kierunek h3")
    var typingFilter = document.getElementById("typingFilter").value.toUpperCase();
    console.log("tera")
    for (let i = 0; i < resultsOfSearch.length; i++) {
        var resultsOfSearchSingleElement = resultsOfSearch[i].parentElement.parentElement;
        if (resultsOfSearch[i].textContent.toUpperCase().includes(typingFilter)) {
            resultsOfSearchSingleElement.setAttribute('style', 'display:flex !important');
            if (resultsOfSearchSingleElement.parentElement.classList.contains("kierunek-box")) {
                resultsOfSearchSingleElement.parentElement.setAttribute('style', 'display:flex !important;flex-direction:column')
            }
            if (resultsOfSearchSingleElement.classList.contains("specjalnosc")) {
                resultsOfSearchSingleElement.setAttribute('style', 'display:flex !important');
                resultsOfSearch[i].parentElement.parentElement.parentElement
                    .querySelector(".kierunek")
                    .setAttribute('style', 'display:flex !important')
            }

        }
        if (typingFilter == "koniec!") {
            resultsOfSearch[i].parentElement.parentElement
                .setAttribute('style', 'display:flex !important');
            jQuery(".kierunek-box").each(function() {
                jQuery(this).css({ "border": "1px solid #c2c2c2", "margin-bottom": "0" })
            })
        }
        if (!resultsOfSearch[i].textContent.toUpperCase().includes(typingFilter)) {

            resultsOfSearchSingleElement.setAttribute('style', 'display:none !important');

            jQuery(".kierunek-box").each(function() {
                    jQuery(this).css({ "border": "none", "margin-bottom": "0" })
                })
                // if (resultsOfSearchSingleElement.classList.contains("specjalnosc")) {
                //     resultsOfSearchSingleElement.setAttribute('style', 'display:flex !important');
                // }
                // if(resultsOfSearchSingleElement.classList.contains("specjalnosc")){
                //     resultsOfSearchSingleElement.setAttribute('style', 'display:flex !important');
                // }

            // if (resultsOfSearch[i].parentElement.parentElement.parentElement.classList.contains("kierunek-box")) {
            //     resultsOfSearchSingleElement.parentElement.setAttribute('style', 'display:none !important;flex-direction:column')
            // }
        }
    }

}