import '../styles/movie.css'
import Heart from "react-heart";
import { useEffect, useState } from 'react'



function MovieCard(movieData) {

    const [active, setActive] = useState(false)
    let movie = Object.values(movieData)


    function redirectMovie(movieID) {

        var movieService = document.getElementById("inputService").value;
    
        fetch("http://127.0.0.1:5000/stream-redirect",
          {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "movie_id": movieID,
              "service": movieService
            })
          }).then((response) => response.json())
          .then((data) => {
            window.open(data.link);
    
          }).catch((error) => {
            console.log(error);
          })
    
      }


  return (
    <div className='results'>

        <div>
            <img src={movie[0][1]} style={{"cursor": "pointer"}} alt="movie link" onClick={() => redirectMovie(movie[0][4])}/>
        </div>
        <div className='title'>{movie[0][0]}</div>
        <div>{movie[0][3]} min</div>
        <div>{movie[0][2]}</div>
        <Heart isActive={active} onClick={() => setActive(!active)} style={{ height: 53, width: 36 }}/>

    </div>
  );
}

export default MovieCard;
