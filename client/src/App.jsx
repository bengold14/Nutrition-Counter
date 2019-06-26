import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Search from "./search.jsx";
import ListResult from "./listResult.jsx";
import FoodResult from "./featuredResult.jsx";
import TotalNutrition from "./totalNutrition.jsx";
import PreviouslyEaten from "./previouslyEaten.jsx";
const server = process.env.server || "http://localhost:3000/"; // change to deployed location or local host

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: {
        list: {
          item: [{ name: "blank" }]
        }
      },
      currentNutrition: [],
      results: true,
      food: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.updateNutrition = this.updateNutrition.bind(this);
    this.updateFood = this.updateFood.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentWillMount() {
    this.updateNutrition();
  }

  onSubmit(searchTerm) {
    axios
      .get(`${server}search`, {
        params: { searchTerm: searchTerm }
      })
      .then(({ data }) => {
        console.log("got food list from usda", data.list.item[0].name);
        this.setState({
          itemList: data
        });
      })
      .catch(err => {
        if (err) console.log("error getting food results from usda", err);
      });
  }

  updateNutrition() {
    axios
      .get(`${server}nutrition/`)
      .then(({ data }) => {
        console.log("got nutrition data back from server");
        this.setState({
          currentNutrition: data
        });
      })
      .catch(err => {
        if (err) console.log("error getting nutrition data back from server");
      });
  }

  updateFood(ndbno) {
    axios
      .get(`${server}food/`, {
        params: { ndbno: ndbno }
      })
      .then(({ data }) => {
        console.log("got food data back from server", data);
        this.setState({
          food: data,
          results: false
        });
      })
      .catch(err => {
        if (err) console.log("error getting food data back from server");
      });
  }

  reset() {
    this.setState({
      itemList: {
        list: {
          item: [{ name: "blank" }]
        }
      },
      results: true,
      food: {}
    });
  }

  render() {
    return (
      <div className="page">
        <div className="profile-container">
          <div className="header">
            <div className="header-title">Nutrition Profile</div>
            <Search submitData={this.onSubmit} />
          </div>
          <div className="main">
            {this.state.results ? (
              <ListResult
                itemList={this.state.itemList}
                updateFood={this.updateFood}
              />
            ) : (
              <FoodResult
                food={this.state.food}
                updateNutrition={this.updateNutrition}
                reset={this.reset}
              />
            )}
          </div>
          <div className="sidebar">
            <TotalNutrition nutrition={this.state.currentNutrition} />
          </div>
          <div className="footer">
            <PreviouslyEaten
              nutrition={this.state.currentNutrition}
              updateFood={this.updateFood}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
