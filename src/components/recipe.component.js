import React, { Component } from "react";
import RecipeDataService from "../services/recipe.service";

export default class Recipe extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getRecipe = this.getRecipe.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);

    this.state = {
      currentRecipe: {
        id: null,
        name: "",
        description: "",
        isActive: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getRecipe(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentRecipe: {
          ...prevState.currentRecipe,
          name: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentRecipe: {
        ...prevState.currentRecipe,
        description: description
      }
    }));
  }

  getRecipe(id) {
    RecipeDataService.get(id)
      .then(response => {
        this.setState({
          currentRecipe: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentRecipe.id,
      name: this.state.currentRecipe.name,
      description: this.state.currentRecipe.description,
      isActive: status
    };

    RecipeDataService.update(this.state.currentRecipe.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentRecipe: {
            ...prevState.currentRecipe,
            isActive: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateRecipe() {
    RecipeDataService.update(
      this.state.currentRecipe.id,
      this.state.currentRecipe
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Recipe was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteRecipe() {    
    RecipeDataService.delete(this.state.currentRecipe.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Recipes')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentRecipe } = this.state;

    return (
      <div>
        {currentRecipe ? (
          <div className="edit-form">
            <h4>Recipe</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentRecipe.Name}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentRecipe.DisplayName}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentRecipe.isActive ? "Active" : "Inactive"}
              </div>

              <div className="form-group">
                <label>
                  <strong>Last Revised:</strong>
                </label>
                {currentRecipe.RevisionDate}
              </div>
            </form>

            {currentRecipe.isActive ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteRecipe}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateRecipe}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Recipe...</p>
          </div>
        )}
      </div>
    );
  }
}