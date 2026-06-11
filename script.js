const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");

mostrarEstudiantes();

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    const cedula = document.getElementById("cedula").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const nombres = document.getElementById("nombres").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const facultad = document.getElementById("facultad").value.trim();
    const nivel = document.getElementById("nivel").value.trim();
    const paralelo = document.getElementById("paralelo").value.trim();

    const cedulaRegex = /^\d{10}$/;
    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/;
    const telefonoRegex = /^\d{10}$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const paraleloRegex = /^[A-Z]$/;

    if(!cedulaRegex.test(cedula)){
        alert("La cédula debe tener 10 dígitos.");
        return;
    }

    if(!nombreRegex.test(apellidos)){
        alert("Apellidos inválidos.");
        return;
    }

    if(!nombreRegex.test(nombres)){
        alert("Nombres inválidos.");
        return;
    }

    if(!telefonoRegex.test(telefono)){
        alert("El teléfono debe tener 10 dígitos.");
        return;
    }

    if(!correoRegex.test(correo)){
        alert("Correo electrónico inválido.");
        return;
    }

    if(!paraleloRegex.test(paralelo)){
        alert("El paralelo debe ser una letra mayúscula.");
        return;
    }

    let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

    const existe = estudiantes.some(
        estudiante => estudiante.cedula === cedula
    );

    if(existe){
        alert("Ya existe un estudiante con esa cédula.");
        return;
    }

    const estudiante = {
        cedula,
        apellidos,
        nombres,
        direccion,
        telefono,
        correo,
        facultad,
        nivel,
        paralelo
    };

    estudiantes.push(estudiante);

    localStorage.setItem(
        "estudiantes",
        JSON.stringify(estudiantes)
    );

    formulario.reset();

    mostrarEstudiantes();

    alert("Estudiante registrado correctamente.");
});

function mostrarEstudiantes(){

    let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

    lista.innerHTML = "";

    estudiantes.forEach(est => {

        lista.innerHTML += `
            <tr>
                <td>${est.cedula}</td>
                <td>${est.apellidos}</td>
                <td>${est.nombres}</td>
                <td>${est.telefono}</td>
                <td>${est.correo}</td>
                <td>${est.facultad}</td>
                <td>${est.nivel}</td>
                <td>${est.paralelo}</td>
            </tr>
        `;
    });
}