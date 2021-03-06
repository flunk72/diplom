// Modal
/*jshint esversion: 6 */



let body = document.querySelector("body"),
    measurer = document.querySelector(".popup_engineer"),
    closeBtn = document.querySelector(".popup_close"),
    popupCalc = document.querySelector(".popup_calc"),
    popupCalcProfile = document.querySelector(".popup_calc_profile"),
    popupCalcEnd = document.querySelector(".popup_calc_end"),
    overlayTell = document.querySelector(".popup"),
    closeImg = document.querySelector(".row");

closeBtn = addEventListener("click", function (event) {
    if (event.target && event.target.tagName == "STRONG") {
        measurer.style.display = 'none';
        overlayTell.style.display = 'none';
        popupCalc.style.display = 'none';
        popupCalcProfile.style.display = 'none';
        popupCalcEnd.style.display = 'none';
        document.body.style.overflow = '';
    }
    if (event.target == measurer || event.target == overlayTell) {
        measurer.style.display = "none";
        overlayTell.style.display = 'none';
        document.body.style.overflow = '';
    }
});

body.addEventListener('click', (event) => {
    let target = event.target;
    if (target && target.classList.contains('header_btn')) {
        showModal(measurer);
    }
    if (target && target.classList.contains('popup_calc_button')) {
        showModal(popupCalcProfile);
    }
    if (target && target.classList.contains('phone_link')) {
        showModal(overlayTell);
    }
    if (target && target.classList.contains('glazing_price_btn')) {
        showModal(popupCalc);
    }
    if (target && target.classList.contains('popup_calc_profile_button')) {
        showModal(popupCalcEnd);
    }
});

function showModal(elem) {
    elem.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// закрытие по подложке
window.addEventListener("click", (event) => {
    if (event.target == measurer) {
        measurer.style.display = "none";
    }
});
//вызов модального через 60сек.
setTimeout(modal, 60000);

function modal() {
    measurer.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

let inputsPhone = document.querySelectorAll('input[name="user_phone"]');


function onlyNumber(input) {
    input.oninput = function () {
        return (this.value = this.value.replace(/[^0-9]/g, ""));
    };
}
[...inputsPhone].forEach(elem => onlyNumber(elem));


// Timer
let deadline = "2018.12.30";

let getTimeRemaining = (endtime) => {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t / 1000) % 60),
        minutes = Math.floor((t / 1000 / 60) % 60),
        hours = Math.floor((t / (1000 * 60 * 60))),
        days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        "total": t,
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds,
    };
};

let setClock = (id, endtime) => {
    let timer = document.getElementById(id),
        day = timer.querySelector(".days"),
        hours = timer.querySelector(".hours"),
        minutes = timer.querySelector(".minutes"),
        seconds = timer.querySelector(".seconds");


    let updateClock = () => {
        let t = getTimeRemaining(endtime);
        day.textContent = t.days;
        hours.textContent = ("0" + t.hours).slice(-2);
        minutes.textContent = ("0" + t.minutes).slice(-2);
        seconds.textContent = ("0" + t.seconds).slice(-2);
        if (t.total <= 0) {
            document.querySelector(".days").textContent = "00";
            document.querySelector(".hours").textContent = "00";
            document.querySelector(".minutes").textContent = "00";
            document.querySelector(".seconds").textContent = "00";
            clearInterval(timeInterval);

        }
    };
    let timeInterval = setInterval(updateClock, 1000);
    updateClock();
};
setClock("timer", deadline);

//Form

let message = {
    sending: "Идет отпрвка",
    sendTo: "Отправлено",
    mistake: "Ошибка"
};

let form = document.querySelector('form'),
    popupForm2 = document.querySelectorAll('.form')[1],
    popupFormModal = document.querySelectorAll('.form')[7],
    popupForm5 = document.querySelectorAll('.form')[5],
    popupFormModalTell = document.querySelectorAll('.form')[6],
    popupFormModalCalcEnd = document.querySelectorAll('.form')[8],
    inputForm = form.querySelectorAll('input')[1],
    inputForm2 = document.querySelectorAll('input')[3],
    inputForm3 = document.querySelectorAll('input')[11],
    inputPopupFormModal = document.querySelectorAll('input')[15],
    inputPopupFormModalTell = document.querySelectorAll('input')[13],
    inputPopupFormModalCalcWidth = document.querySelectorAll('input')[16],
    inputPopupFormModalCalcHight = document.querySelectorAll('input')[17],
    inputPopupFormModalCalcEnd = document.querySelectorAll('input')[21],
    input = document.querySelectorAll('input'),
    statusMessage = document.createElement('div');

