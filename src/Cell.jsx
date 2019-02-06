import React from 'react';

class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
      this.props.setMark([this.props.row, this.props.col]);
  }

  render() {
      let sign = '';
      if (this.props.mark === 1) {
          sign = 'X'
      }
      if (this.props.mark === -1) {
        sign = 'O'
    }
    return (
      <button className="cell" onClick={this.handleClick}>
        {sign}
      </button>
    );
  }
}

export default Cell;