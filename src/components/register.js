import React, { Component } from 'react';
import DB from '../libs/db';
import ExerciseFields from './exercise_fields';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      titleField: null,
      exerciseComponents: [],
      exerciseFields: []
    };
  }

  _onFormSubmit(e) {
    e.preventDefault();

    const db = new DB();
    db.createSchema();

    db.insert({
      title: this.state.titleField,
      exercises: this.state.exerciseFields
    });
  }

  _onInputChange(e) {
    this.setState({
      titleField: e.target.value
    });
  }

  _removeExercise(i) {
    this.setState({
      exerciseComponents: this.state.exerciseComponents.splice(i, 1)
    });
  }

  _updateExerciseFields(fieldId, params) {
    let fields = this.state.exerciseFields;
    const index = fields.map((x) => { return Object.keys(x)[0]; })
                        .indexOf(fieldId);

    if (index >= 0) {
      fields[index][fieldId] = params;
    } else {
      fields.push({ [fieldId]: params });
    }

    return fields;
  }

  _onExerciseInputChange(fieldId, params) {
    const fields = this._updateExerciseFields(fieldId, params);

    this.setState({
      exerciseFields: fields
    });
  }

  _onButtonAddExercise() {
    let exerciseComponents = this.state.exerciseComponents;
    const id = exerciseComponents.length;
    const props = {
      index: id,
      onButtonRemoveExercise: this._removeExercise.bind(this),
      onInputChange: this._onExerciseInputChange.bind(this)
    }

    exerciseComponents.push(
      <ExerciseFields key={ id } {...props} />
    )

    this.setState({
      exerciseComponents: exerciseComponents
    });
  }

  _renderExerciseList() {
    return this.state.exerciseComponents.map((fields) => {
      return fields;
    });
  }

  render() {
    return (
      <div>
        <h1>Register a new training</h1>

          <form onSubmit={this._onFormSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="title" value={this.state.titleField}>Title</label>
              <input className="form-control" id="title" onChange={this._onInputChange.bind(this)} />
            </div>

            { this._renderExerciseList() }

            <button type="button" className="btn btn-success" onClick={this._onButtonAddExercise.bind(this)}>
              Add Exercise
            </button>
            <input type="submit" className="btn btn-primary" value="Register it!" />
          </form>
      </div>
    )
  }
};

export default Register;
