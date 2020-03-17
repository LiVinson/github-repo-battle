import React from "react"
import PropType from "prop-types"

export default class Results extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        Results
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    )
  }
}

Results.propType = {
  playerOne: PropType.string.isRequired,
  playerTwo: PropType.string.isRequired
}
