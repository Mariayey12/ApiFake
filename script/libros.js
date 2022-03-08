import { url as endpoint } from "./url.js";

const container = document.querySelector(".containerCard");
const form = document.querySelector(".form-group");

const btnBuscar = document.querySelector("#btnId");
const btnModificar = document.querySelector("#btnModificar");

const getLibro = async() => {
    const resp = await fetch(endpoint);
    const data = await resp.json();
    form.reset();

    data.forEach((libro) => {
        const { id, nombre, url, autor, editorial, categoria } = libro;
        container.innerHTML += `
    
    <div class="card mb-5" style="max-width: 540px; border-radius: 10px;  background-color: black;">
  <div class="row g-3">
    <div class="col-md-4">
    <img src="${url}" id="img"  class="mt-5" alt="libros">
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <h5 class="card-title">Nombre de Libro:${nombre}
      </h5>
      <h5>Autor:${autor}</h5>
      <h5>Editorial:${editorial}</h5>
      <h4>Categoria:${categoria}</h4>
      <button id=${id} class="btn btn-primary btn-sm w-50 mb-3" borde-radio:"10px">
      Borrar
  </button>
    </div>
  </div>
</div>
        `;
    });
};


document.addEventListener("DOMContentLoaded", getLibro);

// eliminar

container.addEventListener("click", async(e) => {
    const btnEliminar = e.target.classList.contains("btn-danger");

    if (btnEliminar) {
        const id = e.target.id;
        await fetch(endpoint + id, {
            method: "DELETE",
        });
    }
});

const capturarDatos = () => {
    const url = document.getElementById("inputUrl").value;
    const nombre = document.getElementById("inputNombre").value;
    const autor = document.getElementById("inputAutor").value;
    const editorial = document.getElementById("inputEditorial").value;
    const categoria = document.getElementById("inputCategoria").value;


    const libro = {
        url,
        nombre,
        autor,
        editorial,
        categoria,
    };

    return libro;
};

form.addEventListener("submit", async(e) => {
    e.preventDefault();

    const objeto = capturarDatos();

    await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(objeto),
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
});

btnBuscar.addEventListener("click", async() => {
    const inputBuscar = document.getElementById("inputId").value;
    const resp = await fetch(endpoint);
    const data = await resp.json();

    const buscado = data.find((l) => Number(l.id) === Number(inputBuscar));

    if (buscado !== undefined) {
        const { id, nombre, url, autor, editorial, categoria } = buscado;

        document.getElementById("inputUrl").value = url;
        document.getElementById("inputNombre").value = nombre;
        document.getElementById("inputAutor").value = autor;
        document.getElementById("inputCategoria").value = categoria;
        document.getElementById("inputEditorial").value = editorial;

        document.getElementById("inputId").value = id;
    } else {
        alert("Id no encontrado");
    }
});

btnModificar.addEventListener("click", async() => {
    const dataModificar = capturarDatos();
    const { url, nombre, autor, editorial, categoria } = dataModificar;

    if ((url === "", nombre === "", autor === "", editorial === "", categoria === "")) {
        alert("Debe llenat todos los campos");
    } else {
        const id = document.getElementById("inputId").value;
        await fetch(endpoint + id, {
            method: "PUT",
            body: JSON.stringify(dataModificar),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });
    }
});