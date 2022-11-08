import '../styles/form.css'

function Form() {
  return (
    <div className="form-container">
      <form>
        <div className='formTitle'>Movie Preferences</div>  
        <label className='enterGenre'>
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
