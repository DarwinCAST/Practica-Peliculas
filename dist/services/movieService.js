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
exports.addMovie = addMovie;
exports.addDirector = addDirector;
exports.getMovie = getMovie;
exports.checkMovie = checkMovie;
exports.editMovie = editMovie;
exports.deleteMovie = deleteMovie;
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let movies = [];
let autoIncrementId = 1;
function addMovie(title) {
    const newMovie = {
        id: autoIncrementId++,
        title: title,
        director: "",
        watched: false,
    };
    movies.push(newMovie);
    return newMovie;
}
function addDirector(title, director) {
    const movie = movies.find((m) => m.title === title);
    if (movie) {
        movie.director = director;
        return true;
    }
    return false;
}
function getMovie() {
    return movies;
}
function checkMovie(id) {
    const movie = movies.find((m) => m.id === id);
    if (movie) {
        movie.watched = true;
        return true;
    }
    return false;
}
function editMovie(id) {
    const movie = movies.find((m) => m.id === id);
    return movie;
}
function deleteMovie(id) {
    const movieIndex = movies.findIndex((m) => m.id === id);
    if (movieIndex !== -1) {
        movies.splice(movieIndex, 1);
    }
}
function promptUser() {
    throw new Error("Function not implemented.");
}
