import React,{useState} from 'react';
import Loader from "../components/Loader/Loader";

const Cart = () => {

  const [Cart,setCart]=useState();
  return (
    <>
    {!Cart && <Loader/>}
    {Cart && Cart.length==0 && (
      <div className='h-screen'>

      </div>
    )}
    </>
  )
}

export default Cart