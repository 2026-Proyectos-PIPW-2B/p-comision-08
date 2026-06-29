import { generarID } from "../utilidades.js";

export function agregarUsuario(objUsuario) {
  const { nombre, rol, contrasenia } = objUsuario;
  const listaUsuarios = traerTodosLosUsuarios();
  const nuevoUsuario = {
    id: generarID("USER"),
    nombre,
    rol,
    contrasenia,
    estado: true,
    carrito: "",
  };
  listaUsuarios.push(nuevoUsuario);
  actualizarListadoUsuarios(listaUsuarios);
}

function actualizarListadoUsuarios(arregloNuevo) {
  localStorage.setItem("usuarios", JSON.stringify(arregloNuevo));
}

export function traerTodosLosUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

export function buscarUsuario(nombre) {
  const listaUsuarios = traerTodosLosUsuarios();
  let encontrado = listaUsuarios.find((usuario) => usuario.nombre === nombre);
  return encontrado;
}
export function buscarUsuarioPorID(id) {
  const listaUsuarios = traerTodosLosUsuarios();
  let encontrado = listaUsuarios.find((usuario) => usuario.id === id);
  return encontrado;
}

export function cambiarDisponibilidad(nombre) {
  const listaUsuarios = traerTodosLosUsuarios();
  let cambiado = false;
  for (const usuario of listaUsuarios) {
    if (usuario.nombre === nombre) {
      usuario.estado = !usuario.estado;
      cambiado = true;
    }
  }
  actualizarListadoUsuarios(listaUsuarios);
  return cambiado;
}

export function eliminarUsuario(nombre) {
  const listaUsuarios = traerTodosLosUsuarios();
  const nuevaLista = listaUsuarios.filter(
    (usuario) => usuario.nombre !== nombre,
  );
  actualizarListadoUsuarios(nuevaLista);
}
