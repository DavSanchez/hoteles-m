'use strict';

const id = val => document.getElementById(val),
    navHome = id("home"),
    navInicio = id("inicio"),
    navServicios = id("servicios"),
    navContacto = id("contacto");

window.onload = function () {
    navHome.href = "https://rocky-garden-75734.herokuapp.com/";
    navInicio.href = "https://rocky-garden-75734.herokuapp.com/#jumbotron";
    navServicios.href = "https://rocky-garden-75734.herokuapp.com/#about";
    navContacto.href = "https://rocky-garden-75734.herokuapp.com/#footer";
}