statusMessage.classList.add('status');

function allForm(form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        form.appendChild(statusMessage);

        let formData = new FormData(form);
        let obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        function postData() {
            return new Promise(function (resolve, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                request.onreadystatechange = function () {
                    if (request.readyState < 4) {
                        resolve();
                    } else if (request.readyState === 4 && request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                };
                request.send(json);
            });
        }

        function clearInput() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }
        postData(formData)
            .then(() => statusMessage.textContent = message.sending)
            .then(() => statusMessage.textContent = message.sendTo)
            .catch(() => statusMessage.textContent = message.mistake)
            .then(clearInput);
    });
}

function clearInp() {
    statusMessage.textContent = '';
}
allForm(form);
allForm(popupForm2);
allForm(popupFormModal);
allForm(popupForm5);
allForm(popupFormModalTell);
allForm(popupFormModalCalcEnd);


// tabs window

let tabMain = document.querySelector("body"),
    tabContent = document.querySelectorAll(".tab_content_glazing"),
    tabActive = document.querySelectorAll(".tab_active"),
    tab = document.querySelectorAll(".glazing_block");

let hideTabContent = (a) => {
    for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove("show");
        tabContent[i].classList.add("hide");
        tabActive[i].classList.remove("active");
    }
};
hideTabContent(1);

let showTabContent = (b) => {
    if (tabContent[b].classList.contains("hide")) {
        tabContent[b].classList.remove("hide");
        tabContent[b].classList.add("show");
        tabActive[b].classList.add("active");
    }
};
tabMain.addEventListener("click", (event) => {
    let target = event.target;

    if (target && target.classList.contains("glazing_block") || target.parentNode.classList.contains("glazing_block")) {
        [...tab].forEach(function (event, i) {
            if (target == event || target.parentNode == event) {
                hideTabContent(0);
                showTabContent(i);
            }
        });
    }
});

//tabs furnish

let furnish = document.querySelector(".decoration_slider"),
    tabsContent = document.querySelectorAll(".tab_content_furnish"),
    clickActive = document.querySelectorAll(".no_click"),
    tabs = document.querySelectorAll(".click_active");

function hideTabsContent(a) {
    for (let i = a; i < tabsContent.length; i++) {
        tabsContent[i].classList.remove("show");
        tabsContent[i].classList.add("hide");
        clickActive[i].classList.remove("after_click");
    }
}
hideTabsContent(1);

function showTabsContent(b) {
    if (tabsContent[b].classList.contains("hide")) {
        tabsContent[b].classList.remove("hide");
        tabsContent[b].classList.add("show");
        clickActive[b].classList.add("after_click");
    }
}
furnish.addEventListener("click", (event) => {
    let target = event.target;

    if (target && target.classList.contains("click_active") || target.parentNode.classList.contains("click_active")) {
        [...tabs].forEach(function (event, i) {
            if (target == event || target.parentNode == event) {
                hideTabsContent(0);
                showTabsContent(i);
            }
        });
    }
});


// images
let wrapper = document.createElement('div'),
    linkPicture = document.querySelectorAll('.img_link'),
    img = document.createElement('img'),
    workWrapper = document.querySelector('.works');

wrapper.classList.add('popup');
workWrapper.appendChild(wrapper);
wrapper.style.justifyContent = 'center';
wrapper.style.alignItems = 'center';
wrapper.appendChild(img);

let imgMain = document.querySelectorAll('.worksImg');
for (let i = 0; i < imgMain.length; i++) {
    imgMain[i].addEventListener('click', function () {
        for (let a = 0; a < linkPicture.length; a++) {
            if (i == a) {

                img.setAttribute('src', linkPicture[a].href);
            }
        }
    });
}

workWrapper.addEventListener('click', function (e) {
    e.preventDefault();
    let elem = e.target;
    if (elem && elem.classList.contains('worksImg')) {
        wrapper.style.display = 'flex';
    }
    if (elem && elem.matches('div.popup')) {
        wrapper.style.display = 'none';
    }
});
// calc