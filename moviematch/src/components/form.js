import { useState } from 'react'
import axios from "axios";
import '../styles/form.css'

function Form() {

  const [movieData, setMovieData] = useState(null);

  async function fetchMovies() {

    var movieGenre = document.getElementById("inputGenre").value;
    var movieLength = document.getElementById("inputLength").value;
    var movieService = document.getElementById("inputService").value;

    try {

      const response = await axios.get("/movie",

      {
        data: {
          genre: movieGenre,
          length: movieLength,
          service: movieService
        }
      })

      console.log(response);

      const res = response.data
      setMovieData(res)
    }

    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form-container">
      <form>
        <div className='formTitle'>Movie Preferences</div>  
        <label className='enterGenre'>
            <input type="text" id='inputGenre' placeholder='Genre'></input>
        </label><br/>
        <label className=''>
            <input type="text" id='inputLength' placeholder='Length'></input>
        </label><br/>
        <label>
            <input type="text" id='inputService' placeholder='Streaming Service'></input>
        </label> <br/>
        <button className='searchMovie' onClick={() => fetchMovies()}>SEARCH</button>

        {/* Create New Div element to display movies, parse through data stored in movieData */}

      </form>
    </div>
  );
}

export default Form;
