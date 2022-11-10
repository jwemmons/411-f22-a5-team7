import React,{ Component } from 'react'

class Form extends Component{
constructor(props){
	super(props)
	this.state = { genre:'',length:'', services:''}
	this.handleChange = this.handleChange.bind(this)
	this.handleSubmit = this.handleSubmit.bind(this)
}

// Form submitting logic, prevent default page refresh
handleSubmit(event){
	const { genre, length, services} = this.state
	event.preventDefault()
	alert(`
	Movie Preferences\n
	Genre : ${genre}
	Length : ${length}
	Services : ${services}
	`)
}

// Method causes to store all the values of the
// input field in react state single method handle
// input changes of all the input field using ES6
// javascript feature computed property names
handleChange(event){
	this.setState({
	// Computed property names
	// keys of the objects are computed dynamically
	[event.target.name] : event.target.value
	})
}

// Return a controlled form i.e. values of the
// input field not stored in DOM values are exist
// in react component itself as state
render(){
	return(
	<form onSubmit={this.handleSubmit}>
		<div>
		<label htmlFor='genre'>Genre:      </label>
		<input
			name='genre'
			placeholder='Genre'
			value = {this.state.genre}
			onChange={this.handleChange}
		/>
		</div>
		<div>
		<label htmlFor='length'>Length:      </label>
		<input
			name='length'
			placeholder='Length'
			value={this.state.length}
			onChange={this.handleChange}
		/>
		</div>
		<div>
		<label htmlFor='services'>Streaming Services:      </label>
		<input
			name='services'
			placeholder='Services'
			value={this.state.services}
			onChange={this.handleChange}
		/>
		</div>
		<div>
		<button>Find a movie!</button>
		</div>
	</form>
	)
}
}

export default Form
