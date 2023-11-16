import React from 'react'
import ReactDOM from 'react-dom'
import Form from '../components/form/Form'

const div = (
    <div>
        <Form onSubmit={datas => {
            console.log(datas);
        }}>
            <div>
                账号： <Form.Input name="loginId" />
            </div>
            <div>
                密码： <Form.Input name="loginPwd" type="password"/>
            </div>
            <div>
                <Form.Button>提交</Form.Button>
            </div>
        </Form>
    </div>
)

ReactDOM.render(div, document.getElementById('root'))
