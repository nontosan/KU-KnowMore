import React, { useState , useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginService from "../services/LoginService"

import {
  Link, Redirect,
} from 'react-router-dom';
import { resolve } from 'dns';




const Portal=()=> {
    //functional get code then sending code to backend
    /*
    const code= window.location.search.split("=")[1]
    LoginService.portal(code).then(res=>{
        //window.location.replace(res)
    })
    */
    return (
        <div className="">
            portal

            <div>fuck</div>



            hello
        </div>  
    );
}
export default Portal;