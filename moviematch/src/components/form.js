import { useEffect, useState } from 'react'
import '../styles/form.css'
import Movie from './movieCard.js'
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material"


function Form() {

  const [movieData, setMovieData] = useState([]);
  const [movies, Setmovies] = useState({})

  const [genreSelect, setGenreselect] = useState("")
  const [runtimeSelect, setRuntimeselect] = useState("")
  const [serviceSelect, setServiceselect] = useState("")


  useEffect(() => {

    var movieList = {}

    for (var i = 0; i < movieData.length; i++) {
      movieList[movieData[i].title] = [movieData[i].poster_path, movieData[i].rating, movieData[i].runtime, movieData[i].id, serviceSelect]
    }
    Setmovies(movieList)

  }, [movieData, serviceSelect])

  function fetchMovies(e) {

    e.preventDefault();

    fetch("http://127.0.0.1:4000/movies/get_by_genre",
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({
          "genre": genreSelect,
          "runtime": runtimeSelect,
          "service": serviceSelect
        })
      }).then((response) => response.json())
      .then((data) => {
        console.log(data.results)
        setMovieData(data.results)

      }).catch((error) => {
        console.log(error);
      })

    }

  function handleChangeGenre(e) {
    setGenreselect(e.target.value)
  } 

  function handleChangeRuntime(e) {
    setRuntimeselect(e.target.value)
  } 

  function handleChangeService(e) {
    setServiceselect(e.target.value)
  } 


  return (
    <div className="form-container">
      <form>
        <div className='form-content'>
          <hr></hr>
          <div className='inputs'>
            <div>
            <FormControl sx={{ width: 200, height: 5}}>
              <InputLabel>Genres</InputLabel>
              <Select value={genreSelect} onChange={handleChangeGenre} id="selectGenre">
                <MenuItem value={"Action"}>Action</MenuItem>
                <MenuItem value={"Adventure"}>Adventure</MenuItem>
                <MenuItem value={"Animation"}>Animation</MenuItem>
                <MenuItem value={"Comedy"}>Comedy</MenuItem>
                <MenuItem value={"Crime"}>Crime</MenuItem>
                <MenuItem value={"Documentary"}>Documentary</MenuItem>
                <MenuItem value={"Drama"}>Drama</MenuItem>
                <MenuItem value={"Family"}>Family</MenuItem>
                <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
                <MenuItem value={"History"}>History</MenuItem>
                <MenuItem value={"Horror"}>Horror</MenuItem>
                <MenuItem value={"Music"}>Music</MenuItem>
                <MenuItem value={"Mystery"}>Mystery</MenuItem>
                <MenuItem value={"Romance"}>Romance</MenuItem>
                <MenuItem value={"Science Fiction"}>Science Fiction</MenuItem>
                <MenuItem value={"TV Movie"}>TV Movie</MenuItem>
                <MenuItem value={"Thriller"}>Thriller</MenuItem>
                <MenuItem value={"War"}>War</MenuItem>
                <MenuItem value={"Westernf"}>Western</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: 200, height: 5}}>
              <InputLabel>Max Runtime (mins)</InputLabel>
              <Select value={runtimeSelect} onChange={handleChangeRuntime}>
                <MenuItem value={"60"}>60</MenuItem>
                <MenuItem value={"70"}>70</MenuItem>
                <MenuItem value={"80"}>80</MenuItem>
                <MenuItem value={"90"}>90</MenuItem>
                <MenuItem value={"100"}>100</MenuItem>
                <MenuItem value={"110"}>110</MenuItem>
                <MenuItem value={"120"}>120</MenuItem>
                <MenuItem value={"130"}>130</MenuItem>
                <MenuItem value={"140"}>140</MenuItem>
                <MenuItem value={"150"}>150</MenuItem>
                <MenuItem value={"160"}>160</MenuItem>
                <MenuItem value={"170"}>170</MenuItem>
                <MenuItem value={"180"}>180</MenuItem>
                <MenuItem value={"190"}>190</MenuItem>
                <MenuItem value={"200"}>200</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: 200, height: 5}} className="middle">
              <InputLabel>Streaming Services</InputLabel>
              <Select value={serviceSelect} onChange={handleChangeService}>
                <MenuItem value={"Netflix"}>Netflix</MenuItem>
                <MenuItem value={"Hulu"}>Hulu</MenuItem>
                <MenuItem value={"Amazon Prime"}>Amazon Prime</MenuItem>
                <MenuItem value={"HBO Max"}>HBO Max</MenuItem>
                <MenuItem value={"Disney+"}>Disney+</MenuItem>
                <MenuItem value={"AppleTV+"}>AppleTV+</MenuItem>
                <MenuItem value={"Paramount+"}>Paramount+</MenuItem>
                <MenuItem value={"Showtime"}>Showtime</MenuItem>
                <MenuItem value={"Peacock Premium"}>Peacock Premium</MenuItem>
                <MenuItem value={"Vudu"}>Vudu</MenuItem>
                <MenuItem value={"iTunes"}>iTunes</MenuItem>
                <MenuItem value={"Youtube Premium"}>Youtube Premium</MenuItem>
              </Select>
            </FormControl>
            </div>
          </div>
          <div>
            <button className='searchMovie' onClick={(e) => fetchMovies(e)}>Find your movies!</button>
          </div>
        </div>
        {/* Create New Div element to display movies, parse through data stored in movieData */}
        <div className='movieGrid'>
          {movieData && Object.entries(movies).map(([key, value], i) =>
            <div key={i} className="movieOutput">
              <Movie movieData={[key].concat(value)} ></Movie>
            </div>
          )
          }
        </div>
      </form>
    </div>
  );

}
export default Form;
