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

export default function Loading({ text = "Loading", speed = 300 }) {
  const [content, setContent] = React.useState(text)
  React.useEffect(() => {
    const id = window.setInterval(() => {
      //While content is not = 'Loading...', append another '.' ever 300ms. Once three dots, reset back to 'Loading'
      setContent((content) => (content === text + "..." ? text : content + "."))
    }, speed)

    return () => {
      window.clearInterval(id)
    }
  }, [content, text])

  return <p style={styles.content}>{content}</p>
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
}
