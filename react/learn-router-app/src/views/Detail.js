import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function Detail() {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location.state,params,'params');
  const goBack =() => {
    navigate(-1)
  }
  return (
    <>
      <div>Detail -- </div>
      <button onClick={()=>goBack()}>返回</button>
    </>
  )
}

export default Detail