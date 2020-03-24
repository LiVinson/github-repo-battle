import React from "react"
import ReactDom from "react-dom"
import Popular from "./components/Popular"
import "./index.css"
import Battle from "./components/Battle"
import { ThemeProvider } from "./contexts/theme"
import Nav from "./components/Nav"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: "light",
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === "light" ? "dark" : "light"
        }))
      }
    }
  }

  render() {
    return (
      <ThemeProvider value={this.state}>
        <div className={this.state.theme}>
          <div className="container">
            <Nav />
            <Popular />
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

ReactDom.render(<App />, document.getElementById("app"))
