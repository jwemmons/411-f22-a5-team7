import '../styles/movie.css'
import { useEffect, useState } from 'react'



function FavmovieCard(movieData) {

    let movie = Object.values(movieData)


    function redirectMovie(movieID) {

    
        fetch("http://127.0.0.1:4000/stream-redirect",
          {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({
              "movie_id": movieID,
              "service": movie[0][5]
            })
          }).then((response) => response.json())
          .then((data) => {
            window.open(data.link);
    
          }).catch((error) => {
            console.log(error);
          })
    
      }

    function deleteMovie() {
         
    }


  return (
    <div className='results'>

        <div>
            <img src={movie[0][1]} style={{"cursor": "pointer"}} alt="movie link" onClick={() => redirectMovie(movie[0][4])}/>
        </div>
        <div className='title'>{movie[0][0]}</div>
        <div>{movie[0][3]} min</div>
        <div>{movie[0][2]}</div>
        <button onClick={() => deleteMovie()}>Delete</button>

    </div>
  );
}

export default FavmovieCard;