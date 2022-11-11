import { useState } from 'react'
import axios from "axios";
import '../styles/form.css'

function Form() {

  const [movieData, setMovieData] = useState(null);


  async function fetchMovies() {

    var movieGenre = document.getElementById("inputGenre").value;
    var movieLength = document.getElementById("inputLength").value;
    var movieService = document.getElementById("inputService").value;
    var movieMaturity = document.getElementById("inputMaturity").value;


    try {

      const response = await axios.get("/movie",

      {
        data: {
          genre: movieGenre,
          length: movieLength,
          maturity: movieMaturity,
          service: movieService
        }
      })

      console.log(response);

      const res = response.data
      setMovieData(res) /* change based on how data is formatted */
    }

    catch (error) {
      console.log(error);
    }
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
              <input type="text" id='inputMaturity' placeholder='Maturity'></input>
            </label>
            <label>
              <input type="text" id='inputService' placeholder='Streaming Service'></input>
            </label> 
            <button className='searchMovie' onClick={() => fetchMovies()}>SEARCH</button>
          </div> 
        </div>
        {/* Create New Div element to display movies, parse through data stored in movieData */}
      </form>
    </div>
  );
}

export default Form;
