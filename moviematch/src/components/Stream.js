import React from 'react';

  
  class StreamForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { Amazon: false, Hulu: false, Netflix: false };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    getServices() {
      return Object.keys(this.state).filter((key) => {
        return ["Amazon", "Hulu", "Netflix"].includes(key) && this.state[key];
      });
    }
  
    handleChange(event) {
      const value = event.target.value;
      this.setState((state) => ({
        [value]: !state[value]
      }));
    }
  
    handleSubmit(event) {
      alert("Streaming Services: " + this.getServices());
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          Streaming Services:
          <div>
            <label>
              Amazon Prime
              <input
                type="checkbox"
                value="Amazon"
                checked={this.state.Amazon}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Hulu
              <input
                type="checkbox"
                value="Hulu"
                checked={this.state.Hulu}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Netflix
              <input
                type="checkbox"
                value="Netflix"
                checked={this.state.Netflix}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>

      )
      }}


      export default StreamForm