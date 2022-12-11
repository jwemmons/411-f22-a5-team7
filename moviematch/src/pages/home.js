import '../styles/home.css';
import Navbar from '../components/navbar';
import Login from '../components/Login';
import logo from '../logo.png'


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

      <div className='appContainer'>

        <div className='titleContainer'>
            <div className="welcometitle"> Welcome to MovieMatch </div>
            <img src={logo} alt="moviematchlogo"/>

        </div>
            
        <div className="textInstructions">Get Matched with your Perfect Film!</div>
       
              
        <div className="button">
            <button className='loginButton' onClick={() => signIn()} class="block">Login</button>
        </div>



      </div>


    </div>

  );
}

export default Home;
