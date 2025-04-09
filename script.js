const API_KEY = "3eb4e9eb";

let movieNameInput = document.getElementById("movieName");
let searchBtn = document.getElementById("searchBtn");
let result = document.getElementById("result");

let getMovie = () => {
  let movieName = movieNameInput.value.trim();
  let url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${API_KEY}`;

  if (movieName.length === 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
  } else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          result.innerHTML = `
            <div class="info">
              <div class="left">
                <img class="poster" src="${data.Poster}" alt="movie poster">
              </div>
              <div class="right">
                <h2>${data.Title}</h2>
                <div class="rating">
                  <img src="./star-icon.svg" alt="star">
                  <h4>${data.imdbRating}</h4>
                </div>
                <div class="details">
                  <span>${data.Rated}</span>
                  <span>${data.Year}</span>
                  <span>${data.Runtime}</span>
                </div>
                <div class="genre">
                  <div>${data.Genre.split(",").join("</div><div>")}</div>
                </div>
              </div>
            </div>
            <div class="bottom">
              <h3>Plot:</h3>
              <p>${data.Plot}</p>
              <h3>Cast:</h3>
              <p>${data.Actors}</p>
            </div>
          `;
        } else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);