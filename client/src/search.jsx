import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "Enter Food"
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  onSubmit() {
    this.props.submitData(this.state.searchTerm);
  }

  render() {
    return (
      <div className="search-container">
        <input className="search-bar" onChange={this.onChange} />
        <button className="search-submit" onClick={this.onSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default Search;
