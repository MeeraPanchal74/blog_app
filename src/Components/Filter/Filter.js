
const Filter=(props)=>{

    function  onFilterF(event){
        // console.log(props);
      props.onFilterA(event.target.value);

    }
return(
 

    <div>
         <select name="isAvailable" onChange={onFilterF} >
            <option value="all">All</option>
            <option value="past">Before 2022</option>
            <option value="current"> 2022 </option>
            <option value="future">After 2022</option>
         </select>
    </div>
)
}
export default Filter;