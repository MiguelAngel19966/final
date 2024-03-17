class Pelicula {
  constructor(nombre, director, anioEstreno, genero) {
    this.id = Date.now(); 
    this.nombre = nombre;
    this.director = director;
    this.anioEstreno = anioEstreno;
    this.genero = genero;
  }
}

class Formulario {
  constructor() {
    this.form = document.getElementById("myForm");
    this.movieContainer = document.getElementById("movie-info");
    this.peliculas = JSON.parse(localStorage.getItem('peliculas')) || []; 
    this.mostrarPeliculas();
    this.form.addEventListener("submit", this.agregarPelicula.bind(this));
  }

  agregarPelicula(event) {
    event.preventDefault(); 

    const nombre = document.getElementById("validationDefault01").value;
    const director = document.getElementById("validationDefault02").value;
    const anioEstreno = document.getElementById("validationDefaultUsername").value;
    const genero = document.getElementById("dropdown").value;

    const pelicula = new Pelicula(nombre, director, anioEstreno, genero);
    this.peliculas.push(pelicula); 

    this.mostrarPelicula(pelicula);
    this.guardarPeliculas();
    this.form.reset();
    this.agregarEventosEliminar(); 
  }

  mostrarPelicula(pelicula) {
    const movieInfo = `
      <div class="movie-info" style="color: white;" data-id="${pelicula.id}">
        <p><strong>Nombre de la Película:</strong> ${pelicula.nombre}</p>
        <p><strong>Director:</strong> ${pelicula.director}</p>
        <p><strong>Año de Estreno:</strong> ${pelicula.anioEstreno}</p>
        <p><strong>Género:</strong> ${pelicula.genero}</p>
        <button class="btn btn-danger delete-btn">Eliminar</button>
        <hr>
      </div>
    `;

    this.movieContainer.insertAdjacentHTML("beforeend", movieInfo);
  }

  guardarPeliculas() {
    localStorage.setItem('peliculas', JSON.stringify(this.peliculas));
  }

  mostrarPeliculas() {
    this.peliculas.forEach(pelicula => {
      this.mostrarPelicula(pelicula);
    });

    this.agregarEventosEliminar(); 
  }

  agregarEventosEliminar() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = parseInt(button.parentElement.dataset.id);
        button.parentElement.remove();
        this.peliculas = this.peliculas.filter(pelicula => pelicula.id !== id);
        this.guardarPeliculas();
      });
    });
  }
}

const formulario = new Formulario();