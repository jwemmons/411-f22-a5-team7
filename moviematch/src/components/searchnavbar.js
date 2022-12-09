import '../styles/navbar.css'
import logo from '../moviematch.png'

function Navbar() {

  const logout = () => {
    fetch("http://127.0.0.1:4000/logout",
    {
      method: "GET",
      credentials: "include"
    }
    )
    .then((response) => response.json())
    .then((response) => {
      window.location.replace(response["url"])
    }).catch((error) => {
      console.log(error);
    })
  }

  const goFav = () => {
    window.location.replace("http://localhost:3000/favorites")
  }

  return (
    <div className="navbar-container">
      <div className='navbar-content'>

        <div className='logo'>
          <img  src={logo} alt="moviematchlogo"/>
        </div>

        <div className='appTitle'>MovieMatch</div>

        <div>
          <button className='favButton' onClick={() => goFav()}>Favorites</button>
        </div>

        <div>
          <button className='logoutButton' onClick={() => logout()}>Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
