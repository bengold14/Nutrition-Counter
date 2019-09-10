import React from "react";
import axios from "axios";
const server = process.env.server || "http://18.221.229.238:3000/"; //update to localhost or deployed instance

class FoodResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      added: false
    };
    this.addFood = this.addFood.bind(this);
    this.reset = this.reset.bind(this);
  }

  addFood(e) {
    axios
      .post(`${server}nutrition`, {
        ndbno: JSON.stringify(e.target.id),
        uuid: this.props.uuid
      })
      .then(() => {
        this.props.updateNutrition();
        this.setState({
          added: true
        });
      })
      .catch(err => {
        if (err) console.log("error posting to the database ", err);
      });
  }

  reset() {
    this.props.reset();
  }

  render() {
    return (
      <div className="featured-container">
        <div className="featured-title">Food</div>
        <div className="featured-box">
          <span className="featured-name">
            {this.props.food.desc.name
              .split(" ")
              .splice(0, 4)
              .join(" ")}
            }
          </span>
          <span className="featured-manu">
            {" "}
            Made by: {this.props.food.desc.manu}
          </span>
          <div className="featured-nutrient-box">
            {this.props.food.nutrients.map((nutrient, index) => {
              return (
                <div className="featured-nutrient" key={index}>
                  <span className="featured-nutrient-name">
                    {nutrient.name}
                  </span>
                  <span className="featured-nutrient-value">
                    {nutrient.value}
                  </span>
                  <span className="featured-nutrient-unit">
                    {nutrient.unit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <span className="featured-back-button-container">
          <button onClick={this.reset} className="featured-back-button">
            Back
          </button>
        </span>
        <span className="featured-add-button-container">
          {this.state.added ? (
            "successfully added!"
          ) : (
            <button
              className="featured-add-button"
              onClick={this.addFood}
              id={this.props.food.desc.ndbno}
            >
              Add Food!
            </button>
          )}
        </span>
      </div>
    );
  }
}

export default FoodResult;
