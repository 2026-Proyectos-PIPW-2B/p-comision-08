import { autorizacion } from "./gestores/gestorLogin.js";

window.addEventListener("load", () => {
  autorizacion("Administrador")
});
