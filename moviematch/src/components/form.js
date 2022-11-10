import '../styles/form.css'
import GenreForm from './Genres';
import LengthForm from './Length' ;
import StreamForm from './Stream';

function Form() {
  return (
    <div className="form-container">
      
              <GenreForm></GenreForm>
              <LengthForm></LengthForm>
              <StreamForm></StreamForm>

      <form>
        <div className='formTitle'>Movie Preferences</div>  
        <br/>
        <label className=''>
            <input type="text" placeholder='Genre'></input>
        </label><br/>
        <label className=''>
            <input type="text" placeholder='Length'></input>
        </label><br/>
        <label>
            <input type="text" placeholder='Streaming Service'></input>
        </label> <br/>
        <button className='searchMovie'>SEARCH</button>
      </form>
    </div>
  );
}

export default Form;
