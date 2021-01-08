
import React, { useContext, useState } from "react"
import PropTypes from "prop-types"
import Svg, { G, Path }  from "react-native-svg"

import { MapContext } from "./MapProvider"

const Marker = ({
  coordinates,
  children,
  onPressIn,
  onPressOut,
  style = {},
  className = "",
  ...restProps
}) => {
  const { projection } = useContext(MapContext)
  const [isPressed, setPressed] = useState(false)
  const [isFocused, setFocus] = useState(false)

  const [x, y] = projection(coordinates)

  function handleMouseEnter(evt) {
    setFocus(true)
    if (onPressIn) onPressIn(evt, coordinates)
  }

  function handleMouseLeave(evt) {
    setFocus(false)
    if (isPressed) setPressed(false)
    if (onPressOut) onPressOut(evt, coordinates)
  }

  return (
    <G
      transform={`translate(${x}, ${y})`}
      className={`rsm-marker ${className}`}
      onPressIn={handleMouseEnter}
      onPressOut={handleMouseLeave}
      style={style[isPressed || isFocused ? (isPressed ? "pressed" : "hover") : "default"]}
      {...restProps}
    >
      {children}
    </G>
  )
}

Marker.propTypes = {
  coordinates: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
}

export default Marker
