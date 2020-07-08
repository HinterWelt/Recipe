import React, { Component } from "react";
import RecipeDataService from "../services/recipe.service";
import { Link } from "react-router-dom";

export default class RecipesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveRecipe = this.retrieveRecipes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRecipe = this.setActiveRecipe.bind(this);
    this.removeAllRecipes = this.removeAllRecipes.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      Recipes: [],
      currentRecipe: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveRecipes();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveRecipes() {
    RecipeDataService.getAll()
      .then(response => {
        this.setState({
          Recipes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveRecipes();
    this.setState({
      currentRecipe: null,
      currentIndex: -1
    });
  }

  setActiveRecipe(Recipe, index) {
    this.setState({
      currentRecipe: Recipe,
      currentIndex: index
    });
  }

  removeAllRecipes() {
    RecipeDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    RecipeDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          Recipes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, Recipes, currentRecipe, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Recipes List</h4>

          <ul className="list-group">
            {Recipes &&
              Recipes.map((Recipe, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveRecipe(Recipe, index)}
                  key={index}
                >
                  {Recipe.Name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllRecipes}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentRecipe ? (
            <div>
              <h4>Recipe</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentRecipe.Name}
              </div>
              <div>
                <label>
                  <strong>Display Name:</strong>
                </label>{" "}
                {currentRecipe.DisplayName}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentRecipe.isActive ? "Active" : "Inactive"}
              </div>
              <div>
                <label>
                  <strong>Is Prep?:</strong>
                </label>{" "}
                {currentRecipe.isPrep ? "Yes" : "No"}
              </div>

              <Link
                to={"/recipes/" + currentRecipe.RecipeID}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Recipe...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}