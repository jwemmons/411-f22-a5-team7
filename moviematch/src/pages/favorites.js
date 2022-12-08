import '../styles/favorites.css';
import Favnavbar from '../components/favnavbar';
import MovieCard from '../components/movieCard';
import { useEffect } from 'react'


function Favorites() {

    useEffect(() => { 
        console.log("do something")
        }, [])


    return (
        <div className="favorites">
            <Favnavbar></Favnavbar>
            <div>Favorites</div>
            <div className='movieGrid'>
            
            </div>
        </div>
  );
}

export default Favorites;
