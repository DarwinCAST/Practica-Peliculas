import * as readline from "readline";
import {
  addMovie,
  getMovie,
  checkMovie,
  editMovie,
  deleteMovie,
  addDirector,
} from "./services/movieService";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log(`
    ==================== Menu de Peliculas ====================  
    1. Listar Peliculas
    2. Agregar Pelicula
    3. Marcar Pelicula como vista
    4. Editar pelicula
    5. Eliminar pelicula
    6. Salir
    `);
}

function handleUserChoice(choice: string) {
  switch (choice) {
    case "1":
      const movies = getMovie();
      let result = movies.map((item) => {
        let result: any = {
          id: item.id,
          title: item.title,
          director: item.director,
          watched: item.watched ? "Vista" : "Sin mirar",
        };
        return result;
      });
      console.table(result);
      promptUser();
      break;
    case "2":
      rl.question("Ingrese el título de la película: ", (title) => {
        const newMovie = addMovie(title); // Agrega la película con director vacío

        rl.question("Ingrese el director de la película: ", (director) => {
          addDirector(newMovie.title, director); // Ahora sí actualiza el director
          console.log("Película agregada correctamente\n");
          promptUser();
        });
      });
      break;
    case "3":
      rl.question(
        "Ingrese el ID de la pelicula que usted ha visto: ",
        (idMovie) => {
          const id = parseInt(idMovie);
          const success = checkMovie(id);

          if (success) {
            console.log("!Pelicula Vista!\n");
          } else {
            console.log("No se encontro ninguna tarea con ese id.\n");
          }
          promptUser();
        }
      );
      break;

    case "4":
      rl.question("Ingrese el ID de la pelicula a editar", (idMovie) => {
        const id = parseInt(idMovie);
        let movie = editMovie(id);

        if (movie) {
          rl.question(
            "Ingrese el nuevo nombre de la pelicula: ",
            (pelicula) => {
              movie.title = pelicula;

              rl.question(
                "Ingrese el nuevo director de la pelicula",
                (director) => {
                  movie.director = director;
                }
              );
              console.log("Película actualizada");

              promptUser();
            }
          );
        } else {
          console.log("Pelicula no encontrada");
          promptUser();
        }
      });

      break;

    case "5":
      rl.question("Ingrese el ID de la pelicula a eliminar", (idMovie) => {
        const id = parseInt(idMovie);
        deleteMovie(id);
        promptUser();
      });

      break;

    case "6":
      console.log("Saliendo del programa....");
      rl.close();
      break;

    default:
      console.log("Opcion invalidad, por favor intente de nuevo.\n");
      break;
  }
}

function promptUser() {
  showMenu();
  rl.question("Selecione una opción: ", (choice) => {
    handleUserChoice(choice);
  });
}

promptUser();
