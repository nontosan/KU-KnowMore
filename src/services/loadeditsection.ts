import { Section_Edit } from "../interfaces/section_edit"

export async function fetchsection():Promise<Section_Edit[]>{
    const res = await fetch("http://188.166.178.33:3000/blogs/")
    const section = await res.json()
    return section
} 
export default {fetchsection}