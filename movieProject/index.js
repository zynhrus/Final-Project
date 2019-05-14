// Lightbox Init
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

// Video Play
$(function() {
  // Auto play modal video
  $(".video").click(function() {
    var theModal = $(this).data("target"),
      videoSRC = $(this).attr("data-video"),
      videoSRCauto =
        videoSRC +
        "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
    $(theModal + " iframe").attr("src", videoSRCauto);
    $(theModal + " button.close").click(function() {
      $(theModal + " iframe").attr("src", videoSRC);
    });
  });
});

// Get Json
var getUrl = window.location;
var url = `${getUrl.protocol}//${getUrl.host}/${getUrl.pathname.split("/")[1]}`;
console.log(url);
$(document).ready(function() {
  showSlider();
  showMovies();
});

// Slider
function showSlider() {
  $.getJSON("slider.json", function(data) {
    var slider = "";
    $.each(data, function(key, val) {
      slider += `
      <div class="carousel-item">
        <img
          class="d-block w-100"
          src="${val.img}"
          alt="Second slide"
        />
        <div class="carousel-caption d-none d-md-block">
          <h1>${val.name}</h1>
          <p>${val.desc}</p>
        </div>
      </div>`;
      $("#slider").html(slider);
    });
  });
}

// Movie Images
function showMovies() {
  $.getJSON("movies.json", function(data) {
    var movies = "";
    $.each(data, function(key, val) {
      // Using lightbox CDN for modal and slider
      // Hover the image for slider
      movies += `
      <div class="col-md-4 col-sm-6 py-3">                       
          <a
            href="${val.image}"
            data-toggle="lightbox"
            data-gallery="img-gallery"
            data-title="${val.name}" 
            data-footer="<a href='${url}/movies.html?id=${
        val.id
      }'>More Info</a>"
          >
            <img
              src="${val.image}"
              alt="${val.name}"
              class="img-fluid"
            />
          </a>
      </div>`;
      $("#movies").html(movies);
    });
  });
}
