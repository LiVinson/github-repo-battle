import React from "react"

//HOC: Takes in component. Returns a class component that renders the argument component, passing in the hovering state and any other props withHover received

export default class Hover extends React.Component {
  state = {
    hovering: false
  }

  mouseOver = () => this.setState({ hovering: true })

  mouseOut = () => this.setState({ hovering: false })

  render() {
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.children(this.state.hovering)}
      </div>
    )
  }
}
