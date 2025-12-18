import React, { useState } from 'react'
import './css/Register.css'
import{useNavigate} from 'react-router-dom'




function Register() {
 const navigate= useNavigate();
 
 
 const [data,setData] = useState({
   name:"",
   email:"",
   password:""

 })





const [erorr,setErorr]=useState({})


 const handlechange =(e)=>{
  
setData({
   ...data,
   [e.target.name]:e.target.value
})
};

const validation=()=>{

   let newError={};

   if(data.name.length <3 ){
      newError.name="name is required";
   }
   else if (!/^[A-Za-z\s]+$/.test(data.name)) {
  newError.name = "Name must be letters";
}

   if(!/^[^\s@]+@gmail\.com$/.test(data.email)){
      newError.email="Email is not valid"
   }

   if(data.password.length<6){
      newError.password="Password must be at least 6 characters"
   }
   setErorr(newError);
   return Object.keys(newError).length ===0;

   };

   const handleSumbit= async(e)=>{
    e.preventDefault();

    if (validation()){
   
      try{
         const response = await fetch('http://localhost:5000/users',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
         })
         const result = await response.json();
         console.log(result);

            alert("Registration Successful ")
      navigate('/login')
         
      }
   catch(error){
   console.error('Error:',error)
   }

   
    }
   }

  return (
    <div>

<div>

<form onSubmit={handleSumbit} className='form'>


    <h1 style={{textAlign:'center'}}>Create Account</h1>
    <br/>
       <small>Name</small>
       
       <input 
   type='text'
   name='name'
   placeholder='Enter your name'
      required
      onChange={handlechange}
   />
   <p className='erorr'>{erorr.name}</p>
 <br/>

  <small>Email</small>
   <input 
   type='email'
   name='email'
   placeholder='Enter your email'
      required
       onChange={handlechange}
   />
   <p className='erorr'>{erorr.email}</p>

 <br/>


   <small>Password</small>
   <input 
   type='password'
   name='password'
   placeholder='Enter your password'
      required
       onChange={handlechange}
     
     />
     <p className='erorr'>{erorr.password}</p>
<button  type='submit'>
<h5>Register</h5>
</button>
<br/>
<p style={{textAlign:"center"}}>Already have an account?<a href='/Login'><i> Login here</i></a></p>
</form>



</div>
   


    </div>
  )
}

export default Register