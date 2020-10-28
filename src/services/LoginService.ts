import { Login } from "../interfaces/Login";
import jwt_decode from "jwt-decode";

async function UserLogin(userLogin: Login): Promise<any|null> {
    const res = await fetch(`http://188.166.178.33:3000/auth/login`,{
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

function UserLogout(): void {
    if (isUserLoggedIn ()) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
    }
}

function isUserLoggedIn() {
    return localStorage.accessToken !== undefined;
}

function getUsername(): string|null {
    if ( isUserLoggedIn() ) {
        const decode:any = jwt_decode(localStorage.accessToken);
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

export default {
    UserLogin, isUserLoggedIn, getUsername, UserLogout, getUserId,
};