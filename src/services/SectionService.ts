import { Section } from '../interfaces'

async function createSection(writeSection: Section): Promise<Section|null> {
    const res = await fetch(`http://localhost:3000/blog`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(writeSection),
    });
    const savedWriteSection: Section = await res.json();
    if (savedWriteSection.id !== undefined) {
        return savedWriteSection;
    } else{
        return null;
    }
}

async function fetchSections(blogid:string): Promise<Section[]> {
    const res = await fetch(`http://188.166.178.33:3000/blogs/${blogid}/sections`);
    const Arraysections = await res.json();
    return Arraysections;  
}

export default {
    createSection, fetchSections,
};