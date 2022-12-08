import '../styles/home.css';
import Form from '../components/Form';
import Searchnavbar from '../components/Searchnavbar';



function Home() {
  return (
    <div className="App">
      <Searchnavbar></Searchnavbar>
      <Form></Form>
    </div>
  );
}

export default Home;
