


export default function Login(props) {
  const login = () => {
    localStorage.setItem('token','123')
    setTimeout(()=>{
      props.history.push('/center')
    },1000)
  }
  return (
    <div>
      <button onClick={()=>login()}>登录</button>
    </div>
  )
}