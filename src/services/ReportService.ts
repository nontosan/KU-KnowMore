
import {Report} from "../interfaces/report"

async function createReport(Report:any,blogId:string): Promise<string> {
    console.log(Report)
    const res = await fetch(`https://backend.ku-knowmore.xyz/Blogs/${blogId}/reports`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.accessToken}`,
        },
        body: JSON.stringify(Report),
    });
    return "ok"
    /*
    const savedReport:Report = await res.json();
    if (savedReport !== undefined) {
        return savedReport;
    } else{
        return null;
    }
    */
}

export default {createReport}