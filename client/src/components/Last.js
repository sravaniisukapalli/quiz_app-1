import React, { useState } from 'react'
import "../styles/Last.css";
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import Questions from './Questions';
import {useSelector , useDispatch} from 'react-redux'
import { pushAnswer } from '../hooks/setResult';
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
 function Last(){
    const [check,setChecked]=useState(undefined)
    const result =useSelector(state=>state.result.result);
    const {queue,trace}=useSelector(state=>state.questions);
    const dispatch=useDispatch()
 
    function onPrevious(){

      if(trace>0){
                dispatch(MovePrevQuestion());
      }
    }
    function onNext(){
        console.log('On Next click ')
        if(trace<queue.length){
        dispatch(MoveNextQuestion());
        
        if(result.length<=trace){
          const id = queue[trace].id
          dispatch(pushAnswer({[id]: check}))
        }
   }
   setChecked(undefined)
            }
    function onChecked(check) {
            console.log(check)
            setChecked(check)
          }
          if(result.length && result.length>=queue.length){
           return<Navigate to={'/result'}replace="true"></Navigate>
          }
return(
    <div className='first'>
      
 
        <div className='good'>
        < Questions onChecked={onChecked}></Questions>
    
 {trace > 0 ?<button className='rev' onClick={onPrevious}>Prev</button>:<div></div>}
 <button className='nex' onClick={onNext}>Next</button>
 
</div>
<div >
 <Link className='qbtn' to={'/'} >Quit</Link>
        </div>

</div>
)
}
export default Last;