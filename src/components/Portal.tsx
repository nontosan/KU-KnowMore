import React, { useState , useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginService from "../services/LoginService"

import {
  Link, Redirect,
} from 'react-router-dom';
import { resolve } from 'dns';
import { getTokenSourceMapRange } from 'typescript';


type LoginFormProps = {
    loginCallback?: () => void,
};

const Portal=(props:LoginFormProps)=> {
    //functional get code then sending code to backend
    /*
    const code= window.location.search.split("=")[1]
    LoginService.portal(code).then(res=>{
        //window.location.replace(res)
    })
    */
    const [loginErrorMessage, setLoginErrorMessage] = useState('');

    const history = useHistory();

    const code = window.location.search.split("=")[1]

    const getToken = () => {
        const Code = {
            code: code,
        };
        console.log(Code);
        LoginService.portal(Code)
            .then(Token => {
                console.log(Token);
                if (!Token) {
                    setLoginErrorMessage('Wrong username of password');
                } else {
                    setLoginErrorMessage('HELLO BRO');
                    if (props.loginCallback){
                        props.loginCallback();
                    }
                    history.push('/');
                }
            })
    }


    useEffect(()=>{
        getToken();
    },[])
    return (
        <div className="">
        </div>  
    );
}
export default Portal;