let currentLanguage = "en";
document
.getElementById("languageSelect")
.addEventListener("change", e => {

    currentLanguage = e.target.value;

    updateLanguage();

});
function updateLanguage(){

    const translations = {

        en:{
            search:"Search",
            prev:"← Previous",
            next:"Next →",
            favorite:"⭐ Save Favorite",
            download:"⬇ Download",
            favoritesTitle:"Saved Favorites"
        },

        pt:{
            search:"Pesquisar",
            prev:"← Anterior",
            next:"Próximo →",
            favorite:"⭐ Salvar Favorito",
            download:"⬇ Baixar",
            favoritesTitle:"Favoritos Salvos"
        },

        es:{
            search:"Buscar",
            prev:"← Anterior",
            next:"Siguiente →",
            favorite:"⭐ Guardar Favorito",
            download:"⬇ Descargar",
            favoritesTitle:"Favoritos Guardados"
        },

        it:{
            search:"Cerca",
            prev:"← Precedente",
            next:"Successivo →",
            favorite:"⭐ Salva Preferito",
            download:"⬇ Scarica",
            favoritesTitle:"Preferiti Salvati"
        },

        el:{
            search:"Αναζήτηση",
            prev:"← Προηγούμενο",
            next:"Επόμενο →",
            favorite:"⭐ Αποθήκευση Αγαπημένου",
            download:"⬇ Λήψη",
            favoritesTitle:"Αποθηκευμένα Αγαπημένα"
        }

    };

    const lang = translations[currentLanguage];

    document.getElementById("searchBtn").textContent =
        lang.search;

    document.getElementById("prevBtn").textContent =
        lang.prev;

    document.getElementById("nextBtn").textContent =
        lang.next;

    document.getElementById("favoriteBtn").textContent =
        lang.favorite;

    document.getElementById("downloadBtn").textContent =
        lang.download;

    document.querySelector(".favorites h3").textContent =
        lang.favoritesTitle;
}
const API_KEY = "1F4RbUdduxlHDhfeLzdTEVr5Lek6OugR3Be4vW0d";

const titleEl = document.getElementById("title");
const dateEl = document.getElementById("date");
const descriptionEl = document.getElementById("description");
const mediaContainer = document.getElementById("mediaContainer");
const datePicker = document.getElementById("datePicker");
const loader = document.getElementById("loader");
const downloadBtn = document.getElementById("downloadBtn");
const quotes = [

"Somewhere, something incredible is waiting to be known.",

"We are made of star stuff.",

"The cosmos is within us.",

"The Earth is a very small stage in a vast cosmic arena.",

"Across the sea of space, the stars are other suns.",

"Look up at the stars and not down at your feet.",

"The universe is under no obligation to make sense to you."

];
document.querySelector(".quote")
.innerText =
quotes[
Math.floor(
Math.random()*quotes.length
)
];
let currentDate = new Date();

async function loadAPOD(date = "") {

loader.style.display = "block";

try{

let url =
`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

if(date){
url += `&date=${date}`;
}

const response = await fetch(url);

const data = await response.json();

titleEl.textContent = data.title;
dateEl.textContent = data.date;
descriptionEl.textContent = data.explanation;

mediaContainer.innerHTML = "";

if(data.media_type === "image"){

mediaContainer.innerHTML =
`<img src="${data.url}" alt="${data.title}">`;

downloadBtn.href = data.hdurl || data.url;

}else{

mediaContainer.innerHTML =
`<iframe src="${data.url}" allowfullscreen></iframe>`;
}

}catch(error){

titleEl.textContent = "Error loading data.";

console.error(error);

}

loader.style.display = "none";
}

document
.getElementById("searchBtn")
.addEventListener("click", () => {

loadAPOD(datePicker.value);

});

document
.getElementById("prevBtn")
.addEventListener("click", () => {

currentDate.setDate(currentDate.getDate()-1);

const d =
currentDate.toISOString().split("T")[0];

datePicker.value = d;

loadAPOD(d);

});

document
.getElementById("nextBtn")
.addEventListener("click", () => {

currentDate.setDate(currentDate.getDate()+1);

const d =
currentDate.toISOString().split("T")[0];

datePicker.value = d;

loadAPOD(d);

});

const favoritesList =
document.getElementById("favoritesList");

function saveFavorite(){

const item = {
title:titleEl.textContent,
date:dateEl.textContent
};

let favorites =
JSON.parse(localStorage.getItem("favorites"))
|| [];

favorites.push(item);

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

renderFavorites();
}

document
.getElementById("favoriteBtn")
.addEventListener("click", saveFavorite);

function renderFavorites(){

let favorites =
JSON.parse(localStorage.getItem("favorites"))
|| [];

favoritesList.innerHTML = "";

favorites.forEach(f => {

const li =
document.createElement("li");

li.textContent =
`${f.date} - ${f.title}`;

favoritesList.appendChild(li);

});
}

renderFavorites();
loadAPOD();
function createShootingStar(){

    const star =
        document.createElement("div");

    star.className =
        "shooting-star";

    star.style.top =
        Math.random()*250 + "px";

    star.style.left =
        window.innerWidth + "px";

    document.body.appendChild(star);

    setTimeout(()=>{
        star.remove();
    },2000);
}

setInterval(()=>{

    if(Math.random() > 0.7){

        createShootingStar();

    }

},10000);
const canvas =
document.getElementById("starfield");

const ctx =
canvas.getContext("2d");

let stars = [];

let mouse = {
    x:null,
    y:null
};

function resizeCanvas(){

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}

resizeCanvas();

window.addEventListener(
"resize",
resizeCanvas
);

window.addEventListener(
"mousemove",
e=>{

    mouse.x=e.clientX;
    mouse.y=e.clientY;

});
for(let i=0;i<200;i++){

    stars.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,

        radius:Math.random()*2,

        speed:Math.random()*0.2

    });

}
function animateStars(){
    for(let i=0;i<stars.length;i++){

    for(let j=i+1;j<stars.length;j++){

        let dx =
        stars[i].x-stars[j].x;

        let dy =
        stars[i].y-stars[j].y;

        let distance =
        Math.sqrt(dx*dx+dy*dy);

        if(distance < 80){

            ctx.beginPath();

            ctx.moveTo(
                stars[i].x,
                stars[i].y
            );

            ctx.lineTo(
                stars[j].x,
                stars[j].y
            );

            ctx.strokeStyle =
            "rgba(65,123,248,.08)";

            ctx.stroke();

        }

    }

}

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    stars.forEach(star=>{

        star.x += star.speed;

        if(star.x > canvas.height){

            star.x = 0;

            star.y =
            Math.random()*canvas.width;
        }

        let dx =
        mouse.x - star.x;

        let dy =
        mouse.y - star.y;

        let distance =
        Math.sqrt(dx*dx + dy*dy);

        let opacity = 0.3;

        if(distance < 150){

            opacity = 1;
        }

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI*2
        );

        ctx.fillStyle =
        `rgba(255,255,255,${opacity})`;

        ctx.fill();

    });

    requestAnimationFrame(
        animateStars
    );
}


animateStars();
function createDust(){

    const particle =
    document.createElement("div");

    particle.className =
    "particle";

    particle.style.left =
    Math.random()*100+"vw";

    particle.style.bottom =
    "-20px";

    particle.style.animationDuration =
    10 + Math.random()*20 + "s";

    document.body.appendChild(
        particle
    );

    setTimeout(()=>{

        particle.remove();

    },30000);

}

setInterval(
createDust,
400
);