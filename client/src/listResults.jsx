import React from "react";
import axios from "axios";
const server = process.env.server || "http://localhost:3000/";

class ListResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    axios
      .post(`${server}nutrition`, { ndbno: JSON.stringify(e.target.id) })
      .then(() => {
        console.log("posted successfully to database");
        this.props.updateNutrition();
      })
      .catch(err => {
        if (err) console.log("error posting to the database ", err);
      });
  }

  render() {
    return (
      <div className="results-container">
        <div className="results-title">Results</div>
        <div className="results-box">
          {this.props.itemList.list.item.map((item, index) => {
            return (
              <div
                className="result"
                onClick={this.onClick}
                key={index}
                id={item.ndbno}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ListResults;
