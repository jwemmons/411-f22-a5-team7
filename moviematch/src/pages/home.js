import '../styles/home.css';
import Navbar from '../components/navbar';
import Login from '../components/Login';
import logo from '../moviematch.png'


function Home() {

  function signIn() {

    fetch("http://127.0.0.1:4000/login",
      {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        credentials: "include"
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        window.location.replace(response["url"]);
      }).catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="App">
      <div className="welcometitle"> Welcome to MovieMatch </div>


      <div className="textInstructions">Movie magic - We Guarantee We'll Match You With Your Perfect Film</div>
      <div className="textInstructions"> Click the Login Button Below to Get Started</div>
      <div className="button">
        <button className='loginButton' onClick={() => signIn()} class="block">Login</button>

      </div>




    </div>

  );
}

export default Home;
