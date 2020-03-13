import React from "react"
import PropTypes from "prop-types"
import { fetchPopularRepos } from "../utils/api"

function LanguagesNav({ selectedLanguage, onUpdateLanguage }) {
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
            onClick={() => onUpdateLanguage(language)}
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
  onUpdateLanguage: PropTypes.func.isRequired
}
export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: "All",
      repos: {},
      error: null
    }
    this.updateSelectedLanguage = this.updateSelectedLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  componentDidMount() {
    this.updateSelectedLanguage(this.state.selectedLanguage)
  }
  updateSelectedLanguage(language) {
    this.setState({
      selectedLanguage: language,
      error: null
    })

    //Checks if data for language fetch is already cached to state
    if (!this.state.repos[language]) {
      fetchPopularRepos(language)
        .then(data => {
          //Take existing repos object, and update the property for the selected language
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [language]: data
            }
          }))
        })
        .catch(() => {
          console.warn("Error fetching repos: ", error)
          this.setState({
            error: "There was an error fetching the repositories."
          })
        })
    }
  }

  isLoading() {
    const { repos, error, selectedLanguage } = this.state
    return !repos[selectedLanguage] && error === null
  }
  render() {
    const { selectedLanguage, repos, error } = this.state
    return (
      <React.Fragment>
        <LanguagesNav
          selectedLanguage={selectedLanguage}
          onUpdateLanguage={this.updateSelectedLanguage}
        />

        {this.isLoading() && <p>LOADING</p>}
        {error && <p>{error}</p>}
        {repos[selectedLanguage] && (
          <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>
        )}
      </React.Fragment>
    )
  }
}
