const url = 'https://randomuser.me/api/?results=5000';
const tabla = document.getElementById('tabla-usuarios');
const progressbar = document.getElementById('progress-bar');

function cargarDatosUsuarios() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET',url,true);

    xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            const porcentaje = Math.round((event.loaded / event.total) * 100);
            progressbar.style.width = porcentaje + "%";
            progressbar.textContent = porcentaje + "%";
        }
        else {
            progressbar.textContent = "Cargando...";
        }
    };

    xhr.onload = function() {
        if (xhr.status == 200) {
            progressbar.style.width = "100%";
            progressbar.textContent = "Completado";

            const data = JSON.parse(xhr.responseText);
            mostrarDatos(data.results);
        }
        else {
            alert("Problemas con la carga de los datos")
        }
    }

    xhr.onerror = function() {
        alert("Error de conexión");
    }

    xhr.send();
}

function mostrarDatos(usuarios) {
    let filas = '';
    
    usuarios.forEach((user,index) => {
        filas += `
            <tr>
                <td>${user.name.first} ${user.name.last}</td>
                <td>${user.location.country}</td>
                <td>${user.email}</td>
                <td><img class="rounded-cicle" src="${user.picture.thumbnail}" ></td>
            </tr>    
        `;
    });

    tabla.innerHTML = filas;
}

