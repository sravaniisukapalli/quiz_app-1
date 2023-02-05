import { useEffect,useState } from "react";
import { useDispatch} from "react-redux";
// import data, {answers}from "../database/data.js";
import {getServerData} from "../helper/helper";
import * as Action from '../redux/question_reducer'
import { useParams } from "react-router-dom";
export const useFetchQuestion=()=>{

    const dispatch =useDispatch();
    const[getData, setGetData]=useState({isLoading:false,apiData:[],serverError:null});
    const {questionId} = useParams();

   
    useEffect(()=>{
    setGetData(prev=>({...prev,isLoading:true}));
    (async()=>{
       try{
        // let question=  await data.filter(item => item.categoryid == questionId);
        const [{ questions, answers, categories }] = await getServerData(`http://localhost:8080/api/questions`, (data) => data)
        let questionsByCategory=   questions.filter(item => item.categoryid == questionId);
        if(questionsByCategory.length>0){
            setGetData(prev=>({...prev, isLoading:false}));
            setGetData(prev=>({...prev, apiData:{questionsByCategory,answers,categories}}));
            dispatch(Action.startExamAction({question: questionsByCategory,answers}))
        }
          else{
            throw new Error("No Question Available");
        }
       } catch(error){
        setGetData(prev=>({...prev,isLoading:false}));
        setGetData(prev=>({...prev, serverError:error}));
       }
    })();
},[dispatch]);
return[getData, setGetData];
}

export const MoveNextQuestion=()=>async(dispatch)=>{
    try{
          dispatch(Action.moveNextAction());
    }catch(error){
        console.log(error)
    }
}
export const MovePrevQuestion=()=>async(dispatch)=>{
    try{
          dispatch(Action.movePrevAction());
    }catch(error){
        console.log(error)
    }
}

