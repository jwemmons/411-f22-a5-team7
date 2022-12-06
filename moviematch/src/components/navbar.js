import '../styles/navbar.css'

function Navbar() {
  return (
    <div className="navbar-container">
      <div className='navbar-content'>

        <div className='appTitle'>
          MovieMatch
        </div>
        <div>
          <button className='loginButton'>Login</button>
        </div>
        <hr></hr>
      </div>


    </div>
  );
}

export default Navbar;
