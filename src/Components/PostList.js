
import './PostList.css';
import {Link } from 'react-router-dom';
import Filter from './Filter/Filter';
import { useNavigate } from 'react-router-dom';
import React from "react";

const PostList = (props)=>{

  const navigate = useNavigate();
  

  const postEditedInList=(item)=>{
    if (typeof props.postEdited === 'function') {
      props.postEdited(item);
      navigate("/EditPost");
    } else {
      console.error("props.postEdited is not a function");
    }

  }

  const postDeletedInList=(item)=>{
    props.postDeleted(item);

  }

  if(props.newList.length===0) return(
    <>
      <Filter onFilterA={props.onFilter}/>
           <button variant="primary" >
         <Link to='/AddPost'> Add post</Link>
      </button>

      <h3>No posts available</h3>
    </>
  )
    return(<>
           <Filter onFilterA={props.onFilter}/>
           <button variant="primary" >
         <Link to='/AddPost'> Add post </Link>
      </button>

      <div id='posts'>
       
      {props.newList.map((item) => {
        return(
          <div className='indPost' >
          <h1>{item.title}</h1>
          <h2>{item.data}</h2>
          <h4>{item.date}</h4>
          <button onClick={(()=>{postDeletedInList(item)})}>Delete </button>
          <button onClick={(()=>{postEditedInList(item)})}> Edit</button>
      </div>
        )
          } 
        )}
      </div>
    </>
  );
}

export default PostList;
