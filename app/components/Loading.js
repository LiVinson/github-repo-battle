import React from "react"
import PropTypes from "prop-types"

const styles = {
  content: {
    fontSize: "35px",
    position: "absolite",
    left: 0,
    right: 0,
    marginTop: "20px",
    textAlign: "center",
  },
}

export default function Loading({ text, speed }) {
  const [content, setContent] = React.useState(text)
  const id = React.useRef(null)

  React.useEffect(() => {
    id.current = window.setInterval(() => {
      //While content is not = 'Loading...', append another '.' ever 300ms. Once three dots, reset back to 'Loading'
      content === text + "..." ? setContent(text) : setContent((c) => c + ".")
    }, speed)

    return () => {
      window.clearInterval(id.current)
    }
  }, [])

  return <p style={styles.content}>{content}</p>
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
}

Loading.defaultProps = {
  text: "Loading",
  speed: 300,
}
