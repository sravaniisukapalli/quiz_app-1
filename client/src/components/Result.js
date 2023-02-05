import React, { useEffect} from 'react'
import "../styles/Result.css";
import { Link } from 'react-router-dom'
import ResultTable from './ResultTable';
import { useDispatch,useSelector } from 'react-redux';
import { resetResultAction } from '../redux/result_reducer';
import { resetAllAction } from '../redux/question_reducer';
import { attempts_Number,earnPoints_Number,flagResult } from '../helper/helper';
import { usePublishResult } from '../hooks/setResult';


export default function Result(){
    const dispatch=useDispatch()
    const {questions:{queue,answers},result:{result,userId}}=useSelector(state=>state)
    useEffect(()=>{
        console.log(flag)
       return () => {
        dispatch(resetAllAction())
        dispatch(resetResultAction())
       }
    },[])
   const totalPoints=queue.length*1;
   const attempts=attempts_Number(result)
   const pointsEarned=earnPoints_Number(result,answers,1)
   const flag=flagResult(totalPoints,pointsEarned)
   
    /** store user result */
    usePublishResult({ 
        result, 
        username : userId,
        attempts,
        points: pointsEarned,
        achived : flag ? "Passed" : "Failed" });
    function onRetake() {
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }
return(
    <div className='container'>
        <h1 className='head'>RESULT</h1>
        <div className='flex-center'>
        <div className='flex'> 
        <span>Username:</span>
        <span className='bold'> {userId || ""}</span>
        </div>
        <div className='flex'> 
        <span>Total Quiz Points:</span>
        <span className='bold'>{totalPoints || 0}</span>
        </div>
        <div className='flex'> 
        <span>Total Questions:</span>
        <span className='bold'>{queue.length||0}</span>
        </div>
        <div className='flex'> 
        <span>Total Questions Attempted:</span>
        <span className='bold'>{attempts||0} </span>
        </div>
        <div className='flex'> 
        <span>Total Points Earned:</span>
        <span className='bold'>{pointsEarned||0} </span>
        </div>
        <div className='flex'> 
        <span>Final Result:</span>
        <span style={{color:`${flag ?"lime":"red"}`}} className='bold'>{flag ? " Passed":" Failed"}</span>
        </div>
        </div>
        <div >
            <Link className='rrev' to={'/'} onClick={onRetake}>RETAKE</Link>
        </div>
        <div className='container'>
            <ResultTable></ResultTable>
      </div>
      
</div> 
) 
}