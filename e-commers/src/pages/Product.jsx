import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Card,Button,Row,Col, } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

function Product() {
  
  const navigate=useNavigate()


  const[product,setProduct]=useState([])

  const [category,setCategory]=useState("all")

  const [search,setSearch]=useState("")

  
const currentUser=localStorage.getItem('userId')
 
 
useEffect(()=>{
axios.get("http://localhost:5000/products")
.then((res)=>setProduct(res.data))
.catch((err)=> console.log(err))

},[])



const addToCart = async (curr)=>{

  if(!currentUser){
    alert("please login first ")
    navigate('/login')
    return
  }

  try{
    const res = await axios.get(
      `http://localhost:5000/cart?userId=${currentUser}&productId=${curr.id}`);
 if (res.data.length>0){

  const item = res.data[0];
  await axios.patch(`http://localhost:5000/cart/${item.id}`, {
        quantity: item.quantity + 1
      });
 }
 else{
  
  await axios.post("http://localhost:5000/cart", {
        userId: currentUser,
        productId: curr.id,
        name: curr.name,
        price: curr.price,
        image: curr.image,
        quantity: 1
      });

 }
 alert('added to cart ');
  }
  
  catch(err){
    console.log(err);

  }
}
 





   const filtered=product.filter((curr)=>{

    const searched= curr.name.toLowerCase().includes(search.toLowerCase())
   return(category === 'all'|| curr.category === category) && searched ;
    




   })
  
   

   const arry =['all','iphone','oppo','realme','vivo','pixel','redmi','samsung',"adhil"]
 
 
   return (
      

    <div className='container my-4'>
        <h1 className='text-center mb-4'>All Products</h1>
        <form className="d-flex mx-lg-auto my-2 my-lg-0 justify-content-center">
            <input
              className=" rounded-pill px-3 mb-4"
              type="search"
              placeholder="Search  5G Store"
              onChange={(e)=>setSearch(e.target.value)}
            />
          </form>

        
        <div  className='category text-center mb-4 d-flex gap-2 justify-content-center'>
        
         {arry.map((buton)=>{
          return (
          <Button key={buton} variant={category === buton ? "info": "outline-info" }onClick={()=>setCategory(buton)}>{buton}</Button>
         )
         })}
          
        </div>
     <Row className='g-4'>
        
        {filtered.map((curr)=>(
            <Col md={4} sm={6} xs={12} key={curr.id}>
        <Card className="mb-5 shadow-sm rounded-3 p-4 h-100">
  <Card.Img
    variant="top"
    src={curr.image}
    style={{ height: "250px", objectFit: "contain" }}
  />
  <Card.Body className="d-flex flex-column">
    <Card.Title>{curr.name}</Card.Title>

    <Card.Text className="fw-bold fs-5 text-success">
      ₹{curr.price}
    </Card.Text>

    <Card.Text className="text-muted">
      {curr.specs}
    </Card.Text>

    <div className="mt-auto d-grid">

      <Button variant="secondary" onClick={()=> addToCart(curr)}>{addToCart(curr)?'go to cart':'add to cart'}</Button>

    </div>
  </Card.Body>
</Card>

     </Col>
    ))}

       
     </Row>

    


    </div>
  )
}

export default Product;