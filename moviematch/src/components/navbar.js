import '../styles/navbar.css'
import logo from '../moviematch.png'

function Navbar() {


  function signIn() {
    console.log(1)
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
