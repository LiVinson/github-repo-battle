import React from "react"
import ReactDom from "react-dom"
import Popular from "./components/Popular"
import "./index.css"
import Battle from "./components/Battle"
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Popular />
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById("app"))
