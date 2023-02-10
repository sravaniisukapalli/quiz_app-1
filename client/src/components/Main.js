import '../styles/Main.css';
import React,{ useEffect, useRef, useState} from 'react'
import { TextField,MenuItem, List } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { setUserId } from '../redux/result_reducer';
import { useNavigate } from 'react-router-dom';
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
    const inputRef = useRef(null)
    const dispatch=useDispatch()
    function startQuiz(){

        if(inputRef.current?.value && selectedCategory){
          navigate(`last/${selectedCategory}`)
            dispatch(setUserId(inputRef.current?.value))
            // dispatch(setSelectedCategory);
        }
    }
return( 
    <div className='container'>
       <h1 className='pos'>WELCOME</h1>
        <div>
      <TextField inputRef={inputRef}
      inputProps={{style: {fontSize: 18}}}
      InputLabelProps={{style: {fontSize: 11 }}}
            style={{ marginTop: -260,marginLeft:30,width:210}}
            label="Enter Username" 
            variant="outlined" 
            required /> </div> 
 <div>
<div className='start'>
<select value={selectedCategory} onChange={handleChange}
style={{
  width: '79%',  height: '45px', fontSize: '16px',padding: '8px', borderRadius: '5px',
  border: '1px solid gray', position: 'relative', bottom: '170px',left:'30px',
  backgroundColor: '#f7f8fa'
}}>
      <option value="">Select Category</option>
      {categories?.map((item) => (
        <option key={item.categoryid} value={item.categoryid} style={{ fontSize: '17px'}}>
          {item.category}
        </option>
      ))}
    </select>
    </div> 
    </div>
    <div><button  variant="contained" className='btn' onClick={startQuiz}>START QUIZ</button></div>
</div>
  

)
}


