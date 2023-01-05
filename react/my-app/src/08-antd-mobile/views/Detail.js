import React, { useEffect } from "react"
import { useHistory } from "react-router-dom";
import { hide, show } from "../redux/actionCreator/TabbarActionCreator";
import { connect } from 'react-redux'
function Detail(props) {
  const history = useHistory()
  let { hide, show, match: { params: { id } } } = props
  useEffect(() => {
    console.log(id);
    hide()
    return () => {
      show()
    }
  }, [id, hide, show])

  return (
    <div>
      Detail -- {id}
      <button onClick={() => history.goBack()}>返回</button>
    </div>
  )
}

// connect('将来给孩子传的属性','将来给孩子传的方法')
const mapDispatchToProps = {
  show,
  hide
}
export default connect(null, mapDispatchToProps)(Detail)