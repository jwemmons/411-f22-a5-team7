import '../styles/navbar.css'
import logo from '../moviematch.png'

function Navbar() {


  function signIn() {

    fetch("http://127.0.0.1:5000/login").then((response) => response.json())
      .then((data) => {
        console.log(data)
        window.location.replace(data.auth_url)

      }).catch((error) => {
        console.log(error);
      })

  }


  return (
    <div className="navbar-container">
      <div className='navbar-content'>

        <div className='logo'>
          <img  src={logo} alt="moviematchlogo"/>
        </div>

        <div className='appTitle'>MovieMatch</div>

        <div>
          <button className='loginButton' onClick={() => signIn()}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
