
import React, { Fragment, memo, useMemo, useContext } from "react"
import PropTypes from "prop-types"
import { Defs, Path, ClipPath }  from "react-native-svg"

import { MapContext } from "./MapProvider"

const Sphere = ({
  id = "rsm-sphere",
  fill = "transparent",
  stroke = "currentcolor",
  strokeWidth = 0.5,
  className = "",
  ...restProps
}) => {
  const { path } = useContext(MapContext)
  const spherePath = useMemo(() => path({ type: "Sphere" }), [path])
  return (
    <Fragment>
      <Defs>
        <ClipPath id={id}>
          <Path d={spherePath} />
        </ClipPath>
      </Defs>
      <Path
        d={spherePath}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        style={{ pointerEvents: "none" }}
        className={`rsm-sphere ${className}`}
        {...restProps}
      />
    </Fragment>
  )
}

Sphere.propTypes = {
  id: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string,
}

export default memo(Sphere)
