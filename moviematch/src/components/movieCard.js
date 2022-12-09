import '../styles/movie.css'
import Heart from "react-heart";
import { useEffect, useState } from 'react'



function MovieCard(movieData) {

    const [active, setActive] = useState(false)
    const [disabled, setDisabled] = useState(false)
    let movie = Object.values(movieData)

    function redirectMovie(movieID) {

        var movieService = movie[0][5];
    
        fetch("http://127.0.0.1:4000/stream-redirect",
          {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
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

    function onClick(e) {
        if (disabled === false) {
            setActive(true)
            fetch("http://127.0.0.1:4000/user/add_fav",
          {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({
              "title": movie[0][0],
              "poster_path": movie[0][1],
              "rating": movie[0][2],
              "runtime": movie[0][3],
              "movie_id": movie[0][4],
              "service": movie[0][5]
            })
          }).then((response) => response.json())
          .then((response) => console.log(response))
          .catch((error) => {
            console.log(error);
          })
        }
        else {
            console.log("already added to favorites!")
        }        
     }


  return (
    <div className='results'>

        <div>
            <img src={movie[0][1]} style={{"cursor": "pointer"}} alt="movie link" onClick={() => redirectMovie(movie[0][4])}/>
        </div>
        <div className='title'>{movie[0][0]}</div>
        <div>{movie[0][3]} min</div>
        <div>{movie[0][2]}</div>
        <Heart isActive={active} disabled={disabled} onClick={() => {onClick(); setDisabled(true)}} style={{ height: 53, width: 36 }}/>

    </div>
  );
}

export default MovieCard;
