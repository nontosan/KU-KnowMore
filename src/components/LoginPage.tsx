import React, { useState , useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../components/createblog_component/input.css';
import Button from 'react-bootstrap/Button';

import {
  Link, Redirect,
} from 'react-router-dom';
import {Formik,Form,Field,ErrorMessage} from "formik";
import { Login } from "../interfaces/Login";
import LoginService from "../services/LoginService";

type LoginFormProps = {
    loginCallback?: () => void,
};

const LoginPage=(props:LoginFormProps)=> {
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const history = useHistory();
    return (
        <div>
            <Formik
                initialValues={{IdAccount:'aaaaaaaa', Password:'test'}}
                onSubmit={(values,actions)=>{
                    const userLogin : Login = {
                        username: 'aaaaaaaa',
                        password: 'test',
                    }
                    LoginService.UserLogin(userLogin)
                        .then(Token => {
                            if (!Token) {
                                setLoginErrorMessage('Wrong username of password');
                            } else {
                                setLoginErrorMessage('HELLO BRO');
                                if (props.loginCallback){
                                    props.loginCallback();
                                }
                                history.push('/');
                            }
                            actions.setSubmitting(false);
                        });
                }}
            >
                {({isSubmitting})=>(
                    <Form>
                        { loginErrorMessage && (
                            <div>{ loginErrorMessage }</div>
                        )}
                        <div className="Blog_frame1">
                            <div className="Blog_name">
                                ID
                            </div>
                            <div className="Blog_name2">
                                <Field type="input" name="IdAccount"/>
                            </div>
                        </div>
                        <div className="Blog_frame1">
                            <div className="Blog_name">
                                Password
                            </div>
                            <div className="Blog_name2">
                                <Field type="password" name="Password"/>
                            </div>
                        </div>
                        <button className="Blog_name" disabled={isSubmitting}> Log In </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
export default LoginPage;