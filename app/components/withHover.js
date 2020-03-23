import React from "react"

//HOC: Takes in component. Returns a class component that renders the argument component, passing in the hovering state and any other props withHover received
export default function withHover(Component, propName = "hovering") {
  return class WithHover extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        hovering: false
      }

      this.mouseOver = this.mouseOver.bind(this)
      this.mouseOut = this.mouseOut.bind(this)
    }

    mouseOver() {
      this.setState({
        hovering: true
      })
    }

    mouseOut() {
      this.setState({
        hovering: false
      })
    }

    render() {
      //Allows for control over the property name, in case hovering was already being passed to Component
      const props = {
        [propName]: this.state.hovering,
        ...this.props
      }
      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component {...this.props} />
        </div>
      )
    }
  }
}
