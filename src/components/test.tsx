import React, {useState} from 'react';
import { Course } from './interfaces';
type NewCourseFromProps = {
    onNewCourseCreated?: (newCourse: Course) => void,
};

const NewCourseFrom = (props: NewCourseFromProps) => {
    const [newCourseNumber, setNewCourseNumber] = useState<string>('');
    const [newCourseTitle, setNewCourseTitle] = useState<string>('');
    
    const handleNewCourseNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCourseNumber(e.target.value);
    };
      
    const handleSave = () => {
        const newCourse = {
            number: newCourseNumber,
            title: newCourseTitle,
        };

        fetch("http://localhost:3000/courses",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCourse),
        })
        .then(res => res.json())
        .then(savedNewCourse => {
            if (savedNewCourse.id !== undefined) {
                if (props.onNewCourseCreated !== undefined) {
                    props.onNewCourseCreated(savedNewCourse);
                }
            } else {
                alert("Save error");
            }
        });
    };
    
    return (
        <div>
            Number: <input value={newCourseNumber} onChange={handleNewCourseNumberChange}/><br />
            Title: <input value={newCourseTitle} onChange={(e) => {setNewCourseTitle(e.target.value);}}/> <br />
            <button onClick={handleSave}>Save</button>
        </div>
    )
};

export default NewCourseFrom;