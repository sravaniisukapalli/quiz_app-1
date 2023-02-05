import '../styles/App.css';
import { createBrowserRouter, RouterProvider}from 'react-router-dom';
import Main from './Main';
import Last from './Last';
import Result from './Result';
import { CheckUserExist } from '../helper/helper';
/**react routes */
const router=createBrowserRouter([
{
  path:'/',
  element: <Main></Main>
},
{
  path:'/last/:questionId',
  element:  <CheckUserExist><Last /></CheckUserExist> 
},
{
  path:'/result',
  element:<CheckUserExist><Result /></CheckUserExist> 
},

])

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
