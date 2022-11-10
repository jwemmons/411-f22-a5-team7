import React from 'react';
 
class GenreForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A genre was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        
        <form onSubmit={this.handleSubmit}>
          Genre:
          <label>
            <input type="text" placeholder='Genre' value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default GenreForm