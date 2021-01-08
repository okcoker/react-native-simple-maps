
import React, { useState, memo } from "react"
import PropTypes from "prop-types"
import Svg, { G, Path }  from "react-native-svg"

const Geography = ({
  geography,
  onPressIn,
  onPressOut,
  style = {},
  className = "",
  ...restProps
}) => {
  const [isPressed, setPressed] = useState(false)
  const [isFocused, setFocus] = useState(false)

  function handleMouseEnter(evt) {
    setFocus(true)
    if (onPressIn) onPressIn(evt, geography)
  }

  function handleMouseLeave(evt) {
    setFocus(false)
    if (isPressed) setPressed(false)
    if (onPressOut) onPressOut(evt, geography)
  }

  return (
    <Path
      tabIndex="0"
      className={`rsm-geography ${className}`}
      d={geography.svgPath}
      onPressIn={handleMouseEnter}
      onPressOut={handleMouseLeave}
      style={style[isPressed || isFocused ? (isPressed ? "pressed" : "hover") : "default"]}
      {...restProps}
    />
  )
}

Geography.propTypes = {
  geography: PropTypes.object,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
}

export default memo(Geography)
