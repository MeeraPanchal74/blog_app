
import './PostList.css';
const Posts =(props) =>{
  
    
return(
   
    <div className='indPost' >
        {/* <h1>{props.id}</h1> */}
        <h1>{props.title}</h1>
        <h2>{props.data}</h2>
        <h4>{props.date}</h4>
        <button >Delete </button>
    </div>
   

)
}

export default  Posts;