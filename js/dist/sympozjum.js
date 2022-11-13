jQuery(document).ready(function() {
    //Konferencja z testu START 
    const allBlocks = document.querySelectorAll(".planer-block");
    if (window.location.href.indexOf("program") > -1) {
    
        var el = document.querySelector("body > main > article > div")
        console.log("planer")
    }
    if (window.location.href.indexOf("speakers") > -1) {
        var el = document.querySelector(".keynote")
        console.log("speakers")
    }
    
    if (window.location.href.indexOf("panelists") > -1) {
        var el = document.querySelector(".keynote")
        console.log("panelists")
    }
    
    
    const objOfDate = {}
    
    let confDaysWrapper = document.createElement("div");
    confDaysWrapper.classList.add("conf-days")
    if (window.location.href.indexOf("program") > -1) {
        el.appendChild(confDaysWrapper)
    }
    
    
    
    for (let i = 0; i < allBlocks.length; i++) {
        let startTimeElement = allBlocks[i].getAttribute("data-start-time");
        let dataDay = allBlocks[i].getAttribute("data-day")
        let dataInWords = allBlocks[i].getAttribute("data-in-words")
        let dataDayOfWeek = allBlocks[i].getAttribute("data-day-of-week")
        let startTime = allBlocks[i].getAttribute("data-start-time").slice(0, 5);
        let endTime = allBlocks[i].getAttribute("data-end-time").slice(0, 5);
        let numberOfPanel = allBlocks[i].getAttribute("data-panel")
    
        let panelElement = document.createElement("div")
        panelElement.classList.add("dotted-line")
    
    
        let planner = document.createElement("div");
        planner.classList.add("planner")
        if (window.location.href.indexOf("speakers") > -1) {
            planner.classList.add("lectures")
        }
        if (window.location.href.indexOf("panelists") > -1) {
            planner.classList.add("lectures")
        }
        planner.setAttribute("data-day", `${allBlocks[i].getAttribute("data-day")}`)
        planner.setAttribute("data-start-time", `${allBlocks[i].getAttribute("data-start-time")}`)
        planner.innerHTML =
            `<p class="planner-time">${startTime}-${endTime}</p>
                <div class="planner-blocks-wrapper start_time_${startTime}" data-day="${allBlocks[i].getAttribute("data-day")}" data-start-time="${allBlocks[i].getAttribute("data-start-time")}"></div>
                `
        if (window.location.href.indexOf("speakers") > -1) {
            planner.innerHTML = `<p class="planner-date">${dataDay.replaceAll("-",".")}</p>
            <div class="planner-blocks-wrapper start_time_${startTime}" data-day="${allBlocks[i].getAttribute("data-day")}" data-start-time="${allBlocks[i].getAttribute("data-start-time")}"></div>
            `;
        }
    
        if (window.location.href.indexOf("panelists") > -1) {
            planner.innerHTML = `<p class="planner-date">${dataDay.replaceAll("-",".")}</p>
            <div class="planner-blocks-wrapper start_time_${startTime}" data-day="${allBlocks[i].getAttribute("data-day")}" data-start-time="${allBlocks[i].getAttribute("data-start-time")}"></div>
            `;
        }
    
    
        let confDay = document.createElement("div");
        confDay.setAttribute("data-day", `${dataDay}`)
        confDay.innerHTML = `
                <p class="date">${dataInWords}</p>
                <p class="name-of-day">${dataDayOfWeek}</p>
                `
    
        if (!objOfDate.hasOwnProperty(`${dataDay}`)) {
            objOfDate[`${dataDay}`];
            objOfDate[`${dataDay}`] = [`${startTimeElement}`]
            el.appendChild(planner)
            if (window.location.href.indexOf("program") > -1) {
                confDaysWrapper.appendChild(confDay)
            }
        }
    
    
    
        if (!objOfDate[`${dataDay}`].includes(`${startTimeElement}`)) {
            objOfDate[`${dataDay}`].push(`${startTimeElement}`)
            el.appendChild(planner)
    
        }
    }
    
    const allWrappers = document.querySelectorAll(".planner-blocks-wrapper");
    for (let i = 0; i < allWrappers.length; i++) {
        for (let j = 0; j < allBlocks.length; j++) {
            if (allWrappers[i].getAttribute("data-start-time") === allBlocks[j].getAttribute("data-start-time") &&
                allWrappers[i].getAttribute("data-day") === allBlocks[j].getAttribute("data-day")
            ) {
                allWrappers[i].appendChild(allBlocks[j]);
            }
        }
    }
    
    let buttons = document.querySelectorAll('.conf-days>div');
    const planners = document.querySelectorAll(".planner")
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
    
            let dataInButton = this.getAttribute("data-day")
            for (let i = 0; i < planners.length; i++) {
    
                console.log(dataInButton)
                if (dataInButton == planners[i].getAttribute("data-day")) {
                    planners[i].style.display = "grid";
                } else {
                    planners[i].style.display = "none";
                }
            }
    
        });
    });
    //Konferencja z testu end 
    
    
    /// klikniecie pierwszego dnia 
    jQuery(".conf-days > div:nth-child(1)").click();
})
  
  