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

export default {
    createSection,
};