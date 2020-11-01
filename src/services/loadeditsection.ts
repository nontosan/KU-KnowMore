import { Section_Edit } from "../interfaces/SectionEdit"

export async function fetchsection():Promise<Section_Edit[]>{
    const res = await fetch("https://backend.ku-knowmore.xyz/blogs/")
    const section = await res.json()
    return section
} 
export default {fetchsection}