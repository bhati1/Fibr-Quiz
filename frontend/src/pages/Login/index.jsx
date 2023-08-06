import React from 'react'
import { Form, Input, message} from 'antd'
import { Link} from "react-router-dom";
import { loginUser } from "../../apicalls/users";

function Login() {
    const onFinish = async(values) => {
        try {
            const response = await loginUser(values);
            if(response.success){
                message.success(response.message)
                localStorage.setItem('token', response.data)
                window.location.href = '/'
            }
            else{
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }
return (
    <div className='flex justify-center items-center h-screen w-screen'>
        <div className='card w-400 p-3'>
            <div className='flex flex-col'>
                <h1 className='text-2xl'>FibrQuiz - Login </h1>
                <div className="divider"></div>
                <Form layout="vertical" className="mt-2 w-10" onFinish={onFinish}>
                    <Form.Item name="email"label="Email">
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item name="password"label="Password">
                        <Input type="password" />
                    </Form.Item>
                    <div className="flex flex-col gap-2">
                        <button
                        type="primary"
                        className="primary-contained-btn mt-2">Login</button>
                        <Link to="/register">Already a member? Register</Link>
                    </div>
                </Form>
            </div>

        </div>
        
    </div>
)
}

export default Login