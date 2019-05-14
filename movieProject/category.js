// Get Json
var getUrl = window.location;
var url = `${getUrl.protocol}//${getUrl.host}/${getUrl.pathname.split("/")[1]}`;
var categories = urlParameter("category");
$(document).ready(function() {
  showImage();
  showCategory();
});

function showImage() {
  $.getJSON("movies.json", function(data) {
    var images = "";
    $.each(data, function(key, val) {
      if (val.category == categories) {
        images += `
      <div class="card">
        <img
          src="${val.image}"
          alt="${val.name}"
          class="img-fluid card-img-top"
        />
        <div class="card-body">
          <h4 class="card-title text-center">${val.name}</h4>
          <small class="text-muted">${val.duration} minutes</small>
          <hr />
          <p class="card-text">
          ${val.sinopsis}
          </p>
          <a class="btn btn-primary" href="${url}/movies.html?id=${
          val.id
        }" role="button">More info</a>
        </div>
      </div>`;
        $("#images").html(images);
      }
    });
  });
}

function showCategory() {
  $.getJSON("category.json", function(data) {
    var category = "";
    $.each(data, function(key, val) {
      // console.log(val.url);
      // console.log(category);
      if (val.url == categories) {
        category += `
        <h1>${val.name}</h1>
        <p>
          ${val.deskripsi}
        </p>`;
        $("#category").html(category);
      }
    });
  });
}
