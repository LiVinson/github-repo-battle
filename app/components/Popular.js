import React from "react"
import PropTypes from "prop-types"
import { fetchPopularRepos } from "../utils/api"
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa"
import Loading from "./Loading"
import Card from "./Card"
import Tooltip from "./Tooltip"

//Takes in language user selected and a function to call when a new language is selected.
function LanguagesNav({ selectedLanguage, updateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"]
  return (
    <ul className="flex-center">
      {languages.map((language, index) => (
        <li key={index}>
          <button
            className="btn-clear nav-link"
            style={
              language === selectedLanguage ? { color: "rgb(187,46,31)" } : null
            }
            onClick={() => updateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
}

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues,
        } = repo
        const { login, avatar_url } = owner

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className="card-list">
                <li>
                  <Tooltip text="Github Username">
                    <FaUser color="rgb(255, 191, 116)" size={22} />
                    <a href={`htps://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color="rgb(255, 215, 0)" size={22} />
                  {stargazers_count.toLocaleString()}
                </li>
                <li>
                  <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                  {open_issues.toLocaleString()} open issues
                </li>
              </ul>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

function popularReducer(state, action) {
  if ((action.type = "success")) {
    return {
      //Takes current repos object, and copies over the property for the selected language w/ new data
      ...state,
      error: null,
      [action.language]: action.repos,
    }
  } else if (action.type === "error") {
    return {
      ...state,
      error: "There was an error  fetching repos",
    }
  } else {
    throw new Error("An unknown error occured. Please try again")
  }
}

export default function Popular() {
  const [language, setLanguage] = React.useState("All")
  const [state, dispatch] = React.useReducer(popularReducer, { error: null })

  const fetchedLanguages = React.useRef([])

  React.useEffect(() => {
    //Checks if data for language fetch is already cached to state
    if (!fetchedLanguages.current.includes(language)) {
      fetchPopularRepos(language)
        .then((repos) => {
          //Since reference to fetchedLanguages does not change, will not cause rerender
          fetchedLanguages.current.push(language)
          dispatch({
            type: "success",
            language,
            repos,
          })
        })
        .catch((error) => {
          console.warn("Error fetching repos: ", error)
          dispatch({ type: "error" })
        })
    }
  }, [language, fetchedLanguages])

  const isLoading = () => {
    return !state[language] && state.error === null
  }

  return (
    <React.Fragment>
      <LanguagesNav selectedLanguage={language} updateLanguage={setLanguage} />
      {isLoading() && <Loading text="Fetching Repos" />}
      {state.error && <p className="center-text error">{state.error}</p>}
      {state[language] && <ReposGrid repos={state[language]} />}
    </React.Fragment>
  )
}
