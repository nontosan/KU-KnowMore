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
import "./login.css"


type LoginFormProps = {
    loginCallback?: () => void,
};

const LoginPage=(props:LoginFormProps)=> {
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const history = useHistory();
    return (
        <div className="">
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
                         <div className="session">
                            <div className="left">

                            </div>
                            <form className="form" action="" > 
                            <h4>We are <span>NUVA</span></h4>
                            <p>Welcome back! Log in to your account to view today's clients:</p>
                            <div className="floating-label">
                                <Field type="input" name="IdAccount" id="email" className="input_hell" placeholder="nontri id"/>
                            </div>
                            <div className="floating-label">
                                <Field type="password" name="Password"  id="password" className="input_hell" placeholder="Password"/>
                            </div>
                            <button className="button_hell" disabled={isSubmitting}> Log In </button>
                            </form>
                        </div>
                    </Form>
                )}
            </Formik>
            
            <button >
                <a href="https://sso-dev.ku.ac.th/idp/apps/authz?response_type=code&scope=user_info&client_id=38d38f02785c632dc6df02461443b84a936&redirect_uri=http://localhost:3000/portal">redirect to login page</a>
            </button>
        </div>
    );
}
export default LoginPage;

            /*
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
                         <div className="session">
                            <div className="left">

                            </div>
                            <form className="form" action="" > 
                            <h4>We are <span>NUVA</span></h4>
                            <p>Welcome back! Log in to your account to view today's clients:</p>
                            <div className="floating-label">
                                <Field type="input" name="IdAccount" id="email" className="input_hell" placeholder="nontri id"/>
                            </div>
                            <div className="floating-label">
                                <Field type="password" name="Password"  id="password" className="input_hell" placeholder="Password"/>
                            </div>
                            <button className="button_hell" disabled={isSubmitting}> Log In </button>
                            </form>
                        </div>
                    </Form>
                )}
            </Formik>
            */