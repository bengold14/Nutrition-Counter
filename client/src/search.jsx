import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "Search food database"
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clear = this.clear.bind(this);
  }

  onChange(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  onSubmit() {
    this.props.submitData(this.state.searchTerm);
  }

  clear() {
    this.setState({
      searchTerm: ""
    });
  }

  render() {
    return (
      <div className="search-container">
        <input
          className="search-bar"
          onClick={this.clear}
          onChange={this.onChange}
          value={this.state.searchTerm}
        />
        <button className="search-submit" onClick={this.onSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default Search;
