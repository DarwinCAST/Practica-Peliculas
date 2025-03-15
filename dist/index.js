"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const movieService_1 = require("./services/movieService");
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
function handleUserChoice(choice) {
    switch (choice) {
        case "1":
            const movies = (0, movieService_1.getMovie)();
            let result = movies.map((item) => {
                let result = {
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
                const newMovie = (0, movieService_1.addMovie)(title); // Agrega la película con director vacío
                rl.question("Ingrese el director de la película: ", (director) => {
                    (0, movieService_1.addDirector)(newMovie.title, director); // Ahora sí actualiza el director
                    console.log("Película agregada correctamente\n");
                    promptUser();
                });
            });
            break;
        case "3":
            rl.question("Ingrese el ID de la pelicula que usted ha visto: ", (idMovie) => {
                const id = parseInt(idMovie);
                const success = (0, movieService_1.checkMovie)(id);
                if (success) {
                    console.log("!Pelicula Vista!\n");
                }
                else {
                    console.log("No se encontro ninguna tarea con ese id.\n");
                }
                promptUser();
            });
            break;
        case "4":
            rl.question("Ingrese el ID de la pelicula a editar", (idMovie) => {
                const id = parseInt(idMovie);
                let movie = (0, movieService_1.editMovie)(id);
                if (movie) {
                    rl.question("Ingrese el nuevo nombre de la pelicula: ", (pelicula) => {
                        movie.title = pelicula;
                        rl.question("Ingrese el nuevo director de la pelicula", (director) => {
                            movie.director = director;
                        });
                        console.log("Película actualizada");
                        promptUser();
                    });
                }
                else {
                    console.log("Pelicula no encontrada");
                    promptUser();
                }
            });
            break;
        case "5":
            rl.question("Ingrese el ID de la pelicula a eliminar", (idMovie) => {
                const id = parseInt(idMovie);
                (0, movieService_1.deleteMovie)(id);
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
