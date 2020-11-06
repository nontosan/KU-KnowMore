import { Login } from "../interfaces/Login";
import jwt_decode from "jwt-decode";

async function UserLogin(userLogin: Login): Promise<any|null> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/auth/login`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userLogin),
    });
    const Token = await res.json();
    console.log(Token)
    if (Token.access_token) {
        localStorage.setItem("accessToken", Token.access_token);
        localStorage.setItem("userId", Token.userid);
        console.log("hello");
        return Token;
    } else{
        console.log("wrong username or password");
        return null;
    }
}

function KULogout(): void {
    window.open('https://sso-dev.ku.ac.th/idp/apps/auth/signout', '_blank');
    setTimeout (window.close, 100);
}

function UserLogout(): void {
    if (isUserLoggedIn ()) {
        //localStorage.removeItem("accessTokeneiei");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userStatus")
    }
}

function isUserLoggedIn() {
    return localStorage.accessToken !== undefined;
}

function getUsername(): string|null {
    if ( isUserLoggedIn() ) {
        //const decode:any = jwt_decode(localStorage.accessToken);
        //console.log(decode);
        //console.log(decode.username);
        return localStorage.userId
    } else {
        return null;
    }
}

function getUserId(): string|null {
    if ( isUserLoggedIn() ) {
        console.log(localStorage.userId);
        return localStorage.userId
    } else {
        return null
    }
}
async function portal(Code:any): Promise<any|null>{
    //may be edit path
    //console.log(JSON.stringify(code))
    const res = await fetch(`https://backend.ku-knowmore.xyz/auth/token`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Code),
    });
    const Token = await res.json();
    console.log(Token);
    if (Token.access_token) {
        console.log(Token.access_token);
        console.log(Token.user_id);
        localStorage.setItem("accessToken", Token.access_token);
        localStorage.setItem("userId", Token.user_id);
        localStorage.setItem("userStatus", Token.user_status)
        return Token;
    } else{
        return null;
    }
    //if (Token.access_token) {
    //    localStorage.setItem("accessToken", Token.access_token);
    //    localStorage.setItem("userId", Token.userid);
    //    console.log("hello");
        //return path to main path
    //    return "https://backend.ku-knowmore.xyz/";
    //} else{
        //return path to login path
    //    console.log("wrong username or password");
    //    return "https://backend.ku-knowmore.xyz/login";
    //}
}
export default {
    UserLogin,isUserLoggedIn, getUsername, UserLogout, getUserId,portal, KULogout
};