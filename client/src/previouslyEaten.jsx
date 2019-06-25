import React from "react";

class PreviouslyEaten extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageEnd: 2,
      pageStart: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    //not rerendering when new props received
    if (this.props.nutrition.previousItems) {
      this.setState({
        pageEnd: JSON.parse(this.props.nutrition.previousItems).length
      });
    }
  }

  handleClick(e) {
    if (Number(e.target.id) + this.state.pageStart >= 0) {
      let increment = Number(e.target.id);
      this.setState((state, props) => {
        return {
          pageEnd: state.pageEnd + increment,
          pageStart: state.pageStart + increment
        };
      });
    }
  }

  render() {
    return (
      <div className="previously-eaten-container">
        <div className="footer-title">PreviouslyEaten</div>
        {this.props.nutrition.previousItems && (
          <div className="previously-eaten-items">
            <button
              className="entries-button"
              id={-2}
              onClick={this.handleClick}
            >
              forward ({this.state.pageStart})
            </button>
            {JSON.parse(this.props.nutrition.previousItems).map(
              (food, index) => {
                return (
                  index <= this.state.pageEnd &&
                  index >= this.state.pageStart && (
                    <span className="food-container" key={index}>
                      <div className="number">{index}</div>
                      <div className="food">
                        {food
                          .split(" ")
                          .slice(0, 3)
                          .join(" ")}
                        ...
                      </div>
                    </span>
                  )
                );
              }
            )}
            <button
              className="entries-button"
              id={2}
              onClick={this.handleClick}
            >
              back ({this.state.pageEnd})
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default PreviouslyEaten;
