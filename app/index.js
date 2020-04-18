import React from "react"
import ReactDom from "react-dom"
import "./index.css"
import { ThemeProvider } from "./contexts/theme"
import Nav from "./components/Nav"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Loading from "./components/Loading"

const Popular = React.lazy(() => import("./components/Popular"))
const Battle = React.lazy(() => import("./components/Battle"))
const Results = React.lazy(() => import("./components/Results"))

function App2() {
  //Track theme across renders.
  //Rerender when theme changes.
  //Have a function that modifies theme when called.
  //Pass theme and toggleTheme function to child component(s)
  const [theme, setTheme] = React.useState("light")
  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  )

  return (
    <Router>
      <ThemeProvider value={value}>
        <div className={theme}>
          <div className="container">
            <Nav />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" component={Popular} />
                <Route exact path="/battle" component={Battle} />
                <Route path="/battle/results" component={Results} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  )
}

class App extends React.Component {
  state = {
    theme: "light",
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === "light" ? "dark" : "light",
      }))
    },
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path="/" component={Popular} />
                  <Route exact path="/battle" component={Battle} />
                  <Route path="/battle/results" component={Results} />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

ReactDom.render(<App />, document.getElementById("app"))
