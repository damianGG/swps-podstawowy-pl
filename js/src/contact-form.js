

$(document).ready(function () {


    jQuery("#mauticform_wrapper_zapytajoeksperta").each(function () {


        jQuery('.mauticform_wrapper').before(`<div class="process-line">
            <img src="img/temat.png" alt="" srcset="" class="temat">
            <img src="img/termin.png" alt="" srcset="" class="termin">
            <img src="img/dane_kontaktowe.png" alt="" srcset="" class="dane-kontaktowe">
    </div>`)


        const allElements = document.querySelectorAll("#mauticform_zapytajoeksperta_wybierz_forme_kontaktu .mauticform-checkboxgrp-row")

        allElements.forEach(function (el) {
            el.classList.add("btn")
            el.classList.add("btn-ghost")
            el.querySelector("input").style.display = "none";
            el.querySelector("svg").style.display = "none";

        })

        const buttons = document.querySelectorAll(".mauticform-page-1 .mauticform-checkboxgrp-row")
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function (e) {
                e.preventDefault();

                if (buttons[i].classList.contains("active")) {
                    buttons[i].classList.remove("active")
                    buttons[i].querySelector("input").checked = false;

                }
                else {
                    buttons[i].classList.add("active")
                    buttons[i].querySelector("input").checked = true;

                }

            })
        }


        jQuery(".mauticform-page-1").append(`<div class="images"></div>`)
        jQuery("#mauticform_zapytajoeksperta_message").hide()


        jQuery(".termin, .dane-kontaktowe").hide()
        jQuery(".btn-default").click(function () {
            jQuery(".temat, .termin, .dane-kontaktowe").hide()
            if (!jQuery(".mauticform-page-1").is(":hidden")) {
                jQuery(".temat").show()
                //console.log("temat")
            }
            if (!jQuery(".mauticform-page-2").is(":hidden")) {
                jQuery(".termin").show()
                //console.log("termin")
            }
            if (!jQuery(".mauticform-page-3").is(":hidden")) {
                jQuery(".dane-kontaktowe").show()
                // console.log("dane-kontaktowe")
            }

        })


        jQuery(".mauticform-innerform").append(`<div class="speaker-photo">
    <img src="img/svg/speaker.svg" alt="" srcset="" class="speaker">
    </div>`)


        window.addEventListener('message', function (event) {
            jQuery(".dane-kontaktowe").hide()
            jQuery("#mauticform_zapytajoeksperta_message").show()
            jQuery("#mauticform_zapytajoeksperta_message").text('')

            jQuery("#mauticform_zapytajoeksperta_message").append(`
        <div class="pos-relative">
            <div class="process-line">
                <img src="img/potwierdzenie.png" alt="" srcset="" class="potwierdzenie">
            </div>
            <div class="thank-you-message">
                <h2>Dziękujemy</h2>
                <p>Odezwiemy się do Ciebie tak szybko, jak to tylko możliwe. Centrum Prasowego i Spraw Publicznych Uniwersytetu SWPS</p>
                <a href="https://www0.swps.pl/cp2022">
                    <button class="btn">Wróć na stronę główną</button>
                </a>
                <img src="img/svg/mail.svg" alt="" srcset="" class="speaker-photo">
            </div>
        </div>`)
        })

    })
})


