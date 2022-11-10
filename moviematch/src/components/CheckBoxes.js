import React from 'react';

  
  class GenreCheck extends React.Component {
    constructor(props) {
      super(props);
      this.state = { Action: false, Comedy: false, Horror: false };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    getGenres() {
      return Object.keys(this.state).filter((key) => {
        return ["Action", "Comedy", "Horror"].includes(key) && this.state[key];
      });
    }
  
    handleChange(event) {
      const value = event.target.value;
      this.setState((state) => ({
        [value]: !state[value]
      }));
    }
  
    handleSubmit(event) {
      alert("Genres: " + this.getGenres());
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          Genres:
          <div>
            <label>
              Action
              <input
                type="checkbox"
                value="Action"
                checked={this.state.Action}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Comedy
              <input
                type="checkbox"
                value="Comedy"
                checked={this.state.Comedy}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Horror
              <input
                type="checkbox"
                value="Horror"
                checked={this.state.Horror}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>

      )
      }}


      export default Genre