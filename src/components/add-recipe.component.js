import React, { Component } from "react";
import RecipeDataService from "../services/recipe.service";

export default class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.newRecipe = this.newRecipe.bind(this);

    this.state = {
      id: null,
      name: "",
      displayname: "", 
      published: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDisplayName(e) {
    this.setState({
      displayname: e.target.value
    });
  }

  saveRecipe() {
    var data = {
      name: this.state.name,
      displayname: this.state.displayname
    };

    RecipeDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          displayname: response.data.displayname,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newRecipe() {
    this.setState({
      id: null,
      name: "",
      displayname: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newRecipe}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="displayname">Display Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="displayname"
                  required
                  value={this.state.displayname}
                  onChange={this.onChangeDisplayName}
                  name="displayname"
                />
              </div>
  
              <button onClick={this.saveRecipe} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}