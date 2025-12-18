
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



function Login() {
const navigate=useNavigate();

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [erorr,setErorr]=useState("")


  const loginHandle=async(e)=>{
   e.preventDefault();
   setErorr("");

   try{
      const response= await axios.get("http://localhost:5000/users");
  
  const user=  response.data;

  const userfound= user.find(
   (user)=> user.email === email && user.password === password 
    
  );

  if(userfound){
   alert('login successful');
  localStorage.setItem("userId",userfound.id)
  
   navigate('/')

}else{
   setErorr("Invalid email or password")
}}

catch(err){
   console.error(err);
   setErorr('server erorr')

}
  
   
  }
  return (
    <div>
<form  onSubmit={loginHandle} className='form'>
    <h4 style={{textAlign:'center'}}>Login To Your Account</h4>
    
    <small style={{textAlign:'center'}}>Enter your credentials to access your account</small>

    <br/><br/>
      
    <small>EMAIL</small> 
   <input 
   type='email'
   placeholder=' ENTER YOUR EMAIL'
   value={email}
   onChange={(e)=>{
setEmail(e.target.value)}}
required
   

   />

 <br/>

   <small> PASSWORD</small>
 <input 
   type='password'
   placeholder=' ENTER YOUR PASSWORD'
   value={password}
   onChange={(e)=>setPassword(e.target.value)}
      required


   />

   <p style={{color:"red"}}>{erorr}</p>

<button  type='submit'>
LOGIN
</button>
<br/>
   <small   style={{textAlign:'center'}}>Don't have a account ? <a href='/register'><i>Register here</i></a></small>
   
   <h6 style={{textAlign:'center'}}>5G STORE </h6>
</form>
    </div>
  )
}

export default Login