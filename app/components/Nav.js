import React from "react"
import ThemeContext from "../contexts/theme"
import { NavLink } from "react-router-dom"
import Tooltip from "./Tooltip"

const activeStyle = {
  color: "rgb(187, 46, 31)",
}

export default function Nav({ toggleTheme }) {
  const theme = React.useContext(ThemeContext)

  return (
    <nav className="row space-between">
      <ul className="row nav">
        <li>
          <NavLink to="/" className="nav-link" activeStyle={activeStyle} exact>
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to="/battle" className="nav-link" activeStyle={activeStyle}>
            Battle
          </NavLink>
        </li>
      </ul>

      <button
        style={{ fontSize: 30 }}
        className="btn-clear"
        onClick={() => toggleTheme}
      >
        <span>
          {theme === "light" ? (
            <Tooltip text="Select to change color theme to dark">🌙</Tooltip>
          ) : (
            <Tooltip text="Select to change color theme to light">🌞</Tooltip>
          )}
        </span>
      </button>
    </nav>
  )
}
