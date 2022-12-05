import { useEffect, useState } from 'react'
import '../styles/form.css'

function Form() {

  const [movieData, setMovieData] = useState([]);
  const [movies, Setmovies] = useState({})

  useEffect(() => {

    var movieList = {}
    
    for (var i = 0; i < movieData.length; i++) {
      movieList[movieData[i].title] = [movieData[i].poster_path, movieData[i].rating]
    }
    Setmovies(movieList)

  }, [movieData])

  function fetchMovies(e) {

    e.preventDefault();

    var movieGenre = document.getElementById("inputGenre").value;
    var movieLength = document.getElementById("inputLength").value;
    var movieService = document.getElementById("inputService").value;


    fetch("http://127.0.0.1:5000/movies/get_by_genre",
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "genre": movieGenre
        })
      }).then((response) => response.json())
      .then((data) => {
        console.log(data.results)
        setMovieData(data.results)
        
      }).catch ((error) => {
          console.log(error);
      })
      
    }

  return (
    <div className="form-container">
      <form>
        <div className='form-content'>
          <div className='formTitle'>Movie Preferences</div> 
          <div className='inputs'>
            <label>
              <input type="text" id='inputGenre' placeholder='Genre'></input>
            </label>  
            <label>
              <input type="text" id='inputLength' placeholder='Length'></input>
            </label>
            <label>
              <input type="text" id='inputService' placeholder='Streaming Service'></input>
            </label> 
            <button className='searchMovie' onClick={(e) =>  fetchMovies(e)}>SEARCH</button>
          </div> 
        </div>
        {/* Create New Div element to display movies, parse through data stored in movieData */}
        <div className='movieGrid'>
          {movieData && Object.entries(movies).map(([ key, value ], i) => 
              <div key={i} className="movieOutput">
                <div>
                  <div>
                  <img src={value[0]} alt="movie link"/>
                  </div>
                  <div>{key}</div>
                  <div>{value[1]}</div>
                </div>
              </div>
            )
          }
        </div>
      </form>
    </div>
  );

}
export default Form;
