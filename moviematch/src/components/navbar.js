import '../styles/navbar.css'
import logo from '../moviematch.png'

function Navbar() {
  return (
    <div className="navbar-container">
      <div className='navbar-content'>

        <div className='logo'>
          <img  src={logo} alt="moviematchlogo"/>
        </div>

        <div className='appTitle'>MovieMatch</div>

        <div>
          <button className='loginButton'>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
