var data = [];
window.onload = () => {

    fetchData();

    console.log('window loaded successfully');
}

function fetchData(){

    fetch('http://localhost:3000/movie_details')
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
  
        // Examine the text in the response
        response.json().then(function(receivedData) {
          data = receivedData;
          console.log(receivedData);
          populateGrid();
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });

}

function saveData(){

    var movieTitle = document.querySelector('#movie_title').value;
    var director = document.querySelector('#director').value;
    var budget = document.querySelector('#budget').value;
    var year = document.querySelector('#year').value;
    var payload = `{"movie_title":"${movieTitle}",
    "director":"${director}",
    "budget":"${budget}",
    "year":"${year}"
    }`;
    console.log(payload);
    fetch('http://localhost:3000/movie_details',{
        method: 'post',
        headers: {
          "Content-type": "application/json"
        },
        body: payload
    })
    .then(
      function(response) {
        if (response.status !== 201) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
  
        // Examine the text in the response
        response.json().then(function(receivedData) {
          data = receivedData;
          console.log(receivedData);
          populateGrid();
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });


}


function populateGrid(){

        var movieDetailsGrid = document.querySelector('#MovieDetailsGrid');
        movieDetailsGrid.removeChild(document.querySelector('#MovieDetailsList'));
        var movieList = document.createElement('ul');
        movieList.setAttribute('id','MovieDetailsList');
        let li = {};
        for(item of data){
            li = document.createElement('li');
            li.innerHTML = `<span class="cell">${item.movie_title}</span><span class="cell">${item.director}</span>
            <span class="cell">${item.budget}</span><span class="cell">${item.year}</span>`;
            movieList.appendChild(li);
        }
        movieDetailsGrid.appendChild(movieList);
}