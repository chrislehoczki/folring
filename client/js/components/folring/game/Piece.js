import React from "react"

// The component
export default class Piece extends React.Component {

  handleClick(e) {
    this.props.handleClick(this.props.index)
  }

  render() {
    let className
    switch (this.props.status) {
      case 0:
        className = "piece empty"
      break;
      case 10:
        className = "piece white"
      break;
      case 11:
        className = "piece white selected"
      break;
      case 20:
        className = "piece black"
      break;
      case 21:
        className = "piece black selected"
      break;
    }

    let idName = "p"+this.props.index
    return (
      <div id={idName} className={className} onClick={this.handleClick.bind(this)}></div>
    )
  }

}
