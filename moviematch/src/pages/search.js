import '../styles/home.css';
import Form from '../components/form';
import Searchnavbar from '../components/searchnavbar';



function Home() {
  return (
    <div className="App">
      <Searchnavbar></Searchnavbar>
      <Form></Form>
    </div>
  );
}

export default Home;
