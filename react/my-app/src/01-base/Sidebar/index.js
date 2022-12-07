import React from 'react'

export default function Sidebar(props) {
  console.log(props);
  let { bg, width } = props
  return (
    <div style={{ background: bg, width: width }}>
      <ul>
        <li>-----</li>
        <li>-----</li>
        <li>-----</li>
        <li>-----</li>
        <li>-----</li>
        <li>-----</li>
        <li>-----</li>
        <li>-----</li>
        <li>-----</li>
        <li>-----</li>
      </ul>
    </div>
  )
}
// Sidebar.defaultProps
// Sidebar.propTypes