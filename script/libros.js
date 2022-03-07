import { url as endpoint } from "./url.js";

const container = document.querySelector(".containerCard");
const form = document.querySelector(".form-group");

const btnBuscar = document.querySelector("#btnId");
const btnModificar = document.querySelector("#btnModificar");

const getLibro = async() => {
    const resp = await fetch(endpoint);
    const data = await resp.json();

    data.forEach((libro) => {
        const { id, nombre, url, autor, editorial } = libro;
        container.innerHTML += `
        <div class="card mt-5" style="width: 18rem;">
        <img src="${url}" id="img"  class="mt-3" alt="...">
        <div class="card-body">
            <h5 class="card-title">${nombre}
            </h5>
            <h5>${autor}</h5>
            <h6>${editorial}</h6>
            <button id=${id} class="btn btn-danger btn-sm w-100 mb-3">
            Borrar
        </button>
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

    const libro = {
        url,
        nombre,
        autor,
        editorial,
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
        const { id, nombre, url, autor, editorial } = buscado;

        document.getElementById("inputUrl").value = url;
        document.getElementById("inputNombre").value = nombre;
        document.getElementById("inputAutor").value = autor;
        document.getElementById("inputEditorial").value = editorial;

        document.getElementById("inputId").value = id;
    } else {
        alert("Id no encontrado");
    }
});

btnModificar.addEventListener("click", async() => {
    const dataModificar = capturarDatos();
    const { url, nombre, autor, editorial } = dataModificar;

    if ((url === "", nombre === "", autor === "", editorial === "")) {
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