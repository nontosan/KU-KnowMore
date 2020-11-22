import { User_Sch } from '../interfaces/user';
import {hours} from "../interfaces/hours"
import { useImage } from 'react-image';


async function fetchProfileSpecific(userid:string): Promise<User_Sch[]> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/users/${userid}`);
    const userInfo = await res.json();
    //console.log(userInfo);
    return userInfo;
}

async function CreateProfile(newProfile: User_Sch): Promise<User_Sch|null> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/users`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.accessToken}`,
        },
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
    await fetch(`https://backend.ku-knowmore.xyz/users/${userid}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.accessToken}`,
        },
        body: JSON.stringify(editProfile)
    });
    return editProfile;
}
async function fetchActivityHour(userId:any): Promise<hours>{
    const res = await fetch(`https://backend.ku-knowmore.xyz/users/${userId}/hours`);
    const hours = await res.json();
    console.log(hours)
    return hours;  

}

export default {
    fetchProfileSpecific, CreateProfile, EditPro,fetchActivityHour
};