"use strict";
//opgave 2 skriv objekter
const movies = [
  {
    id: 1,
    titel: "Inception",
    genre: "science-fiction",
    year: 2010,
    duration: 2.28,
    img: "img/inception.webp",
    url: "https://www.imdb.com/title/tt1375666/",
  },

  {
    id: 2,
    titel: "The Dark Knight",
    genre: "action",
    year: 2008,
    duration: 2.32,
    img: "img/the-dark-knight.webp",
    url: "https://www.imdb.com/title/tt0468569/",
  },
  {
    id: 3,
    titel: "Forrest Gump",
    genre: "drama",
    year: 1994,
    duration: 2.22,
    img: "img/forrest-gump.webp",
    url: "https://www.imdb.com/title/tt0109830/",
  },
  {
    id: 4,
    titel: "Superbad",
    genre: "comedy",
    year: 2007,
    duration: 1.53,
    img: "img/superbad.webp",
    url: "https://www.imdb.com/title/tt0829482/",
  },
  {
    id: 5,
    titel: "It",
    genre: "horror",
    year: 2017,
    duration: 2.15,
    img: "img/it.webp",
    url: "https://www.imdb.com/title/tt1396484/",
  },
  {
    id: 6,
    titel: "The Hangover",
    genre: "comedy",
    year: 2009,
    duration: 1.4,
    img: "img/the-hangover.webp",
    url: "https://www.imdb.com/title/tt1119646/",
  },
  {
    id: 7,
    titel: "The Conjuring",
    genre: "horror",
    year: 2013,
    duration: 1.52,
    img: "img/the-conjuring.webp",
    url: "https://www.imdb.com/title/tt1457767/",
  },

  {
    id: 8,
    titel: "Interstellar",
    genre: "science-fiction",
    year: 2014,
    duration: 2.55,
    img: "img/interstellar.jpg",
    url: "https://www.imdb.com/title/tt0816692/",
  },

  {
    id: 9,
    titel: "The Matrix",
    genre: "science-fiction",
    year: 1999,
    duration: 3.02,
    img: "img/the-matrix.webp",
    url: "https://www.imdb.com/title/tt0133093/ ",
  },

  {
    id: 9,
    titel: "The Matrix",
    genre: "science-fiction",
    year: 1999,
    duration: 3.02,
    img: "img/the-matrix.webp",
    url: "https://www.imdb.com/title/tt0133093/",
  },
  {
    id: 10,
    titel: "Pulp Fiction",
    genre: "drama",
    year: 1994,
    duration: 1.39,
    img: "img/pulp-fiction.webp",
    url: "https://www.imdb.com/title/tt0110912/",
  },
];

// opgave 3: Byg forsiden med alle film og favoritstjerner

// Henter de HTML-elementer, vi skal arbejde med
const movieContainer = document.querySelector("#movies-container");

/*
  Vi gemmer kun film id'er som favoritter.
  Hvis der ikke ligger noget i localStorage endnu, bruger vi et tomt array.
*/
let favoriteIds = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

/*
  Hjælpefunktion:
  Undersøger om en id allerede er favorit.
*/
function isFavorite(id) {
  return favoriteIds.includes(id);
}

/*
Her opretter jeg en funktion, som skal vise filmene i browseren.
Funktionen modtager en liste med film som parameter.
*/
function displayMovies(movieList) {
  const html = movieList
    .map((item) => {
      // const star = isFavorite(item.id) ? "★" : "☆";
      let star;

      if (isFavorite(item.id)) {
        star = "★";
      } else {
        star = "☆";
      }

      // Her indsætter jeg HTML-kode i containeren med data fra hvert objekt.
      // Her opbygger jeg en HTML-struktur med data fra mit JavaScript-array -->
      return `
      <article>
        <button class="favorite-btn" data-id="${item.id}" aria-label="Vælg favorit">
                    ${star}
        </button>

        <h2>${item.titel}</h2>
        <h3><span id="genre">Genre:</span> ${item.genre}</h3>
        <h3><span id="year">Year:</span> ${item.year}</h3>
        <p><span id="beskrivelse">Duration:</span> ${item.duration}</p>
      </article>
    `;
    })
    .join("");

  movieContainer.innerHTML = html;

  /*
      Efter vi har sat HTML ind i DOM'en,
      finder vi alle stjerne-knapperne
      og giver dem et click event.
    */
  const favoriteButtons = document.querySelectorAll(".favorite-btn");

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const moviesId = Number(button.dataset.id);
      toggleFavorite(moviesId);
    });
  });
}

/*
  Denne funktion skifter mellem:
  - tilføj favorit
  - fjern favorit
*/
function toggleFavorite(id) {
  if (favoriteIds.includes(id)) {
    favoriteIds = favoriteIds.filter((favoriteId) => {
      return favoriteId !== id;
    });
  } else {
    favoriteIds.push(id);
  }

  localStorage.setItem("favoriteMovies", JSON.stringify(favoriteIds));

  displayMovies(movies);
}

// Her kalder jeg funktionen og sender hele movies-arrayet med ind som argument.
displayMovies(movies);
