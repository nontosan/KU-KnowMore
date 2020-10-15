import { User_Sch } from '../interfaces/user';


async function fetchProfileSpecific(userid:string): Promise<User_Sch[]> {
    const res = await fetch(`http://188.166.178.33:3000/users/${userid}`);
    const userInfo = await res.json();
    return userInfo;
}

export default {
    fetchProfileSpecific
};