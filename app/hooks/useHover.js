import React from "react"

//replaces HOC or Render Props
export default function useHover() {
  const [hovering, setHovering] = React.useState(false)

  const mouseOver = () => setHovering(true)
  const mouseOut = () => setHovering(false)

  const attrs = {
    onMouseOver: mouseOver,
    onMouseOut: mouseOut,
  }

  //Info and Functionality {} that consuming components needs to have: Current hover status and ability to change hover status
  return [hovering, attrs]
}
