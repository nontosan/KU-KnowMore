import { Reports_data } from "../interfaces/reports"

export async function fetchreport():Promise<Reports_data[]>{
    const res = await fetch("http://188.166.178.33:3000/reports/")
    const report = await res.json()
    console.log(report);
    return report
} 
export default {fetchreport}