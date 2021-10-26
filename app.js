const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const content = document.querySelector(".content");
const img = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const form = document.querySelector(".form");
const search = document.querySelector(".search");

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

function showMovies(data) {
  content.innerHTML = "";
  data.forEach((movie) => {
    console.log(movie);
    content.innerHTML += `
    <div class='movieEl'>
      <img class='img' src="${img + movie.poster_path}" alt="">
      <div class='text'>
        <h1 class='title'>${movie.title}</h1>
        <div class='vote ${getColor(movie.vote_average)}'>  
          ${movie.vote_average}
        </div>
      </div>
      <p class='desc'>
        ${movie.overview}
      </p>
    </div>
    `;
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  }
  if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
