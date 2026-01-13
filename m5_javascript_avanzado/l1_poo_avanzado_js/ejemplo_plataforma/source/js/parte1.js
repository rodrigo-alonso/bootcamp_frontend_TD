function mostrarAlumno() {
    class Alumno {
        rut = "XXX";
        nombres = "XXX";
        apellidos = "XXX";
        genero = "Masculino";
        edad = 33;
        fechaNacimiento = new Date("02/12/1987").toLocaleDateString(); // MM/DD/YYYY
        fechaIngreso = new Date("01/12/2018").toLocaleDateString();
        carrera = "Ingenieria de Sistemas";
        ramosTotales = 47;
        ramosAprobados = 20;
        porcentajeAvance = (this.ramosAprobados / this.ramosTotales * 100).toFixed(1);
        promedioNotas = 7;

        mostrarDatos() {
            let datos = "-- DATOS PERSONALES --\n";
            datos += "Rut: " + this.rut + "\n";
            datos += "Nombre: " + this.nombres + " " + this.apellidos + "\n";
            datos += "Fecha de Nacimiento: " + this.fechaNacimiento + "\n";
            datos += "Edad: " + this.edad + "\n";
            datos += "Sexo: " + this.genero + "\n";
            datos += "-- DATOS ACADEMICOS --\n";
            datos += "Carrera: " + this.carrera + "\n";
            datos += "Fecha de Ingreso: " + this.fechaIngreso + "\n";
            datos += "Ramos Aprobados: " + this.ramosAprobados + " de " + this.ramosTotales + "\n";
            datos += "Porcentaje Avance: " + this.porcentajeAvance + "% \n";
            datos += "Promedio: " + this.promedioNotas + "\n";
            
            return datos;
        }
    }

    let Alumno1 = new Alumno();
    console.log(Alumno1.mostrarDatos());
}

