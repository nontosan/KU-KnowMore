import { User_Sch } from '../interfaces/user';
import { useImage } from 'react-image';


async function fetchProfileSpecific(userid:string): Promise<User_Sch[]> {
    const res = await fetch(`http://188.166.178.33:3000/users/${userid}`);
    const userInfo = await res.json();
    //console.log(userInfo);
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

async function EditPro(editProfile: User_Sch,userid:string): Promise<User_Sch|null> {
    await fetch(`http://188.166.178.33:3000/users/${userid}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editProfile)
    });
    return editProfile;
}


export default {
    fetchProfileSpecific, CreateProfile, EditPro
};