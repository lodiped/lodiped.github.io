const changeNav = (entries, observer) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            document.querySelector('.anchored').classList.add('anchors');
            document.querySelector('.anchored').classList.remove('anchored');
            let id = entry.target.getAttribute('id');
            let newLink = document.querySelector(`[href="#${id}"]`).classList.add('anchored');
            newLink = document.querySelector(`[href="#${id}"]`).classList.remove('anchors');

        }
    })
}

const options = {
    rootMargin: '-100px',
    threshold: 1
};

const observer = new IntersectionObserver(changeNav, options);

const sections = document.querySelectorAll('div[data-div]');
sections.forEach((div) => {
    observer.observe(div);
});

//------------LANGUAGE:---------

/* let language;
function getLanguage() {
    (localStorage.getItem('language') == null) ? setLanguage('en') : false;
    $.ajax({
        url: '/language/' + localStorage.getItem('language') + '.json',
        dataType: 'json', async: false, dataType: 'json',
        success: function (lang) { language = lang }
    });
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
}

$(document).ready(function(){
    $('#lang-title').text(language.title),
    $('#lang-about-me').text(language.about-me);
}) */

//---------------------SECOND-METHOD-LANGUAGE:-------------------
/* 
let dataReload = document.querySelectorAll("[data-reload]");

let language = {
    en: {
        title: "Hi, I'm Pedro Lodi.",
        aboutMe: "I'm a Graphic Design student and I'm especializing in 3D modeling and Front-end web design.",
        scroll: "Scroll Down",
        card1Title: "3D MODELING",
        card1Desc: "sdfhsdth",
        card2Title: "GRAPHIC DESIGN",
        card2Desc: "gasdasdfg",
        card3Title: "FRONT-END WEB DESIGN",
        card3Desc: "sdfghhsdfg",
        card4Title: "FOURTH CARD",
        card4Desc: "tbnssrthsh",
        sbAbout: "About Me",
        sbCard1: "3D Modeling",
        sbCard2: "Graphic Design",
        sbCard3: "Front-end Web Design",
        sbCard4: "Fourth Card"
    },
    pt: {
        title: "Oi, Sou Pedro Lodi.",
        aboutMe: "Sou formando em Design Gráfico e busco me especializar em modelagem 3D e web deisgn front-end.",
        scroll: "Desça a página",
        card1Title: "MODELAGEM 3D",
        card1Desc: "abluble",
        card2Title: "DESIGN GRÁFICO",
        card2Desc: "werfgag",
        card3Title: "WEB DESIGN FRONT-END",
        card3Desc: "serthnxfgserth",
        card4Title: "CARTÃO 4",
        card4Desc: "segrhisdfgbnjklçsert",
        sbAbout: "Sobre mim",
        sbCard1: "Modelagem 3D",
        sbCard2: "Design Gráfico",
        sbCard3: "Web Design Front-end",
        sbCard4: "Quarto Cartão"
    }
};

if (window.location.hash) {
    if (window.location.hash === "#pt") {
        langTitle.textContent = language.pt.title;
        langAboutMe.textContent = language.pt.aboutMe;
        langScroll.textContent = language.pt.scroll;
        langTitle1.textContent = language.pt.card1Title;
        langTitle2.textContent = language.pt.card2Title;
        langTitle3.textContent = language.pt.card3Title;
        langTitle4.textContent = language.pt.card4Title;
        titleAnchor.textContent = language.pt.sbAbout;
        firstAnchor.textContent = language.pt.sbCard1;
        secondAnchor.textContent = language.pt.sbCard2;
        thirdAnchor.textContent = language.pt.sbCard3;
        fourthAnchor.textContent = language.pt.sbCard4;
    }
}

for (i = 0; i <= dataReload.length; i++) {
    dataReload.onclick = function() {
        location.reload(true);
    }
} */

//----------------------------------rotation-test:--------------

/* let frontCard1 = document.querySelector('.rotate-test');

document.querySelector('.wrapper').addEventListener("scroll", () => {
    let top = document.querySelector('.wrapper').pageYOffset / 10;
    frontCard1.style.transform = 'rotate3d(0.5,0.5,0.5, ' + top + 'deg)';
}); */

//--------------------backcard-tranlate----------------

const backCard = document.querySelectorAll('.backcard');
const frontCard = document.querySelectorAll('#front-card');

function translateBackcard() {
    backCard.style.transform = "translateX(.5rem) scale(0.8)";
}