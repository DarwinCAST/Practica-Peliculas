import { Movie } from "../model/movie";
import * as readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let movies: Movie[] = [];
let autoIncrementId = 1;

export function addMovie(title: string): Movie {
  const newMovie: Movie = {
    id: autoIncrementId++,
    title: title,
    director: "",
    watched: false,
  };
  movies.push(newMovie);
  return newMovie;
}

export function addDirector(title: string, director: string): boolean {
  const movie = movies.find((m) => m.title === title);
  if (movie) {
    movie.director = director;
    return true;
  }
  return false;
}

export function getMovie(): Movie[] {
  return movies;
}

export function checkMovie(id: number): boolean {
  const movie = movies.find((m) => m.id === id);

  if (movie) {
    movie.watched = true;
    return true;
  }
  return false;
}

export function editMovie(id: number): Movie | undefined {
  const movie = movies.find((m) => m.id === id);

  return movie;
}

export function deleteMovie(id: number) {
  const movieIndex = movies.findIndex((m) => m.id === id);
  if (movieIndex !== -1) {
    movies.splice(movieIndex, 1);
  }
}

function promptUser() {
  throw new Error("Function not implemented.");
}
