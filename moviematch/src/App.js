import './App.css';
import Form from './components/form';
import GenreForm from './components/Genres';
import Navbar from './components/navbar';


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Form></Form>
      <GenreForm></GenreForm>
    </div>
  );
}

export default App;
