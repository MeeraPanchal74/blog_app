import { useReducer } from "react";

function reducer(currState,action){
    if(action==='increase'){
       return {count:currState.count+1};
    }
    else if(action==='decrease'){
        return {count:currState.count-1};
    }
    else return {currState}
}
function Demo(){
    const [state, dispatcher]= useReducer(reducer,{count:0});
   function incrementor(){
        dispatcher('increase');
    }

    function decrementor(){
            dispatcher('decrease');
    }
    return(
        <>
        <button onClick={decrementor}>-</button>
        <span>{state.count}</span>
        <button onClick={incrementor}>+</button>
        </>
    )
}

export default Demo;