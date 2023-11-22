import React from 'react'
import loginInfo from './loginInfo'
import qs from 'query-string'

export default function Login(props) {
    return (
        <div>
            <h1>登录页</h1>
            <button onClick={() => {
                loginInfo.login()
                // const query = qs.parse(props.location.search)
                // if(query.returnurl){
                //     props.history.push(query.returnurl)
                // }else{
                //     props.history.push('/')
                // }

                 if(props.location.state){
                    props.history.push(props.location.state)
                }else{
                    props.history.push('/')
                }
            }}>登录</button>
        </div>
    )
}
