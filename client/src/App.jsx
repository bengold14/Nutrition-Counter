import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import uuid from "uuid";

import Styled from "styled-components";

import Search from "./search.jsx";
import ListResult from "./listResult.jsx";
import FoodResult from "./featuredResult.jsx";
import TotalNutrition from "./totalNutrition.jsx";
import PreviouslyEaten from "./previouslyEaten.jsx";

const server = process.env.server || "http://127.0.0.1:3000/"; // change to deployed location or local host

const GridContainer = Styled.div`
background: rgb(229, 245, 250, 0.7);
border-radius: 6px;
grid-area: ${props => props.gridArea};
height: auto;
width: auto;
padding: 2vh;
`;

const HeaderTitle = Styled.div`  
font-size: 36pt;
margin-left: 25%;
width: 50%;
margin-right: 25%;
margin-bottom: 2%;
height: 50%;
color: white;
text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
font-weight: bold;`;

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
      food: {},
      uuid: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.updateNutrition = this.updateNutrition.bind(this);
    this.updateFood = this.updateFood.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentWillMount() {
    this.updateNutrition();
    this.setState({ uuid: uuid.v1() });
  }

  onSubmit(searchTerm) {
    axios
      .get(`${server}search`, {
        params: { searchTerm: searchTerm, uuid: this.state.uuid }
      })
      .then(({ data }) => {
        if (data.errors) console.log("search error", data.errors);
        else {
          this.setState({
            itemList: data
          });
        }
      })
      .catch(err => console.log("error getting food results from usda", err));
  }

  updateNutrition() {
    axios
      .get(`${server}nutrition/`, { params: { uuid: this.state.uuid } })
      .then(({ data }) => {
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
        params: { ndbno: ndbno, uuid: this.state.uuid }
      })
      .then(({ data }) => {
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
            <HeaderTitle>Nutrition Profile</HeaderTitle>
            <Search submitData={this.onSubmit} uuid={this.state.uuid} />
          </div>
          <GridContainer gridArea={"main"}>
            {this.state.results ? (
              <ListResult
                itemList={this.state.itemList}
                updateFood={this.updateFood}
                uuid={this.state.uuid}
              />
            ) : (
              <FoodResult
                food={this.state.food}
                updateNutrition={this.updateNutrition}
                reset={this.reset}
                uuid={this.state.uuid}
              />
            )}
          </GridContainer>
          <GridContainer gridArea={"sidebar"}>
            <TotalNutrition
              nutrition={this.state.currentNutrition}
              uuid={this.state.uuid}
            />
          </GridContainer>
          <GridContainer gridArea={"footer"}>
            <PreviouslyEaten
              nutrition={this.state.currentNutrition}
              updateFood={this.updateFood}
              uuid={this.state.uuid}
            />
          </GridContainer>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
