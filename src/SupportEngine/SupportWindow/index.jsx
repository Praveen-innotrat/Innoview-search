import React from 'react'
import { styles } from '../style'

const SupportWindow = (props) => {
  return (
    <div
      style={{
            ...styles.supportWindow,
            ...{opacity : props.visible ? '1' : '0'}
      }}
    />
  )
}

export default SupportWindow
