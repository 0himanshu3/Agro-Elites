import { useEffect, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineUserGroup, HiPlusCircle } from 'react-icons/hi';
import CropCard from './CropCard'; // Separate component for individual crops

export default function DashboardComp() {
  const [crops, setCrops] = useState([]);
  const [totalCrops, setTotalCrops] = useState(0);
  const [newCrop, setNewCrop] = useState({ name: '', type: '', quantity: '', pricePerKg: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await fetch('/api/crop/getCrops');
        const data = await res.json();
        if (res.ok) {
          // Filter out crops with quantity > 0 initially
          const filteredCrops = data.crops.filter((crop) => crop.quantity > 0);
          setCrops(filteredCrops);
          setTotalCrops(filteredCrops.length);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCrops();
  }, []);

  const handleUpdateQuantity = async (cropId, newQuantity) => {
    try {
      await fetch(`/api/crop/updateQuantity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cropId, quantity: newQuantity }),
      });

      // Update the crop list locally after server update
      setCrops((prevCrops) => {
        const updatedCrops = prevCrops
          .map((crop) =>
            crop._id === cropId ? { ...crop, quantity: newQuantity } : crop
          )
          // Filter out crops with quantity 0
          .filter((crop) => crop.quantity > 0);

        setTotalCrops(updatedCrops.length); // Update total crops count
        return updatedCrops;
      });
    } catch (error) {
      console.log('Failed to update quantity:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCrop({
      ...newCrop,
      [name]: value,
    });
  };

  const handleAddCrop = async (e) => {
    e.preventDefault();

    // Check if crop already exists in inventory
    const cropExists = crops.some((crop) => crop.name.toLowerCase() === newCrop.name.toLowerCase());
    if (cropExists) {
      setErrorMessage('Crop already in inventory');
      return;
    }

    try {
      const res = await fetch('/api/crop/addCrop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCrop),
      });

      const data = await res.json();
      if (res.ok) {
        // Only add the crop to the list if its quantity is greater than 0
        if (data.crop.quantity > 0) {
          setCrops([...crops, data.crop]);
          setTotalCrops(totalCrops + 1);
        }
        setNewCrop({ name: '', type: '', quantity: '', pricePerKg: '' }); // Clear the form
        setIsModalOpen(false); // Close the modal
        setErrorMessage(''); // Clear any error message
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setErrorMessage(''); // Reset error when modal is toggled
  };

  return (
    <div className="p-3 md:mx-auto">
      {/* Display Total Crops and Add New Crop */}
      <div className="flex justify-between p-4">
        <div className="flex items-center gap-2">
          <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          <div>
            <h3 className="text-gray-500 text-md uppercase">Total Crops</h3>
            <p className="text-2xl">{totalCrops}</p>
          </div>
        </div>
        <div>
          <Button onClick={toggleModal} outline gradientDuoTone="purpleToPink" className="flex items-center gap-2">
            <HiPlusCircle />
            <span>Add New Crop</span>
          </Button>
        </div>
      </div>

      {/* Crops Inventory */}
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        {crops.map((crop) => (
          <CropCard key={crop._id} crop={crop} onUpdateQuantity={handleUpdateQuantity} />
        ))}
      </div>

      {/* Modal for Adding New Crop */}
      <Modal show={isModalOpen} onClose={toggleModal}>
        <Modal.Header>Add a New Crop</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddCrop} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Crop Name
              </label>
              <input
                type="text"
                name="name"
                value={newCrop.name}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Crop Type
              </label>
              <input
                type="text"
                name="type"
                value={newCrop.type}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={newCrop.quantity}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="pricePerKg" className="block text-sm font-medium text-gray-700">
                Price per Kg
              </label>
              <input
                type="number"
                name="pricePerKg"
                value={newCrop.pricePerKg}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md"
                required
              />
            </div>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            <Button type="submit" gradientDuoTone="purpleToPink">
              Add Crop
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}