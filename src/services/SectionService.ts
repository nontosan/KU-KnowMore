import { Section } from '../interfaces'

async function createSection(blogid:string,writeSection: any): Promise<Section|null> {
    const res = await fetch(`http://188.166.178.33:3000/blogs/${blogid}/sections`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(writeSection),
    });
    const savedWriteSection: Section = await res.json();
    if (savedWriteSection.id !== undefined) {
        console.log(savedWriteSection)
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

async function fetchSectionsSpecific(sectionid:string): Promise<Section[]> {
    const res = await fetch(`http://188.166.178.33:3000/sections/${sectionid}`);
    const sectioninfo = await res.json();
    return sectioninfo;
}
async function deleteSection(sectionId:string): Promise<string> {
    const res = await fetch(`http://188.166.178.33:3000/sections/${sectionId}`,{
        method: 'DELETE',
    });
    const sections = await res.json();
    return sections;  
}

export default {
    createSection, fetchSections, fetchSectionsSpecific,deleteSection
};