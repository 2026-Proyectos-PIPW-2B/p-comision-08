import { autorizacion } from "./gestores/gestorLogin.js";
import { cargarDatosNavbar } from "./navbar.js";

window.addEventListener("load", () => {
    autorizacion("Usuario")
    cargarDatosNavbar()
});
