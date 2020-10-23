import { User_Sch } from '../interfaces/user';


async function fetchProfileSpecific(userid:string): Promise<User_Sch[]> {
    const res = await fetch(`http://188.166.178.33:3000/users/${userid}`);
    const userInfo = await res.json();
    return userInfo;
}

async function CreateProfile(newProfile: User_Sch): Promise<User_Sch|null> {
    const res = await fetch(`http://188.166.178.33:3000/users`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newProfile),
    });
    const savedNewProfile: User_Sch = await res.json();
    if (savedNewProfile !== undefined) {
        return savedNewProfile;
    } else{
        return null;
    }
}

export default {
    fetchProfileSpecific, CreateProfile
};