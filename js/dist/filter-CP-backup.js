//custom function should be added to main js 

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




jQuery(".expert-filter").each(function() {


    //arrow down animation start
    // jQuery(".filters > div > div")
    //     .click(function() {
    //         if (!jQuery(this).find(".icon-arrow-down-open").hasClass("rotate")) {
    //             jQuery(this).find(".icon-arrow-down-open").addClass("rotate")
    //         } else {
    //             jQuery(this).find(".icon-arrow-down-open").removeClass("rotate")
    //         }
    //     })
    //aroow down animation stop


    jQuery("#filter-content-wrapper > div:nth-child(2)")
        .append(`<div class="mobile-filter">
        <button class="button-mobile-filter btn" aria-expanded="false">Filtruj<i class="icon-preferences" aria-hidden="true"></i></button>
        </div>`)



    jQuery(".button-mobile-filter").click(function() {
        jQuery("html, body").animate({ scrollTop: 0 }, 100)
            // jQuery(".filters").addClass("mobile")
        jQuery(".appla").addClass("on")
        jQuery(".filters").show()
        disableScroll()
    })

    jQuery(".close-filter-btn, .appla.on").click(function() {
        jQuery("html, body").animate({ scrollTop: 0 }, 500)
        jQuery(".appla").removeClass("on")
        jQuery(".filters").hide()
        enableScroll()
    })


    function bulidButtonsToClearFilter() {
        const buttonToRemoved = document.querySelectorAll(".used-filters-wrapper button");

        for (let i = 0; i < buttonToRemoved.length; i++) {
            buttonToRemoved[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                jQuery(`.filters [data-filter='${filter}']`).removeClass("active")
                jQuery(e.target).remove();
                filterResultBaseOnObj();
            })
        }
    }



    function bulidTheFiltersElements() {

        var cityFilters = []
        jQuery(".expert-card").each(function() {
            var occ = jQuery(this).attr('data-city').split(";")
            if (occ) cityFilters.push(occ);
        });

        cityFilters = cityFilters.flat().filter(function(e) {
            return String(e).replace(/\s+/g, '')
        });
        cityFilters = new Set(cityFilters.sort()); // usuniecie unikatow
        cityFilters.delete("") // usuniecie pustych znakow
        cityFilters.delete(" ") // usuniecie pustych znakow

        cityFilters.forEach(function(item, i) {
            if (cityFilters.size) {
                jQuery("#filter-content-wrapper").find('.city-filter-box-btns').append('<a href="#" class="city-filter-btn button-filter" data-filter="' + item + '">' + item + '</button>');
            } else {
                jQuery("#filter-content-wrapper").find('.city-filter-box').hide();
            }
        })



        var disciplineFilters = []
        jQuery(".expert-card").each(function() {
            var occ = jQuery(this).attr('data-discipline').split(",");
            if (occ) disciplineFilters.push(occ);
        });



        disciplineFilters = disciplineFilters.flat()

        disciplineFilters = new Set(disciplineFilters.map(el => el.trim()).sort()); // usuniecie unikatow
        disciplineFilters.delete("") // usuniecie pustych znakow
        disciplineFilters.delete(" ") // usuniecie pustych znakow

        disciplineFilters.forEach(function(item, i) {
            if (disciplineFilters.size) {
                jQuery("#filter-content-wrapper").find('.discipline-filter-box-btns').append('<a href="#" class="discipline-filter-btn button-filter" data-filter="' + item + '">' + item + '</button>');
            } else {
                jQuery("#filter-content-wrapper").find('.discipline-filter-box').hide();
            }
        })


        var interestedFilters = []
        jQuery(".expert-card").each(function() {
            var occ = jQuery(this).attr('data-interested').split(";");
            if (occ) interestedFilters.push(occ);
        });

        interestedFilters = interestedFilters.flat().filter(function(e) {
            return String(e).replace(/\s+/g, '')
        });
        interestedFilters = new Set(interestedFilters.sort()); // usuniecie unikatow
        interestedFilters.delete("") // usuniecie pustych znakow
        interestedFilters.delete(" ") // usuniecie pustych znakow


        interestedFilters.forEach(function(item, i) {
            if (interestedFilters.size) {
                jQuery("#filter-content-wrapper").find('.interested-filter-box-btns').append('<a href="#" class="interested-filter-btn button-filter" data-filter="' + item + '">' + item + '</button>');
            } else {
                jQuery("#filter-content-wrapper").find('.interested-filter-box').hide();
            }
        })
    }


    function createDynamicFiltersBtns() {
        // city filter
        var cityFilters = []
        jQuery(".expert-card").each(function() {
            var occ = jQuery(this).attr('data-city').split(";");
            if (occ && jQuery(this).attr('style') == "display:flex")
                cityFilters.push(occ);
        });
        cityFilters = cityFilters.flat()
        cityFilters = new Set([...cityFilters].map(e => e.trim()).sort());
        cityFilters.delete("")
        cityFilters.delete(" ")


        jQuery(".city-filter-box a").each(function() {
            if (cityFilters.has(jQuery(this).attr("data-filter"))) {
                jQuery(this).show()
            } else { jQuery(this).hide() }
        })


        //discipline filters
        var disciplineFilters = []
        jQuery(".expert-card").each(function() {
            var occ = jQuery(this).attr('data-discipline').split(";");
            if (occ && jQuery(this).attr('style') == "display:flex")
                disciplineFilters.push(occ);
        });

        disciplineFilters = disciplineFilters.flat()
        disciplineFilters = new Set([...disciplineFilters].map(e => e.trim()).sort());
        disciplineFilters.delete("") // usuniecie pustych znakow
        disciplineFilters.delete(" ") // usuniecie pustych znakow

        jQuery(".discipline-filter-box a").each(function() {
            if (disciplineFilters.has(jQuery(this).attr("data-filter"))) {
                jQuery(this).show()
            } else { jQuery(this).hide() }
        })



        // interested filteres
        var interestedFilters = []
        jQuery(".expert-card").each(function() {
            var occ = jQuery(this).attr('data-interested').split(";");
            if (occ && jQuery(this).attr('style') == "display:flex")
                interestedFilters.push(occ);
        });

        interestedFilters = interestedFilters.flat()
        interestedFilters = new Set([...interestedFilters].map(e => e.trim()).reverse());
        interestedFilters.delete("") // usuniecie pustych znakow
        interestedFilters.delete(" ") // usuniecie pustych znakow

        jQuery(".interested-filter-box a").each(function() {
            if (interestedFilters.has(jQuery(this).attr("data-filter"))) {
                jQuery(this).show()
            } else { jQuery(this).hide() }
        })

        // discipline filters

    }




    function filterResultBaseOnObj() {
        const expertsFields = document.querySelectorAll(".expert-card")
        const FiltersBtns = document.querySelectorAll(".button-filter");
        var Filters = {
            city: [],
            discipline: [],
            interested: []
        }

        const cityBtnButtons = document.querySelectorAll(".filters .city-filter-btn");
        for (let i = 0; i < cityBtnButtons.length; i++) {
            cityBtnButtons[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                if (Filters.city.includes(filter)) {
                    Filters.city.splice(Filters.city.indexOf(filter), 1)
                    e.target.classList.remove("active")
                    jQuery(".used-filters-wrapper").find(`[data-filter='${filter}']`).remove()
                } else {
                    Filters.city.push(filter)
                    e.target.classList.add("active")

                    if (jQuery(".used-filters-wrapper").find(`[data-filter='${filter}']`).length !== 1) {
                        jQuery(".used-filters-wrapper").append('<button class="city-filter-btn  button-filter" data-filter="' + filter + '">' + filter + "&nbsp;&nbsp;&nbsp;&nbsp;" + "&#9587" + '</button>');

                    }
                    bulidButtonsToClearFilter()
                }
            })
        }

        // const cityRemovedButton = document.querySelectorAll(".city-filter-btn");



        const disciplineBtnButtons = document.querySelectorAll(".filters .discipline-filter-btn");
        for (let i = 0; i < disciplineBtnButtons.length; i++) {
            disciplineBtnButtons[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                if (Filters.discipline.includes(filter)) {
                    Filters.discipline.splice(Filters.discipline.indexOf(filter), 1)
                    e.target.classList.remove("active")
                    jQuery(".used-filters-wrapper").find(`[data-filter='${filter}']`).remove()
                } else {
                    Filters.discipline.push(filter)
                    e.target.classList.add("active")

                    if (jQuery(".used-filters-wrapper").find(`[data-filter='${filter}']`).length !== 1) {
                        jQuery(".used-filters-wrapper").append('<button class="city-filter-btn  button-filter" data-filter="' + filter + '">' + filter + "&nbsp;&nbsp;&nbsp;&nbsp;" + "&#9587" + '</button>');
                    }
                    bulidButtonsToClearFilter()

                }
            })
        }



        const interestedBtnButtons = document.querySelectorAll(".filters .interested-filter-btn");
        for (let i = 0; i < interestedBtnButtons.length; i++) {
            interestedBtnButtons[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                if (Filters.interested.includes(filter)) {
                    Filters.interested.splice(Filters.interested.indexOf(filter), 1)
                    e.target.classList.remove("active");
                    jQuery(".used-filters-wrapper").find(`[data-filter='${filter}']`).remove()
                } else {
                    Filters.interested.push(filter)
                    e.target.classList.add("active")
                    if (jQuery(".used-filters-wrapper").find(`[data-filter='${filter}']`).length !== 1) {
                        jQuery(".used-filters-wrapper").append('<button class="city-filter-btn  button-filter" data-filter="' + filter + '">' + filter + "&nbsp;&nbsp;&nbsp;&nbsp;" + "&#9587" + '</button>');
                    }
                    bulidButtonsToClearFilter()
                }
            })
        }

        for (let i = 0; i < FiltersBtns.length; i++) {
            FiltersBtns[i].addEventListener("click", (e) => {
                e.preventDefault();
                expertsFields.forEach((expert) => {
                    var tablicaWszystkichAtrybutowJednegoElementu = []
                    tablicaWszystkichAtrybutowJednegoElementu.push(expert.dataset.city.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu.push(expert.dataset.discipline.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu.push(expert.dataset.interested.split(";"))

                    tablicaWszystkichAtrybutowJednegoElementu = tablicaWszystkichAtrybutowJednegoElementu.flat()

                    if (Object.values(Filters).length == 0) {
                        jQuery(expert).attr('style', 'display:flex');
                        jQuery(".filters").find(".active").removeClass("active");
                        // console.log("2")
                    } else {
                        if (
                            (Filters.city.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.city.length == 0) &&
                            (Filters.discipline.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.discipline.length == 0) &&
                            (Filters.interested.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.interested.length == 0)
                        ) {
                            jQuery(expert).attr('style', 'display:flex');
                        } else {
                            jQuery(expert).attr('style', 'display:none');

                        }
                    }
                });
                //createDynamicFiltersBtns()
            })
        }
    }



    bulidTheFiltersElements();
    filterResultBaseOnObj();


    const clearFilterBtn = document.querySelector(".clear-filter-btn")

    clearFilterBtn.addEventListener("click", function() {
        const albumFields = document.querySelectorAll(".expert-card")
        jQuery(".filters").find(".active").removeClass("active");

        albumFields.forEach((album) => {
            jQuery(album).attr('style', 'display:flex');
        })
        const buttonToRemoved = jQuery(".used-filters-wrapper button");
        buttonToRemoved.each(function() {
            jQuery(this).remove()
        })
        filterResultBaseOnObj()
            //createDynamicFiltersBtns();
    })










    //filtrowanie

    function sortingSearchResults() {
        jQuery(".expert-card").each(function() {
            var title = jQuery(this).find(".name-surname").text()
            jQuery(this).attr('data-name-surname', title)
        });

        function sortAB(a, b) {
            let an = a.getAttribute('data-name-surname')
            let bn = b.getAttribute('data-name-surname')
            return an.localeCompare(bn);
        }

        function sortBA(a, b) {
            let an = a.getAttribute('data-name-surname')
            let bn = b.getAttribute('data-name-surname')
            return bn.localeCompare(an);
        }


        const sortingEl = document.querySelector("#sorting")
        sortingEl.addEventListener('change', (event) => {

            var wyszukiwarka = jQuery('.serach-results-wrapper');
            var listaWynikow = wyszukiwarka.children(".expert-card");
            //var featuredWyszukiwarka = jQuery(".featured")


            if (event.target.value === "a-z") {
                listaWynikow.sort(sortAB).detach().appendTo(wyszukiwarka);

            }
            if (event.target.value === "z-a") {
                listaWynikow.sort(sortBA).detach().appendTo(wyszukiwarka);

            }
        })
    }

    sortingSearchResults()



    const typingFilter = document.getElementById("typingFilter")

    typingFilter.addEventListener("keyup", function() {
        var resultsOfSearch = jQuery(".serach-results-wrapper .name-surname")
        var typingFilter = document.getElementById("typingFilter").value.toUpperCase();
        for (let i = 0; i < resultsOfSearch.length; i++) {
            var resultsOfSearchSingleElement = resultsOfSearch[i].parentElement.parentElement;
            if (resultsOfSearch[i].textContent.toUpperCase().includes(typingFilter)) {
                resultsOfSearchSingleElement.setAttribute('style', 'display:flex');
            }
            if (!resultsOfSearch[i].textContent.toUpperCase().includes(typingFilter)) {
                resultsOfSearchSingleElement.setAttribute('style', 'display:none');
            }
        }
    })

    jQuery(".city-filter-box-btns,.discipline-filter-box-btns,.interested-filter-box-btns").hide()

    jQuery(".city-filter-box > div:nth-child(1)").click(function() {

        jQuery(".city-filter-box-btns").toggle()
        jQuery(".discipline-filter-box-btns").hide()
        jQuery(".interested-filter-box-btns").hide()

        jQuery(".city-filter-box").find(".icon-arrow-down-open").toggleClass("rotate")
        jQuery(".discipline-filter-box").find(".icon-arrow-down-open").removeClass("rotate")
        jQuery(".interested-filter-box").find(".icon-arrow-down-open").removeClass("rotate")
    })
    jQuery(".discipline-filter-box > div:nth-child(1)").click(function() {
        jQuery(".discipline-filter-box-btns").toggle().find(".icon-arrow-down-open").toggleClass("rotate")
        jQuery(".city-filter-box-btns").hide()
        jQuery(".interested-filter-box-btns").hide()

        jQuery(".city-filter-box").find(".icon-arrow-down-open").removeClass("rotate")
        jQuery(".discipline-filter-box").find(".icon-arrow-down-open").toggleClass("rotate")
        jQuery(".interested-filter-box").find(".icon-arrow-down-open").removeClass("rotate")
    })
    jQuery(".interested-filter-box > div:nth-child(1)").click(function() {
        jQuery(".city-filter-box-btns").hide().find(".icon-arrow-down-open").toggleClass("rotate")
        jQuery(".discipline-filter-box-btns").hide().find(".icon-arrow-down-open").toggleClass("rotate")
        jQuery(".interested-filter-box-btns").toggle().find(".icon-arrow-down-open").toggleClass("rotate")

        jQuery(".city-filter-box").find(".icon-arrow-down-open").removeClass("rotate")
        jQuery(".discipline-filter-box").find(".icon-arrow-down-open").removeClass("rotate")
        jQuery(".interested-filter-box").find(".icon-arrow-down-open").toggleClass("rotate")
    })



})



