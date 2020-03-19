$(document).ready(function() {
  $("#searchForm").keyup(function(elem) {
    var searchMovies = $("#searchMovie").val();
    for (var i = 0; i < searchMovies.length; i++) {
      console.log(searchMovies);
      if (searchMovies.length > 2) {
        $("#movies").show(1000);
        $("#carouselExampleIndicators").hide(1000);
      } else if (searchMovies.length <= 2) {
        $("#carouselExampleIndicators").show(1000);
        $("#movies").hide(1000);
      }
    }
    // console.log(searchMovies)
    callApi(searchMovies);
    elem.preventDefault();
  });
});

// xhr.status
function callApi(query) {
  var base = "https://www.omdbapi.com/?apikey=e1a8c46&s=";
  $.ajax({
    url: base + query,
    type: "GET",
    datatype: JSON,
    success: function(res) {
      // console.log(res.Search)
      var movies = res.Search;
      console.log(movies);
      let out = "";
      movies.forEach(function(movie) {
        out += `<div class='col-md-3'>
        <div class="text-center">
        <img src="${movie.Poster}" class= "p-5 img-responsive" alt="">
      <h5 class="m-3">${movie.Title}</h5>
        <a href="https://www.imdb.com/title/${movie.imdbID}" class="btn btn-outline-primary">IMDB</a>
        <a href="#" id="movie-details" onclick="selectMovie('${movie.imdbID}')" class="btn btn-outline-dark">Details</a>
        </div>
      </div>`;
      });

      $("#movies").html(out);
    }
  });
}

function selectMovie(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "details.html";
  return false;
}

function getMovieDetails() {
  var movieId = sessionStorage.getItem("movieId");
  console.log(movieId);
  var base = "http://www.omdbapi.com/?apikey=e1a8c46&i=";
  $.ajax({
    url: base + movieId,
    type: "GET",
    datatype: JSON,
    success: function(res) {
      console.log(res);
      var out = `<div class="row p-5">
        <div class="col-4 text-center d-flex align-self-center justify-content-center">
          <div class="row">
          <img src="${res.Poster}" class="p-5 img-responsive border" alt="">
          <a href="index.html" class="p-3 btn btn-outline-success m-3" ><i class="fas fa-undo-alt"></i> Search Again</a></div>
          <div class="col-4">
          
          </div>
        </div>
        
        <div class="col-8">
        <li class="list-group-item"><h1 class="display-4 m-1">${res.Title}</h1></li>
        <li class="list-group-item"><h3>${res.Year}</h3></li>
        <ul class="list-group">
          <li class="list-group-item lead">Rated : ${res.Rated}</li>
          <li class="list-group-item lead">Runtime : ${res.Runtime}</li>
          <li class="list-group-item lead">Genre : ${res.Genre}</li>
          <li class="list-group-item lead">Director : ${res.Director}</li>
          <li class="list-group-item lead">Writer : ${res.Writer}</li>
          <li class="list-group-item lead">Actors : ${res.Actors}</li>
          <li class="list-group-item lead">Plot : ${res.Plot}</li>
          <li class="list-group-item lead">Language : ${res.Language}</li>
          <li class="list-group-item lead">Country : ${res.Country}</li>
          <li class="list-group-item lead">IMDB Ratings : ${res.imdbRating}</li>
          <li class="list-group-item lead">Type : ${res.Type}</li>
          <li class="list-group-item lead">Production : ${res.Production}</li>
        </ul> 
        </div>
      </div>`;
      $("#movie").html(out);
    }
  });
}

$(document).ready(function() {
  if (window.location.pathname == "/details.html") {
    // console.log(window.location.pathname);
    getMovieDetails();
  }
});
