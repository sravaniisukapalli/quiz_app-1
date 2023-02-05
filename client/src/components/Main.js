import '../styles/Main.css';
import React,{ useEffect, useRef, useState} from 'react'
import { TextField,MenuItem, Button} from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { setUserId } from '../redux/result_reducer';

 import { useNavigate } from 'react-router-dom';
// import Categories from "../components/Categories";
import { getServerData } from '../helper/helper';
export default function Main(){
  
   const [categories, setCategories ] = useState([]);

  useEffect(()=> {

    async function fetchData() {
      const [{categories }] = await getServerData(`http://localhost:8080/api/questions`, (data) => data);
      setCategories(categories);
    }

    fetchData();

  },[])

  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

    // const [category, setCategory] = useState("");
    const inputRef = useRef(null)
    const dispatch=useDispatch()
    function startQuiz(){
      navigate(`last/${selectedCategory}`)
        if(inputRef.current?.value){
            dispatch(setUserId(inputRef.current?.value))
            // dispatch(setSelectedCategory);
        }
    }
return( 
    <div className='container'>
       <h1 className='pos'>WELCOME</h1>
        <div className='txt'>
      <TextField inputRef={inputRef}
      inputProps={{style: {fontSize: 18}}}
      InputLabelProps={{style: {fontSize: 11 }}}
            style={{ marginTop: -250,marginLeft:10}}
            label="Enter Username" 
            variant="outlined" 
            required />    
           
           
             
    

<div className='start'>
<select value={selectedCategory} onChange={handleChange}>
      <option value="">Select Category</option>
      {categories?.map((item) => (
        <option key={item.categoryid} value={item.categoryid}>
          {item.category}
        </option>
      ))}
    </select>
    <Button className='btn' onClick={startQuiz}>Start Quiz</Button>
</div>
 </div>  
</div>
)
}


