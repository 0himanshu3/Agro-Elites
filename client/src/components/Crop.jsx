import React, { useState } from 'react';
import { Button, Badge, Card } from 'flowbite-react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { GiPlantWatering } from 'react-icons/gi';

export default function CropCard({ crop }) {
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    if (quantity < crop.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="p-4">
      <Card className="flex flex-col gap-4 w-full max-w-xs dark:bg-slate-800 rounded-md shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-gray-500 text-md uppercase">{crop.name}</h3>
            <p className="text-xl font-semibold">{crop.quantity} Kg</p>
          </div>
          {/* Adjusted icon size */}
          <GiPlantWatering className="text-teal-600 text-3xl" />
        </div>
        <p className="text-gray-500">Price per Kg: ₹{crop.pricePerKg}</p>
        <p className="text-gray-500">Category: {crop.type}</p>
        <p className="text-gray-500">Farmer ID: {crop.userId}</p>

        {/* Badges for any special tags */}
        <div className="flex flex-wrap gap-2">
          <Badge color="success">Organic</Badge>
          <Badge color="info">Fresh</Badge>
        </div>

        {/* Buttons for quantity control */}
        <div className="flex justify-between gap-2 mt-4">
          <Button
            onClick={decrement}
            color="gray"
            disabled={quantity === 0}
            className="flex items-center justify-center p-2"
          >
            <AiOutlineMinus className="text-lg" />
          </Button>
          <input
            type="text" value={quantity} 
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setQuantity(Number(value));
              }
            }}
            className="bg-transparent text-center w-16 text-xl outline-none"
          />
          <Button
            onClick={increment}
            color="gray"
            disabled={quantity === crop.quantity}
            className="flex items-center justify-center p-2"
          >
            <AiOutlinePlus className="text-lg" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
