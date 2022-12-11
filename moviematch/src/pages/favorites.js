import '../styles/favorites.css';
import Favnavbar from '../components/favnavbar';
import FavmovieCard from '../components/favmovieCard';
import { useEffect, useState } from 'react'


function Favorites() {

    const [favmovies, setFavmovies] = useState([])
    const [favorite, setFavorite] = useState({})

    useEffect(() => { 

        const fetchData = async() => {

            await fetch("http://127.0.0.1:4000/user/get_fav", 
            {
            method: "GET",
            credentials: "include"
            }
            ).then((response) => response.json())
            .then((data) => {
                console.log(Object.values(data)[0])
                setFavmovies(Object.values(data)[0])
            }).catch((error) => {
                console.log(error);
            })
        }

        fetchData()

    }, [])

    useEffect(() => {
        var movieList = {}
        if ((typeof(favmovies) !== 'undefined') && (favmovies.length !== null)) {

            for (var i = 0; i < favmovies.length; i++) {
                movieList[favmovies[i].title] = [favmovies[i].poster_path, favmovies[i].rating, favmovies[i].runtime, favmovies[i].movie_id, favmovies[i].service]
            }
            setFavorite(movieList)
            console.log(favorite)

        }
    }, [favmovies])


    return (
        <div className="favorites">
            <Favnavbar></Favnavbar>
            <div className='titleC'>Favorites</div>
            <div className='movieGrid'>
            {favmovies && Object.entries(favorite).map(([key, value], i) =>
            <div key={i} className="movieOutput">
              <FavmovieCard movieData={[key].concat(value)} ></FavmovieCard>
            </div>
          )
          }
            </div>
        </div>
  );
}

export default Favorites;
