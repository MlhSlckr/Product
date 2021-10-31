const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const content = document.querySelector(".content");
const img = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const form = document.querySelector(".form");
const search = document.querySelector(".search");
const tagsEl = document.querySelector(".tags");

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

let selectedGenre = [];

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.results.length !== 0) {
        showMovies(data.results);
      } else {
        content.innerHTML = `<h1 class='error'>No Results Found</h1>`;
      }
    });
}

function showMovies(data) {
  content.innerHTML = "";
  data.forEach((movie) => {
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
        <button class='btn'>
          Add Wishlist
        </button>
      </p>
    </div>
    `;
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  selectedGenre = [];
  setGenre();
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

setGenre();
function setGenre() {
  tagsEl.innerHTML = ``;
  genres.forEach((genre) => {
    const tag = document.createElement("li");
    tag.id = genre.id;
    tag.innerHTML = genre.name;
    tag.classList.add("tag");
    tag.addEventListener("click", () => {
      tag.classList.add("active");
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
              tag.classList.remove("active");
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      getMovies(API_URL + "&with_genres=" + selectedGenre.join(","));
    });
    tagsEl.append(tag);
  });
}
const tag = document.querySelector("tag");