jQuery(".album-filter").each(function() {


    jQuery("#filter-content-wrapper > div:nth-child(2)")
        .append(`<div class="mobile-filter">
        <button class="button-mobile-filter btn" aria-expanded="false">Filtruj<i class="icon-preferences" aria-hidden="true"></i></button>
        </div>`)



    jQuery(".button-mobile-filter").click(function() {
        jQuery("html, body").animate({ scrollTop: 0 }, 100)
            // jQuery(".filters").addClass("mobile")
        jQuery(".appla").addClass("on")
        jQuery(".filters").show()
        disableScroll()
    })

    jQuery(".close-filter-btn, .appla.on").click(function() {
        jQuery("html, body").animate({ scrollTop: 0 }, 500)
        jQuery(".appla").removeClass("on")
        jQuery(".filters").hide()
        enableScroll()
    })

    //aroow down animation stop
    //autocomple start
    var surnameList = []
    jQuery(".album-element").each(function() {
        var occ = jQuery(this).attr('data-name-surname').split(" ")[1];
        if (occ) surnameList.push(occ);
    });

    surnameList = surnameList.flat().filter(function(e) {
        return String(e).replace(/\s+/g, '')
    });

    let uniqueSurnameList = [...new Set(surnameList)];

    autocomplete(document.getElementById("myInput"), uniqueSurnameList);

    function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            // filterResultBaseOnObj()
            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    b.classList.add("surname-filter-btn")
                    b.classList.add("button-filter")
                    b.setAttribute("data-filter", arr[i])
                        /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        filterResultBaseOnObj(); // odpali funkcje po kilku pojawi sie w aktywnych filtrach
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }

        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
            }
        });

        function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }

        function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function(e) {
            closeAllLists(e.target);
        });
    }
    //autocomple END


    function bulidButtonsToClearFilter() {
        const buttonToRemoved = document.querySelectorAll(".used-filters-wrapper button");

        for (let i = 0; i < buttonToRemoved.length; i++) {
            buttonToRemoved[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;

                jQuery(`.filters [data-filter='${filter}']`).removeClass("active")
                jQuery(e.target).remove();
                filterResultBaseOnObj();
            })
        }
    }



    function bulidTheFiltersElements() {

        var categoryFilters = []
        jQuery(".album-element").each(function() {
            var occ = jQuery(this).attr('data-category').split(";")
            if (occ) categoryFilters.push(occ);
        });

        categoryFilters = categoryFilters.flat().filter(function(e) {
            return String(e).replace(/\s+/g, '')
        });
        categoryFilters = new Set(categoryFilters.sort()); // usuniecie unikatow
        categoryFilters.delete("") // usuniecie pustych znakow
        categoryFilters.delete(" ") // usuniecie pustych znakow

        categoryFilters.forEach(function(item, i) {
            if (categoryFilters.size) {
                jQuery("#filter-content-wrapper").find('.category-filter-box-btns').append('<a href="#" class="category-filter-btn button-filter" data-filter="' + item + '">' + item +
                    '</button>');
            } else {
                jQuery("#filter-content-wrapper").find('.category-filter-box').hide();
            }
        })



        var subjectFilters = []
        jQuery(".album-element").each(function() {
            var occ = jQuery(this).attr('data-subject').split(";");
            if (occ) subjectFilters.push(occ);
        });

        subjectFilters = subjectFilters.flat().filter(function(e) {
            return String(e).replace(/\s+/g, '')
        });
        subjectFilters = new Set(subjectFilters.sort()); // usuniecie unikatow
        subjectFilters.delete("") // usuniecie pustych znakow
        subjectFilters.delete(" ") // usuniecie pustych znakow

        subjectFilters.forEach(function(item, i) {
            if (subjectFilters.size) {
                jQuery("#filter-content-wrapper").find('.subject-filter-box-btns').append('<a href="#" class="subject-filter-btn button-filter" data-filter="' + item + '">' + item + '</button>');
            } else {
                jQuery("#filter-content-wrapper").find('.subject-filter-box').hide();
            }
        })


        //create list of surname
        var surnameList = []
        jQuery(".album-element").each(function() {
            var occ = jQuery(this).attr('data-name-surname').split(";");
            if (occ) surnameList.push(occ);
        });

        surnameList = surnameList.flat().filter(function(e) {
            return String(e).replace(/\s+/g, '')
        });

        let uniqueSurnameList = [...new Set(surnameList)];

        // surnameList = new Set(surnameList.sort()); // usuniecie unikatow
        // surnameList.delete("") // usuniecie pustych znakow
        // surnameList.delete(" ") // usuniecie pustych znakow


    }


    function createDynamicFiltersBtns() {
        // category filter
        var categoryFilters = []
        jQuery(".album-element").each(function() {
            var occ = jQuery(this).attr('data-category').split(";");
            if (occ && jQuery(this).attr('style') == "display:flex")
                categoryFilters.push(occ);
        });
        categoryFilters = categoryFilters.flat()
        categoryFilters = new Set([...categoryFilters].map(e => e.trim()).sort());
        categoryFilters.delete("")
        categoryFilters.delete(" ")

        jQuery(".category-filter-box a").each(function() {
            if (categoryFilters.has(jQuery(this).attr("data-filter"))) {
                jQuery(this).show()
            } else { jQuery(this).hide() }
        })


        //subject filters
        var subjectFilters = []
        jQuery(".album-element").each(function() {
            var occ = jQuery(this).attr('data-subject').split(";");
            if (occ && jQuery(this).attr('style') == "display:flex")
                subjectFilters.push(occ);
        });

        subjectFilters = subjectFilters.flat()
        subjectFilters = new Set([...subjectFilters].map(e => e.trim()).sort());
        subjectFilters.delete("") // usuniecie pustych znakow
        subjectFilters.delete(" ") // usuniecie pustych znakow

        jQuery(".subject-filter-box a").each(function() {
            if (subjectFilters.has(jQuery(this).attr("data-filter"))) {
                jQuery(this).show()
            } else { jQuery(this).hide() }
        })



        // subject filters

    }




    function filterResultBaseOnObj() {
        const expertsFields = document.querySelectorAll(".album-element")
        const FiltersBtns = document.querySelectorAll(".filters .button-filter");
        var Filters = {
            category: [],
            subject: [],
            surname: []

        }

        const categoryBtnButtons = document.querySelectorAll(".filters .category-filter-btn");
        for (let i = 0; i < categoryBtnButtons.length; i++) {
            categoryBtnButtons[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                if (Filters.category.includes(filter)) {
                    Filters.category.splice(Filters.category.indexOf(filter), 1)
                    e.target.classList.remove("active")
                    jQuery(".used-filters-wrapper").find(`[data-filter='${filter}']`).remove()
                } else {
                    Filters.category.push(filter)
                    e.target.classList.add("active")

                    if (jQuery(".used-filters-wrapper").find(`[data-filter='${filter}']`).length !== 1) {
                        jQuery(".used-filters-wrapper").append('<button class="city-filter-btn  button-filter" data-filter="' + filter + '">' + filter + "&nbsp;&nbsp;&nbsp;&nbsp;" + "&#9587" + '</button>');
                    }
                    bulidButtonsToClearFilter()
                }
            })
        }

        const subjectBtnButtons = document.querySelectorAll(".filters .subject-filter-btn");
        for (let i = 0; i < subjectBtnButtons.length; i++) {
            subjectBtnButtons[i].addEventListener("click", (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                if (Filters.subject.includes(filter)) {
                    Filters.subject.splice(Filters.subject.indexOf(filter), 1)
                    e.target.classList.remove("active")
                    jQuery(".used-filters-wrapper").find(`[data-filter='${filter}']`).remove()
                } else {
                    Filters.subject.push(filter)
                    e.target.classList.add("active")

                    if (jQuery(".used-filters-wrapper").find(`[data-filter='${filter}']`).length !== 1) {
                        jQuery(".used-filters-wrapper").append('<button class="city-filter-btn  button-filter" data-filter="' + filter + '">' + filter + "&nbsp;&nbsp;&nbsp;&nbsp;" + "&#9587" + '</button>');
                    }
                    bulidButtonsToClearFilter()
                }
            })
        }

        const surnametBtnButtons = document.getElementById("myInput").value;
        // console.log(surnametBtnButtons)
        // console.log(Filters)
        if (surnametBtnButtons) {
            expertsFields.forEach((expert) => {
                var tablicaWszystkichAtrybutowJednegoElementu = []
                tablicaWszystkichAtrybutowJednegoElementu.push(expert.dataset.nameSurname.split(" ")[1])
                tablicaWszystkichAtrybutowJednegoElementu = tablicaWszystkichAtrybutowJednegoElementu.flat()
                Filters.surname.push(surnametBtnButtons)
                if (jQuery(".used-filters-wrapper").find(`[data-filter='${surnametBtnButtons}']`).length !== 1) {
                    jQuery(".used-filters-wrapper").append('<button class="surname-filter-btn  button-filter" data-filter="' + surnametBtnButtons + '">' + surnametBtnButtons + "&nbsp;&nbsp;&nbsp;&nbsp;" + "&#9587" + '</button>');
                }
                if (
                    Filters.surname.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.surname.length == 0
                ) {
                    jQuery(expert).attr('style', 'display:flex');
                } else {
                    jQuery(expert).attr('style', 'display:none');

                }
                createDynamicFiltersBtns()
                    //bulidButtonsToClearFilter()

            })
        }




        for (let i = 0; i < FiltersBtns.length; i++) {
            FiltersBtns[i].addEventListener("click", (e) => {
                e.preventDefault();
                //console.log(FiltersBtns)

                expertsFields.forEach((expert) => {
                    var tablicaWszystkichAtrybutowJednegoElementu = []
                    tablicaWszystkichAtrybutowJednegoElementu.push(expert.dataset.category.split(";"))
                    tablicaWszystkichAtrybutowJednegoElementu.push(expert.dataset.subject.split(";"))
                        //  tablicaWszystkichAtrybutowJednegoElementu.push(expert.dataset.surname.split(";"))

                    tablicaWszystkichAtrybutowJednegoElementu = tablicaWszystkichAtrybutowJednegoElementu.flat()
                        // console.log(tablicaWszystkichAtrybutowJednegoElementu)
                        // console.log(Filters)
                    if (Object.values(Filters).length == 0) {
                        jQuery(expert).attr('style', 'display:flex');
                        jQuery(".filters").find(".active").removeClass("active");
                        // console.log("2")
                    } else {
                        if (
                            (Filters.category.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.category.length == 0) &&
                            (Filters.subject.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.subject.length == 0) &&
                            (Filters.surname.filter(value => tablicaWszystkichAtrybutowJednegoElementu.includes(value)).length > 0 || Filters.surname.length == 0)
                        ) {
                            jQuery(expert).attr('style', 'display:flex');
                        } else {
                            jQuery(expert).attr('style', 'display:none');

                        }
                    }
                });
                //createDynamicFiltersBtns()
            })
        }
    }



    bulidTheFiltersElements();
    filterResultBaseOnObj();



    const clearFilterBtn = document.querySelector(".clear-filter-btn")

    clearFilterBtn.addEventListener("click", function() {
        const albumFields = document.querySelectorAll(".album-element")
        jQuery(".filters").find(".active").removeClass("active");
        jQuery("#myInput").val("")
        albumFields.forEach((album) => {
            jQuery(album).attr('style', 'display:flex');
        })
        const buttonToRemoved = jQuery(".used-filters-wrapper button");
        buttonToRemoved.each(function() {
            jQuery(this).remove()
        })
        filterResultBaseOnObj()
            // createDynamicFiltersBtns();
    })






    //filtrowanie

    function sortingSearchResults() {
        jQuery(".album-element").each(function() {
            var title = jQuery(this).find(".title").text()
            jQuery(this).attr('data-title', title)
        });


        function sortDateAB(a, b) {
            let an = new Date(a.getAttribute('data-date'))
            let bn = new Date(b.getAttribute('data-date'))
                // return (a, b) => an - bn;
            return bn - an;
        }

        function sortDateBA(a, b) {
            let an = new Date(a.getAttribute('data-date'))
            let bn = new Date(b.getAttribute('data-date'))
                // return bn.localeCompare(an);
            return an - bn;


        }

        function sortAB(a, b) {
            let an = a.getAttribute('data-title')
            let bn = b.getAttribute('data-title')
            return an.localeCompare(bn);

        }

        function sortBA(a, b) {
            let an = a.getAttribute('data-title')
            let bn = b.getAttribute('data-title')
            return bn.localeCompare(an);

        }


        const sortingEl = document.querySelector("#sorting")
        sortingEl.addEventListener('change', (event) => {

            var wyszukiwarka = jQuery('.albums-warpper');
            var listaWynikow = wyszukiwarka.children(".album-element");
            //var featuredWyszukiwarka = jQuery(".featured")


            if (event.target.value === "new-old") {
                listaWynikow.sort(sortDateAB).detach().appendTo(wyszukiwarka);

            }
            if (event.target.value === "old-new") {
                listaWynikow.sort(sortDateBA).detach().appendTo(wyszukiwarka);
            }

            if (event.target.value === "a-z") {
                listaWynikow.sort(sortAB).detach().appendTo(wyszukiwarka);

            }
            if (event.target.value === "z-a") {
                listaWynikow.sort(sortBA).detach().appendTo(wyszukiwarka);
            }



        })
    }

    sortingSearchResults()

    const changeSelected = (e) => {
        const $select = document.querySelector('#sorting');
        $select.value = 'new-old';
    };

    changeSelected();


    const typingFilter = document.getElementById("typingFilter")

    typingFilter.addEventListener("keyup", function() {
        var resultsOfSearch = jQuery(".serach-results-wrapper .title")
        var resultsOfSearchLongDscr = jQuery(".serach-results-wrapper .long-descr")
        var typingFilter = document.getElementById("typingFilter").value.toUpperCase();
        for (let i = 0; i < resultsOfSearch.length; i++) {
            var resultsOfSearchSingleElement = resultsOfSearch[i].parentElement.parentElement.parentElement;

            if (resultsOfSearch[i].textContent.toUpperCase().includes(typingFilter) || resultsOfSearchLongDscr[i].textContent.toUpperCase().includes(typingFilter)) {
                resultsOfSearchSingleElement.setAttribute('style', 'display:flex');
                //  resultsOfSearchSingleElementLongDscr.setAttribute('style', 'display:flex');
            }
            if (!resultsOfSearch[i].textContent.toUpperCase().includes(typingFilter) && !resultsOfSearchLongDscr[i].textContent.toUpperCase().includes(typingFilter)) {
                resultsOfSearchSingleElement.setAttribute('style', 'display:none');
                //  resultsOfSearchSingleElementLongDscr.setAttribute('style', 'display:none');
            }
        }
    })

    jQuery(".category-filter-box-btns,.subject-filter-box-btns,.surname-filter-box-btns").hide()
    jQuery(".category-filter-box > div:nth-child(1)").click(function() {

        jQuery(".category-filter-box-btns").toggle()
        jQuery(".subject-filter-box-btns").hide()
        jQuery(".surname-filter-box-btns").hide()

        jQuery(".category-filter-box").find(".icon-arrow-down-open").toggleClass("rotate")
        jQuery(".subject-filter-box").find(".icon-arrow-down-open").removeClass("rotate")
        jQuery(".surname-filter-box").find(".icon-arrow-down-open").removeClass("rotate")
    })
    jQuery(".subject-filter-box > div:nth-child(1)").click(function() {
        jQuery(".subject-filter-box-btns").toggle().find(".icon-arrow-down-open").toggleClass("rotate")
        jQuery(".category-filter-box-btns").hide()
        jQuery(".surname-filter-box-btns").hide()

        jQuery(".category-filter-box").find(".icon-arrow-down-open").removeClass("rotate")
        jQuery(".subject-filter-box").find(".icon-arrow-down-open").toggleClass("rotate")
        jQuery(".surname-filter-box").find(".icon-arrow-down-open").removeClass("rotate")
    })
    jQuery(".surname-filter-box > div:nth-child(1)").click(function() {
        jQuery(".category-filter-box-btns").hide().find(".icon-arrow-down-open").toggleClass("rotate")
        jQuery(".subject-filter-box-btns").hide().find(".icon-arrow-down-open").toggleClass("rotate")
        jQuery(".surname-filter-box-btns").toggle().find(".icon-arrow-down-open").toggleClass("rotate")

        jQuery(".category-filter-box").find(".icon-arrow-down-open").removeClass("rotate")
        jQuery(".subject-filter-box").find(".icon-arrow-down-open").removeClass("rotate")
        jQuery(".surname-filter-box").find(".icon-arrow-down-open").toggleClass("rotate")
    })



    // jQuery(".filters > div > div")
    //     .click(function() {
    //         if (!jQuery(this).find(".icon-arrow-down-open").hasClass("rotate")) {
    //             jQuery(this).find(".icon-arrow-down-open").addClass("rotate")
    //         } else {
    //             jQuery(this).find(".icon-arrow-down-open").removeClass("rotate")
    //         }
    //     })
    //set sorter to A-Z





})