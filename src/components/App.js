import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//import Recipe from './Recipe';
//import Navigation from './Navigation';

import AddRecipe from "./add-recipe.component";
import Recipe from "./recipe.component";
import RecipesList from "./recipe-list.component";

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.selectNewRecipe = this.selectNewRecipe.bind(this);
//     this.state = {
//       recipes: [
//         {
//           title: 'Bagel',
//           ingredients: [
//             '1 Bagel',
//             'Cream cheese'
//           ],
//           steps: [
//             'Slice bagel in half',
//             'Spread on cream cheese',
//             'Enjoy!'
//           ],
//           id: 'bagel'
//         },
//         {
//           title: 'Pizza',
//           ingredients: [
//             '1 Pizza Crust',
//             '1 Jar of Pizza Sauce',
//             '3 oz Part-Skim Mozerella Cheese'
//           ],
//           steps: [
//             'Put sauce on crust',
//             'Sprinkle mozarella cheese over sauce',
//             'Bake at 350 degrees for 20 minutes'
//           ],
//           id: 'pizza'
//         },
//       ],
//       selectedRecipe: null
//     }
//   }

//   selectNewRecipe(recipeId) {
//     if(recipeId) {
//       this.setState({
//         ...this.state,
//         selectedRecipe: recipeId
//       });
//     }
//   }
  
//   render() {
//     let recipeToSelect;
//     if(this.state.selectedRecipe) { 
//       const filteredRecipes = this.state.recipes.filter((recipe) => recipe.id === this.state.selectedRecipe);  
//       if(filteredRecipes.length > 0) { 
//         recipeToSelect = filteredRecipes[0];
//       }
//     }
//     return (
//       <div className="App">
//         <aside className='sidebar'>
//           <h1 className='sidebar__title'>Recipe Book</h1>
//           <Navigation 
//             recipes={this.state.recipes}
//             activeRecipe={this.state.selectedRecipe}
//             recipeToSelect={this.selectNewRecipe}
//           />
//         </aside>
//         {
//           recipeToSelect ? 
//             <Recipe
//             ingredients={recipeToSelect.ingredients}
//             steps={recipeToSelect.steps}
//             title={recipeToSelect.title}
//             />
//             :
//             null
//         }
//       </div>
//     );
//   }

//   componentDidMount() {
//     const recipeToShow = this.state.recipes[0].id || null;
//     this.setState({
//       ...this.state,
//       selectedRecipe: recipeToShow
//     });
//   }
// }

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/recipes" className="navbar-brand">
              CHW Recipe Viewer
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/recipes"} className="nav-link">
                  Recipes
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/recipes"]} component={RecipesList} />
              <Route exact path="/add" component={AddRecipe} />
              <Route path="/recipes/:id" component={Recipe} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;