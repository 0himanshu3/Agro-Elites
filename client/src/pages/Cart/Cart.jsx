import React,{useState,useEffect} from 'react'
import './Cart.css';
import { useSelector } from "react-redux";
import CartItem from './CartItem/CartItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import axios from 'axios'; // For making API requests
function Cart1() {
    
   // cart ko store se yaha par laaya jaaye
   const cart =  useSelector((state)=>{
    return state.shop.cart;
    })


    const handlePayment = async () => {
      try {
        // Send request to your backend to create a Razorpay order
        const { data } = await axios.post('http://localhost:3000/createOrder', {
          amount: totalPrice,
          name: 'Cart Purchase',
          description: 'Payment for items in your cart',
        });
  
        // If order created successfully, proceed with Razorpay checkout
        if (data.success) {
          console.log("aagya")
          const options = {
            key: data.key_id,
            amount: data.amount,
            currency: "INR",
            name: data.product_name,
            description: data.description,
            image: ShoppingCartTwoToneIcon, // Optional image
            order_id: data.order_id, // Order ID returned from your backend
            handler: function (response) {
              alert("Payment Successful");
              // Optionally, you can handle post-payment logic here
            },
            
            prefill: {
              name: data.name,
              email: data.email,
              contact: data.contact,
            },
            theme: {
              color: "#2300a3",
            },
          };
          const razorpay = new window.Razorpay(options);
          razorpay.open();
          razorpay.on('payment.failed', function (response) {
            alert("Payment Failed: " + response.error.description);
          });
        } else {
          alert('Order creation failed');
        }
      } catch (error) {
        console.error('Error during payment:', error);
        alert('Something went wrong!');
      }
    };
  


   
    const [totalItems,setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
      let items = 0;
      let price = 0;
  
      cart.forEach((item) => {
        items += Number(item.qty) || 0;
        price += item.qty * item.pricePerKg;
      });
  
      setTotalItems(items);
      setTotalPrice(price);
    }, [cart]);
  
    return (
        <>
        {cart.length==0?<div className='container-div1 ' >
          <ShoppingCartTwoToneIcon style={{marginBottom:'2%' , fontSize : '8vw' , color: '#8e65eb'}}/>
          <p style={{fontSize : '3vw',fontWeight:'500'}}> <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Krishi-Cart
        </span> is currently empty</p>
        </div>:
        <div className='container-div' >
            <div className='items'>
                <div className='header'>
                    <p style={{paddingTop: '2%',paddingLeft: '2%',marginBottom:'3%',fontSize : '25px',fontWeight:'700'}}>Krishi Cart</p>
                  
                    
                </div>
                <div className='added'>
                    
                         {cart.map((item) => (
                            <CartItem key={item._id} item={item} />
                          ))}
                    
                </div>
            </div>
            <div className='details-c'>
              <div className='details'>
            <h4 style={{textAlign:'center', paddingTop:'5%'}}>Cart Summary</h4>
        <div style={{textAlign:'center', marginBottom: '5%', marginTop:'5%'}} >
          <span>Subtotal ({totalItems} items) : </span>
          <span style={{fontWeight:'bold'}}>₹ {totalPrice}</span>
        </div>
        
        
        
        <div className='checkout'>
        <Button variant="contained" color="primary" onClick={handlePayment}>
          Proceed To Buy
        </Button>
        </div>
            </div>
            </div>
        </div>
        }
        </>
    )
}

export default Cart1;