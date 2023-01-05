import React from "react"
import { useHistory } from "react-router-dom";

export default function Detail2(props) {
  const history = useHistory()
  // const location = useLocation()
  console.log(props.location,history);
  return (
    <div>
      {/* Detail -- {location.state.id} */}
      Detail -- {props.location.query.id}
      Detail -- {props.location.query.name}
      <button onClick={() => history.goBack()}>返回</button>
    </div>
  )
}