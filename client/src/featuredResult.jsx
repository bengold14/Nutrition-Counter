import React from "react";
import axios from "axios";
const server = process.env.server || "http://localhost:3000/";

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
      .post(`${server}nutrition`, { ndbno: JSON.stringify(e.target.id) })
      .then(() => {
        console.log("posted successfully to database");
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
        {this.state.added ? (
          "successfully added!"
        ) : (
          <div className="featured-box">
            <span className="featured-name">
              {this.props.food.desc.name
                .split(" ")
                .splice(0, 2)
                .join(" ")}
              }
            </span>
            <span className="featured-manu">{this.props.food.desc.manu}</span>
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
            <button onClick={this.addFood} id={this.props.food.desc.ndbno}>
              Add Food!
            </button>
          </div>
        )}
        <button onClick={this.reset}>Back</button>
      </div>
    );
  }
}

export default FoodResult;
