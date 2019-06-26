import React from "react";

class ListResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.updateFood(e.target.id);
  }

  render() {
    return (
      <div className="list-container">
        <div className="list-title">Results</div>
        <div className="list-box">
          {this.props.itemList.list.item.map((item, index) => {
            return (
              <div
                className="list"
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
