import React, { useEffect } from "react"
import { useHistory } from "react-router-dom";
import { hide, show } from "../redux/actionCreator/TabbarActionCreator";
import store from '../redux/store'
export default function Detail(props) {
  const history = useHistory()
  useEffect(() => {
    store.dispatch(hide())
    return () => {
      store.dispatch(show())
    }
  }, [])

  return (
    <div>
      Detail -- {props.match.params.id}
      <button onClick={() => history.goBack()}>返回</button>
    </div>
  )
}