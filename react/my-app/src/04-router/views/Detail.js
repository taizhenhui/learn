import React, { useEffect } from "react"
import { useHistory } from "react-router-dom";

export default function Detail(props) {
  console.log(props.match.params);
  const history = useHistory()

  useEffect(() => {
    
    return () => {
    }
  }, [])

  return (
    <div>
      Detail -- {props.match.params.id}
      <button onClick={() => history.goBack()}>返回</button>
    </div>
  )
}