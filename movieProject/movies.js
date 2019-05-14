// Get Json
var getUrl = window.location;
var url = `${getUrl.protocol}//${getUrl.host}/${getUrl.pathname.split("/")[1]}`;
var id = urlParameter("id");

$(document).ready(function() {
  showMovieData();
});

// Movies Data
function showMovieData() {
  $.getJSON("movies.json", function(data) {
    var movie = "";
    var formWaktu = "";
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

    // console.log(data);
    $.each(data, function(key, val) {
      if (val.id == id) {
        // Category Box
        var category = val.category;
        var catBox = "";
        var color = "";
        console.log(category);
        if (category === "remaja") {
          catBox += `<span class="bg-primary text-white rounded p-1">R<sup>13+</sup></span>`;
          color += `primary`;
        } else if (category === "dewasa") {
          catBox += `<span class="bg-danger text-white rounded p-1">D<sup>17+</sup></span>`;
          color += `danger`;
        } else if (category === "semua_umur") {
          catBox += `<span class="bg-success text-white rounded p-1">SU</span>`;
          color += `success`;
        }
        // Waktu Tayang
        var tayang = "";
        $.each(val.waktu_tayang, function(key, value) {
          tayang += `<td>${value}</td>`;
        });
        // Movie
        movie += `
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-12">            
              <img
                src="${val.image}"
                alt=""
                class="img-fluid card-img-top"
              />                
              <div class="bg-${color} text-white text-center">
                    <div class="btn card-body"> <a data-toggle="modal" data-target="#modalForm" >BUY TICKET</a></div>
              </div>
          </div>
            <div class="col-md-8 col-12 pt-1">
              <h6>
                  <a href="category.html?category=${category}">
                  ${catBox}
                  </a>
              </h6>
              <h1>${val.name}</h1>        
              <h5>Genre Film : ${val.genre}</h5>
              <h5>Category : ${category}</h5>
              <h5>Duration : ${val.duration} minutes</h5>
              <hr><h2 class="text-center"><a
                href="#"
                class="video"
                data-video="${val.trailer}"
                data-toggle="modal"
                data-target="#trailerModal"
              >Trailer</a></h2><hr>
              <h3>Sinopsis</h3>
              <h5>${val.sinopsis}</h5>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col" colspan="5" class="text-center">WAKTU TAYANG</th>
                  </tr>
                </thead>
                <tbody><br>
                  <tr class="text-center">
                    ${tayang}
                  </tr>
                </tbody>
              </table>           
            </div>
        </div>
      </div>`;
        $("#movie").html(movie);
        // Waktu Tayang Form
        var tayangForm = "";
        $.each(val.waktu_tayang, function(key, value) {
          tayangForm += `<option>${value}</option>`;
        });
        // Time
        formWaktu += `${tayangForm}`;
        $("#time").html(formWaktu);
        // Form attr
        $(".movieName").attr("value", val.name);
        $(".movieId").attr("value", val.id);
      }
    });
  });
}

// Harga
$("#ticket").on("input", function() {
  var total = 0;
  $("#ticket").each(function() {
    var jumlah = $(this).val();
    if ($.isNumeric(jumlah)) {
      total += jumlah * 35000;
    }
  });
  console.log(total);
  $("#total").html(total);
});
