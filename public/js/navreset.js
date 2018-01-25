'use strict';

const id = val => document.getElementById(val),
    navHome = id("home"),
    navInicio = id("inicio"),
    navServicios = id("servicios"),
    navContacto = id("contacto");

window.onload = function () {
    navHome.href = "/";
    navInicio.href = "/#jumbotron";
    navServicios.href = "/#about";
    navContacto.href = "/#footer";
}

