import React, { useEffect } from "react"
import { useHistory } from "react-router-dom";
import store from '../redux/store'
export default function Detail(props) {
  console.log(props.match.params);
  const history = useHistory()

  useEffect(() => {
    store.dispatch({
      type:'hide-tabber'
    })
    return () => {
      store.dispatch({
        type:'show-tabber'
      })
    }
  }, [])

  return (
    <div>
      Detail -- {props.match.params.id}
      <button onClick={() => history.goBack()}>返回</button>
    </div>
  )
}