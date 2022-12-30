import { useEffect, useState } from "react"
import store from "../redux/store"
export default function Cinemas() {
  const [cityName, setCityName] = useState('')
  useEffect(() => {
    let {cityName} = store.getState()
    setCityName(cityName)
  }, [])
  return (
    <div>Cinemas--{cityName}</div>
  )
}