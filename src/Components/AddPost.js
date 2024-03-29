import { useState} from "react";
import { useNavigate} from "react-router-dom";
import { Paper } from "@mui/material";
import "./AddPost.css";

 const AddPost =(props)=> {

  const [pTitle, setPTitle]= useState(null);
  const [pData, setPData] = useState(null);
  const navigate = useNavigate();


  const handleTitle=(e)=>{
    setPTitle(e.target.value);
  }

  const handleData=(e)=>{
     setPData(e.target.value);

  }
  const handleSubmit=()=>{
     if(pTitle==null ){ alert("please add post title");
    
    return ;

  }
  
  props.createPost(pTitle,pData);
  navigate('/PostList'); 
  }
  return (
    <>
    <Paper
    style={{display:"flex" , flexDirection:"column", alignItems:"center", padding:"2px" ,alignSelf:"center"}}>
      
      <input type='text' placeholder=" title of your post" onChange={handleTitle} id='title' />
      <textarea onChange={handleData} id='postData' />
      
      <button onClick={handleSubmit} id='btn'> Submit</button>
      
      </Paper>
    </>
  );
}

export default AddPost;