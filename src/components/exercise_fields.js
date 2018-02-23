import React, { Component } from 'react';

class ExerciseFields extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: null,
      repetition: null,
      weight: null
    };
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  onInputChange(e) {
    const splitted = e.target.id;
    const key = splitted.split('_')[1];

    this.setState({
      [key]: e.target.value
    });

    const fieldId = splitted.split('_')[2];
    this.props.onInputChange(fieldId, this.state);
  }

  render() {
    return (
      <div className="row form-group">
        <div className="col">
          <label htmlFor={`exercise_name_${this.props.index}`}>Name</label>
          <input type="text" className="form-control"
           ref={ (input) => this.nameInput = input } id={`exercise_name_${this.props.index}`}
           onChange={this.onInputChange.bind(this)} />
        </div>
        <div className="col">
          <label htmlFor={`exercise_repetition_${this.props.id}`}>Repetition</label>
          <input type="text" className="form-control" id={`exercise_repetition_${this.props.index}`}
          onChange={this.onInputChange.bind(this)} />
        </div>
        <div className="col">
          <label htmlFor={`exercise_weight_${this.props.id}`}>Weight</label>
          <input type="text" className="form-control" id={`exercise_weight_${this.props.index}`}
          onChange={this.onInputChange.bind(this)} />
        </div>
        <div className="col">
          <button type="button" className="btn btn-danger"
           onClick={ () => this.props.onButtonRemoveExercise(this.props.index) }>
            Remove
          </button>
        </div>
      </div>
    )
  }
};

export default ExerciseFields;