import { Section_Edit } from "../interfaces/SectionEdit"

export async function fetchsection():Promise<Section_Edit[]>{
    const res = await fetch("server path get all section")
    const section = await res.json()
    return section
} 
export default {fetchsection}