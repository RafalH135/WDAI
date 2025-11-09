document.getElementById("Home").addEventListener("click",toHome);
document.getElementById("Galeria").addEventListener("click",toGaleria);
document.getElementById("Cennik").addEventListener("click",toCennik);
document.getElementById("Kontakt").addEventListener("click",toKontakt);

function toHome(){
    window.location.href = "index.html";
}

function toGaleria(){
    window.location.href = "galeria.html";
}

function toCennik(){
    window.location.href = "cennik.html";
}

function toKontakt(){
    window.location.href = "kontakt.html";
}

document.getElementById("strefa-paintball").addEventListener("click",toPaintball);
document.getElementById("strefa-konsolowa").addEventListener("click",toKonsol);
document.getElementById("strefa-klasyczna").addEventListener("click",toKlasyczna);
document.getElementById("strefa-kinowa").addEventListener("click",toKinowa);
document.getElementById("strefa-taneczna").addEventListener("click",toTaneczna);
document.getElementById("strefa-retro").addEventListener("click",toRetro);

function toPaintball(){
    window.location.href = "#paintball";
}

function toKonsol(){
    window.location.href = "#konsolowa";
}

function toKlasyczna(){
    window.location.href = "#klasyczna";
}

function toKinowa(){
    window.location.href = "#kinowa";
}
function toTaneczna(){
    window.location.href = "#taneczna";
}

function toRetro(){
    window.location.href = "#retro";
}
