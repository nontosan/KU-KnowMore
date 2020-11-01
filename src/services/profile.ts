import { User_Sch} from "../interfaces/user";

async function CreateProfile(newProfile: User_Sch): Promise<User_Sch|null> {
    const res = await fetch(`https://backend.ku-knowmore.xyz/users`,{
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
    CreateProfile
};