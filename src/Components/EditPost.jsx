import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import "./AddPost.css";

const EditPost = (props) => {

  const [pTitle, setPTitle] = useState(props.user.title);
  const [pData, setPData] = useState(props.user.data);
  const navigate = useNavigate();


  const handleTitle = (e) => {

    setPTitle(e.target.value);
  }

  const handleData = (e) => {

    setPData(e.target.value);

  }
  const handleSubmit = () => {
    props.editPost(pTitle, pData);
    navigate('/PostList');
  }
  return (
    <>
      <Paper
        style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2px", alignSelf: "center" }}>

        <input type='text' placeholder=" title of your post" onChange={handleTitle} id='title' defaultValue={props.user.title} />
        <textarea onChange={handleData} id='postData' defaultValue={props.user.data} />

        <button onClick={handleSubmit} id='btn'> Submit</button>

      </Paper>
    </>
  );
}

export default EditPost;