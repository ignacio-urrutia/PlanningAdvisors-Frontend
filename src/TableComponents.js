import React from 'react';

class Checkbox extends React.Component {
    constructor(props) {
      super(props);
      this.options = this.props.columns;
      this.state = {options: {}};
      if (this.props.optionLabels) {
        this.optionLabels = this.props.optionLabels;
      }
      else{
        this.optionLabels = {};
        for (let col of this.props.columns) {
          this.optionLabels[col] = col;
        }
      }
  
      for (var option of this.options){
        this.state.options[option] = false;
      }
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      const target = event.target;
      const value = target.checked;
      const name = target.name;
  
      // Creamos variable auxiliar que modificaremos y asignaremos al estado actual
      var aux_options = this.state.options;
      aux_options[name] = value;
  
      this.props.onColumnChange(aux_options);
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + 
      this.state.value);
      event.preventDefault();
    }
  
    render() {
      // const value = this.state.value;
      const listBox = this.options.map((option) => 
      <div key={option}>
        <label>
          <input key={option} type="checkbox" onChange={this.handleChange} name={option}/>
          {" "}
          {this.optionLabels[option]} 
        </label>
      </div>
      );
  
      return (
        <form onSubmit={this.handlleSubmit}>
            {listBox}
        </form>
      );
    }
  }
  
  class TextInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''}
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
  
      const value = this.state.value;
  
      event.preventDefault();
      this.props.onChange(value);
    }
  
    render() {
      return(
        <form onSubmit={this.handleSubmit}>
          <label>
            Stock name:
            <input type="text" value={this.state.value} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Calcular" />
        </form>
      )
    }
  
  }

export{Checkbox, TextInput}