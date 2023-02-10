 import React,{useEffect,useState} from 'react'
 import "../styles/Questions.css";
 import { useDispatch, useSelector } from 'react-redux';
 import { useFetchQuestion } from '../hooks/FetchQuestion';
 import { updateResult } from '../hooks/setResult';
 export default function Questions({onChecked}){
  const [checked, setChecked]=useState(undefined)
  const {trace}=useSelector(state=>state.questions);
  const result=useSelector(state=>state.result.result);
  const[{ isLoading, apiData, serverError}]=useFetchQuestion()
     useSelector(state=>console.log(state));
    const  questions =useSelector(state=> state.questions && state.questions?.queue && state.questions?.queue[state.questions.trace])
    const dispatch=useDispatch()
    useEffect(()=>{
       //  console.log({trace,checked})
     dispatch(updateResult({trace,checked,id: questions?.id}))
    },[checked])
    function onSelect(i){ 
         onChecked(i)
         setChecked(i)
         dispatch(updateResult({trace,checked,id: questions?.id}))
  }
     if(isLoading)return<h3 className='h1'>isLoading</h3>
     if(serverError) return <h3 className='h1'>{serverError ||"unknown Error"}</h3>
    return(
        <div className='rob'>
        <div  className="questions"> 
      <h2 className='ques'>{questions?.question}</h2> 
        <ul key={questions?.id}>
           {
              questions?.options.map((q,i)=>(
                <li className="opt" key={i}>
                <input
                type="radio"
                value={false}
                name="options"
                id={`q${i}-option`}
                onChange={()=>onSelect(i)}/>
            <label  htmlFor={`q${i}-option`}>{q}</label>
               <div className={`check ${result[trace] && result[trace][questions?.id]==i ? 'checked':''}`}>
               </div>
               </li>
))}  
             </ul>
      </div>
      </div>  
     
    )
}