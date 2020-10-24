
import {Report} from "../interfaces/report"

async function createReport(Report:any,blogId:string): Promise<Report|null> {
    const res = await fetch(`http://188.166.178.33:3000/reports/${blogId}`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Report),
    });
    const savedReport:Report = await res.json();
    if (savedReport !== undefined) {
        return savedReport;
    } else{
        return null;
    }
}

export default {createReport}