import React, { useState } from 'react';
import { Card, Button } from 'flowbite-react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

export default function CropCard({ crop }) {
  const [quantity, setQuantity] = useState(0);

  // Increase the quantity but don't exceed the available quantity
  const increment = () => {
    if (quantity < crop.quantity) {
      setQuantity(quantity + 1);
    }
  };

  // Decrease the quantity but don't go below 0
  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold">{crop.name}</h2>
      <p className="text-sm text-gray-500">Type: {crop.type}</p>
      <p className="text-sm text-gray-500">Price per kg: ₹{crop.pricePerKg}</p>
      <p className="text-sm text-gray-500">Available Quantity: {crop.quantity}</p>
      <p className="text-sm text-gray-500">Farmer ID: {crop.userId}</p> {/* Display Farmer ID */}
      
      <div className="flex items-center mt-4">
        <Button 
          onClick={decrement} 
          color="gray" 
          pill 
          disabled={quantity === 0} 
          className="mr-2"
        >
          <AiOutlineMinus />
        </Button>
        <span className="text-lg">{quantity}</span>
        <Button 
          onClick={increment} 
          color="gray" 
          pill 
          disabled={quantity === crop.quantity} 
          className="ml-2"
        >
          <AiOutlinePlus />
        </Button>
      </div>
    </Card>
  );
}
