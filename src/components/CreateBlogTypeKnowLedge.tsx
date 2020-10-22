// IMPORT LIBRARY //
import React, { useState , useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import {
  Link, Redirect,
} from 'react-router-dom';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import Input_Nameblog from './createblog_component/input_nameblog';
import Input_Idclass from './createblog_component/input_idclass';
import Input_Nameclass from './createblog_component/input_nameclass';
import Input_Nameteacher from './createblog_component/input_nameteacher';
import Confirm from './createblog_component/confirm';
import './createblog_component/input.css';
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import BlogsService from '../services/BlogsService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Blog, } from '../interfaces/blog';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import 'bootstrap/dist/css/bootstrap.min.css';
// END OF IMPORT CSS //

//------------------------------------------------------------------//

const CreateKlBlog=()=> {
  const [Nameblog, setNameblog]=useState("");
  const [Nameteacher, setNameteacher]=useState("");
  const [IDclass, setIDclass]=useState("");
  const [Nameclass, setNameclass]=useState("");
  const [UrlLink, setUrl]=useState<string>("");
  const [afterSave, setafterSave] = useState<boolean>(false);

  const handleNewBlogSave = () => {
    const newBlog: Blog = {
      course_id: IDclass,
      user_id: "5f82fd5504eb8600aa617b6b",
      type: "knowledge",
      blog_name: Nameblog,
    };
    BlogsService.createBlog(newBlog) 
      .then(savedNewBlog => {
        if (savedNewBlog !== null) {
          console.log(savedNewBlog);
          setUrl(savedNewBlog.id!)
        } else{
          alert("Save Error");
        }
      });
    console.log(UrlLink)
  };

  useEffect(() => {
    if (UrlLink !== ""){
      console.log(UrlLink);
      setafterSave(!afterSave);
    }
  },[UrlLink]);

  return (
    <div className="bg_color">
      <div>Create Knowledge Blog</div>
      <div className="Blog_Info">
        <Input_Nameblog setNameblog={setNameblog} />
        <Input_Idclass setIDclass={setIDclass} />
        <Input_Nameclass setNameclass={setNameclass} />
        <Input_Nameteacher setNameteacher={setNameteacher} />
        <div className="Confirm"> 
          <div className="Cancel">
            <Button variant="danger"> Cancel </Button>
          </div>
          <div className="Submit">
            <Button variant="success" onClick={handleNewBlogSave}> Submit </Button>
            {afterSave &&
              <div>
                <Redirect to={`myKnowledge/${UrlLink}`} />
              </div>
            }
          </div> 
        </div>
      </div>
    </div>

  );
}
export default CreateKlBlog;